import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';
const categoryFiles = fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.json'));

const globalUrls = new Map(); // url -> categoryId
const globalNames = new Map(); // name -> categoryId

function normalizeUrl(u) {
    if (!u) return '';
    return u.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
        .trim();
}

const VALID_STATUSES = ["official", "community", "unofficial", "deprecated"];

categoryFiles.forEach(file => {
    const filePath = path.join(CATEGORIES_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const categoryId = data.id;

    const uniqueResources = [];
    data.resources.forEach(res => {
        const url = normalizeUrl(res.url);
        const name = res.name.toLowerCase().trim();

        // 1. Cross-category Deduplication
        if (globalUrls.has(url)) {
            console.log(`[DUP URL] ${res.url} found in ${globalUrls.get(url)} and ${categoryId}. Removing from ${categoryId}.`);
            return;
        }
        if (globalNames.has(name)) {
            // Check if they are actually the same URL (sometimes same name but diff URL is ok, like 'Madi Municipality' in two districts)
            if (globalUrls.get(url) === categoryId) {
                console.log(`[DUP NAME] ${res.name} found in ${globalNames.get(name)} and ${categoryId}.`);
            }
        }

        // 2. Schema Fixes
        if (!VALID_STATUSES.includes(res.status)) {
            res.status = "official"; // Defaulting to official if gov.np, otherwise community? 
            if (!res.url.includes('.gov.np')) res.status = "community";
        }
        
        // maintenance: should be active, maintenance, or unreachable
        if (res.maintenance === 'active' || !res.maintenance) res.maintenance = 'active';

        globalUrls.set(url, categoryId);
        globalNames.set(name, categoryId);
        uniqueResources.push(res);
    });

    data.resources = uniqueResources;
    
    // Sort within category
    data.resources.sort((a, b) => a.name.localeCompare(b.name));
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('Global cleanup complete.');
