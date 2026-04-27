import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';

/**
 * Re-indexes all category files to ensure contiguous numbering (01-NN),
 * validates and repairs missing 'tagline', 'icon', and 'order' fields,
 * and sorts categories for the web front-end.
 */
function reIndex() {
    console.log('--- Phase: Metadata & Index Optimization ---');
    const files = fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.json')).sort();
    
    files.forEach((file, index) => {
        const order = index + 1;
        const prefix = order.toString().padStart(2, '0');
        const oldPath = path.join(CATEGORIES_DIR, file);
        
        // Correct filename if index is wrong
        const parts = file.split('-');
        let newName = file;
        if (parts[0] !== prefix) {
            newName = `${prefix}-${parts.slice(1).join('-')}`;
            const newPath = path.join(CATEGORIES_DIR, newName);
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${file} -> ${newName}`);
        }

        const data = JSON.parse(fs.readFileSync(path.join(CATEGORIES_DIR, newName), 'utf8'));
        
        // Standardize metadata
        data.order = order;
        if (!data.icon || data.icon === 'MISSING') data.icon = '🌐';
        if (!data.tagline || data.tagline === 'MISSING') data.tagline = 'Digital resource sub-category';
        
        // Ensure ID matches filename (without extension and prefix)
        data.id = newName.replace('.json', '').substring(3);
        
        fs.writeFileSync(path.join(CATEGORIES_DIR, newName), JSON.stringify(data, null, 2));
    });

    console.log(`Successfully re-indexed ${files.length} categories.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    reIndex();
}

export { reIndex };
