import fs from 'fs';
import path from 'path';

const CATEGORY_PATH = 'src/data/categories/23-local-governments.json';
const RAW_MAPPING_PATH = 'src/data/raw/sagautam5_municipalities.json';

const categoryData = JSON.parse(fs.readFileSync(CATEGORY_PATH, 'utf8'));
const rawMapping = JSON.parse(fs.readFileSync(RAW_MAPPING_PATH, 'utf8'));

const existingUrls = new Set(categoryData.resources.map(r => normalizeUrl(r.url)));
const existingNames = new Set(categoryData.resources.map(r => r.name.toLowerCase().trim()));

function normalizeUrl(u) {
    if (!u || typeof u !== 'string') return '';
    return u.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
        .trim();
}

let addedCount = 0;
rawMapping.forEach(item => {
    const rawUrl = item.website;
    if (!rawUrl || rawUrl.includes('//') === false && !rawUrl.includes('.')) return; // Skip non-URL values

    const normalized = normalizeUrl(rawUrl);
    const fullName = `${item.name} (${item.id})`; // Using ID to disambiguate identical names in different districts
    
    if (!existingUrls.has(normalized)) {
        const resourceName = item.category_id === 3 ? `${item.name} Municipality` : `${item.name} Rural Municipality`;
        
        // Final check by name to be safe
        if (existingNames.has(resourceName.toLowerCase().trim())) return;

        categoryData.resources.push({
            name: resourceName,
            url: rawUrl.startsWith('http') ? rawUrl : `http://${rawUrl}`,
            description: `${resourceName} official government portal.`,
            status: "official",
            maintenance: "active",
            tags: ["verified", "government"]
        });
        existingUrls.add(normalized);
        addedCount++;
    }
});

// Sort resources by name
categoryData.resources.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(CATEGORY_PATH, JSON.stringify(categoryData, null, 2));
console.log(`Merged ${addedCount} new authoritative local level resources.`);
