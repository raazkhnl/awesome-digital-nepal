import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';

/**
 * Prioritized Global Deduplication
 * Prioritizes keeping resources in specific 'special' categories (DAO, Local Levels, Provincial)
 * over general categories (Government, Misc).
 */
function dedupe() {
    console.log('--- Phase: Prioritized Global Deduplication ---');
    
    // Sort files so that High Priority categories are processed FIRST
    // (processed first = seen first = kept first)
    const files = fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.json')).sort((a, b) => {
        const getPriority = (name) => {
            if (name.includes('22-dao')) return 1;
            if (name.includes('23-provincial')) return 2;
            if (name.includes('24-local')) return 3;
            if (name.includes('01-government')) return 99; // Low priority (remove from here)
            if (name.includes('25-misc')) return 100; // Lowest priority
            return 50; // Neutral
        };
        return getPriority(a) - getPriority(b);
    });

    const seenUrls = new Set();
    const seenNames = new Set();
    let totalRemoved = 0;

    files.forEach(file => {
        const filePath = path.join(CATEGORIES_DIR, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const initialCount = data.resources.length;

        data.resources = data.resources.filter(res => {
            const normalizedUrl = res.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').toLowerCase();
            const normalizedName = res.name.toLowerCase();

            if (seenUrls.has(normalizedUrl) || seenNames.has(normalizedName)) {
                return false;
            }

            seenUrls.add(normalizedUrl);
            seenNames.add(normalizedName);
            return true;
        });

        // Hierarchical Sort (Starred > Status > Order > Name)
        const statusOrder = { official: 0, community: 1, unofficial: 2, deprecated: 3 };
        data.resources.sort((a, b) => {
            if (a.starred !== b.starred) return a.starred ? -1 : 1;
            const sdiff = (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
            if (sdiff !== 0) return sdiff;
            return (a.order || 99) - (b.order || 99) || a.name.localeCompare(b.name);
        });

        const removed = initialCount - data.resources.length;
        totalRemoved += removed;
        
        if (removed > 0) {
            console.log(`Deduplicated ${file}: Removed ${removed} items (Duplicate found in higher priority category).`);
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    });

    console.log(`Deduplication complete. Removed ${totalRemoved} global redundancies.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    dedupe();
}

export { dedupe };
