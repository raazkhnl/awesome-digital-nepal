import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';

const MAPPING = [
    { from: '01-government.json', to: '23-local-governments.json', keyword: 'municipality' },
    { from: '01-government.json', to: '23-local-governments.json', keyword: 'nagarpalika' },
    { from: '01-government.json', to: '23-local-governments.json', keyword: 'gaupalika' },
    { from: '01-government.json', to: '22-dao.json', keyword: 'district administration' },
    { from: '01-government.json', to: '22-dao.json', keyword: 'dao' },
    { from: '01-government.json', to: '24-federal-entities.json', keyword: 'ministry' },
    { from: '01-government.json', to: '24-federal-entities.json', keyword: 'department' },
];

function refactor() {
    const files = {};
    fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.json')).forEach(f => {
        files[f] = JSON.parse(fs.readFileSync(path.join(CATEGORIES_DIR, f), 'utf8'));
    });

    MAPPING.forEach(({ from, to, keyword }) => {
        if (!files[from] || !files[to]) return;

        const toMove = files[from].resources.filter(r => 
            r.name.toLowerCase().includes(keyword) || 
            r.url.toLowerCase().includes(keyword) ||
            (r.description && r.description.toLowerCase().includes(keyword))
        );

        if (toMove.length > 0) {
            console.log(`Moving ${toMove.length} items from ${from} to ${to} (keyword: ${keyword})`);
            
            // Remove from source
            files[from].resources = files[from].resources.filter(r => !toMove.includes(r));
            
            // Add to target
            toMove.forEach(item => {
                // Ensure no duplicates in target
                const exists = files[to].resources.find(ex => ex.url === item.url || ex.name === item.name);
                if (!exists) {
                    files[to].resources.push(item);
                }
            });
        }
    });

    // Save all changes
    Object.entries(files).forEach(([name, data]) => {
        // Final cleaning: remove trailing commas or extra fields if any, and sort
        data.resources.sort((a, b) => (a.order || 99) - (b.order || 99) || a.name.localeCompare(b.name));
        fs.writeFileSync(path.join(CATEGORIES_DIR, name), JSON.stringify(data, null, 2));
    });

    console.log('Categorization refactor complete.');
}

refactor();
