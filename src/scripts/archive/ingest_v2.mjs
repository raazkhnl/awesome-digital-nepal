import fs from 'fs';
import path from 'path';

const RAW_DIR = 'src/data/raw';
const CATEGORIES_DIR = 'src/data/categories';

const SEEN_DATA_PATH = path.join(RAW_DIR, 'seen_data.json');
const LOCAL_LEVELS_PATH = path.join(RAW_DIR, 'local_levels_753.json');
const DAO_LIST_PATH = path.join(RAW_DIR, 'dao_list.json');

const seenData = JSON.parse(fs.readFileSync(SEEN_DATA_PATH, 'utf8'));
const seenNames = new Set(seenData.names.map(n => n.toLowerCase().trim()));
const seenUrls = new Set(seenData.urls.map(u => normalizeUrl(u)));

function normalizeUrl(u) {
    return u.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
        .trim();
}

function isDuplicate(name, url) {
    if (!url) return true;
    const cleanName = name.toLowerCase().trim();
    const cleanUrl = normalizeUrl(url);
    if (seenNames.has(cleanName)) return true;
    if (seenUrls.has(cleanUrl)) return true;
    return false;
}

async function checkUrl(url) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
        clearTimeout(timeout);
        return res.ok;
    } catch (e) {
        return false;
    }
}

const localLevels = JSON.parse(fs.readFileSync(LOCAL_LEVELS_PATH, 'utf8'));
// Split into Municipalities (293) and Rural (460) as per extraction split
const cityNames = localLevels.slice(0, 293);
const ruralNames = localLevels.slice(293);

const provincialDepts = ['ocmcm', 'moeap', 'moial', 'mosd', 'molmac', 'moitfe', 'mopid', 'moh'];
const provinces = ['koshi', 'p2', 'madhesh', 'bagmati', 'gandaki', 'lumbini', 'karnali', 'sudurpashchim'];

let totalToProcess = [];

// 1. Local Levels - Permutations for better yield
cityNames.forEach(name => {
    const slug = name.toLowerCase().replace(/[^a-z]/g, '');
    const patterns = [`https://${slug}mun.gov.np`, `http://${slug}mun.gov.np`, `https://${slug}.gov.np`];
    patterns.forEach(url => {
        if (!isDuplicate(name, url)) {
            totalToProcess.push({ name: name + ' Municipality', url, type: 'local', originalName: name });
        }
    });
});

ruralNames.forEach(name => {
    const slug = name.toLowerCase().replace(/[^a-z]/g, '');
    const patterns = [`https://${slug}rmun.gov.np`, `http://${slug}rmun.gov.np`, `https://${slug}gaupalika.gov.np`, `https://${slug}.gov.np`];
    patterns.forEach(url => {
        if (!isDuplicate(name, url)) {
            totalToProcess.push({ name: name + ' Rural Municipality', url, type: 'local', originalName: name });
        }
    });
});

// 2. DAOs
const daos = JSON.parse(fs.readFileSync(DAO_LIST_PATH, 'utf8'));
daos.forEach(dao => {
    if (!isDuplicate(dao.name, dao.url)) {
        totalToProcess.push({ ...dao, type: 'federal' });
    }
});

// 3. Provincial
provinces.forEach(p => {
    provincialDepts.forEach(d => {
        const url = `http://${d}.${p}.gov.np`;
        const name = `${d.toUpperCase()} ${p.toUpperCase()} Province`;
        if (!isDuplicate(name, url)) {
            totalToProcess.push({ name, url, description: `Official ministry portal (${d.toUpperCase()}) for the provincial government of ${p}.`, type: 'provincial' });
        }
    });
});

// Internal deduplication within candidates (if multiple URLs for same name)
const uniqueCandidates = [];
const seenInBatch = new Set();
totalToProcess.forEach(c => {
    const key = normalizeUrl(c.url);
    if (!seenInBatch.has(key)) {
        uniqueCandidates.push(c);
        seenInBatch.add(key);
    }
});
totalToProcess = uniqueCandidates;

console.log(`Unique candidates to validate: ${totalToProcess.length}`);

const results = { local: [], federal: [], provincial: [] };
const failed = [];

async function run() {
    const BATCH_SIZE = 40;
    for (let i = 0; i < totalToProcess.length; i += BATCH_SIZE) {
        const batch = totalToProcess.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}...`);
        
        await Promise.all(batch.map(async (item) => {
            const ok = await checkUrl(item.url);
            if (ok) {
                console.log(`[PASS] ${item.url}`);
                const resource = {
                    name: item.name,
                    url: item.url,
                    description: item.description || `${item.name} official government portal.`,
                    status: 'official',
                    maintenance: 'active',
                    tags: ['verified', 'government']
                };
                results[item.type].push(resource);
                seenNames.add(item.name.toLowerCase().trim());
                seenUrls.add(normalizeUrl(item.url));
            } else {
                failed.push(item);
            }
        }));
    }

    console.log('\n--- Extraction Summary ---');
    console.log(`Local Levels: ${results.local.length} added`);
    console.log(`DAOs/Federal: ${results.federal.length} added`);
    console.log(`Provincial: ${results.provincial.length} added`);
    console.log(`Failed/Inactive: ${failed.length}`);

    // Persist
    if (results.local.length > 0) {
        const p = path.join(CATEGORIES_DIR, '23-local-governments.json');
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        // Only add if not already in data.resources (double check)
        const currentUrls = new Set(data.resources.map(r => normalizeUrl(r.url)));
        results.local.forEach(r => {
            if (!currentUrls.has(normalizeUrl(r.url))) {
                data.resources.push(r);
                currentUrls.add(normalizeUrl(r.url));
            }
        });
        fs.writeFileSync(p, JSON.stringify(data, null, 2));
    }

    if (results.federal.length > 0) {
        const p = path.join(CATEGORIES_DIR, '24-federal-bodies.json');
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        const currentUrls = new Set(data.resources.map(r => normalizeUrl(r.url)));
        results.federal.forEach(r => {
            if (!currentUrls.has(normalizeUrl(r.url))) {
                data.resources.push(r);
                currentUrls.add(normalizeUrl(r.url));
            }
        });
        fs.writeFileSync(p, JSON.stringify(data, null, 2));
    }

    if (results.provincial.length > 0) {
        const p = path.join(CATEGORIES_DIR, '27-provincial-bodies.json');
        let data;
        if (fs.existsSync(p)) {
            data = JSON.parse(fs.readFileSync(p, 'utf8'));
        } else {
            data = {
                "$schema": "../schema.json",
                "id": "27-provincial-bodies",
                "title": "Provincial Governments",
                "description": "Portals for Provincial Ministries and departments across Nepal.",
                "resources": [],
                "order": 27,
                "icon": "🏛️",
                "tagline": "Provincial ministries and offices"
            };
        }
        const currentUrls = new Set(data.resources.map(r => normalizeUrl(r.url)));
        results.provincial.forEach(r => {
            if (!currentUrls.has(normalizeUrl(r.url))) {
                data.resources.push(r);
                currentUrls.add(normalizeUrl(r.url));
            }
        });
        fs.writeFileSync(p, JSON.stringify(data, null, 2));
    }

    fs.writeFileSync(path.join(RAW_DIR, 'failed_urls.json'), JSON.stringify(failed, null, 2));
}

run();
