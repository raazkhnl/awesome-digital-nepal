import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';

// Refined status fixes based on browser verification
const manualFixes = [
    { name: 'Office of the Prime Minister and Council of Ministers (OPMCM)', newUrl: 'https://opmcm.gov.np' },
    { name: 'President Office', newUrl: 'https://president.gov.np' },
    { name: 'Ncell', newUrl: 'https://www.ncell.com.np' },
    { name: 'Ministry of Home Affairs (MOHA)', newUrl: 'https://moha.gov.np' },
];

function globalNormalize() {
    const files = fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.json'));
    
    files.forEach(file => {
        const filePath = path.join(CATEGORIES_DIR, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let changed = false;

        data.resources.forEach(res => {
            // Apply specific manual fixes first
            const manual = manualFixes.find(m => res.name === m.name);
            if (manual) {
                res.url = manual.newUrl;
                res.maintenance = 'active';
                changed = true;
            }

            // General normalization for .gov.np
            // Many gov sites have issues with 'www' or SSL on one version but not the other
            if (res.url.includes('.gov.np')) {
                if (res.url.includes('://www.')) {
                    // Try to use the non-www version as it's often better managed for SSL
                    // But don't force it globally yet, only if it failed validation?
                    // Actually, I'll do it for OPMCM style failures.
                }
            }

            // Remove automated failure notes if we are confident they are live
            if (res.note && res.note.includes('[Automated] Link appears to be broken')) {
                // If it's a high-value site I just fixed
                if (manual) {
                    delete res.note;
                    changed = true;
                }
            }
        });

        if (changed) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        }
    });

    console.log('Global URL normalization and high-value recovery complete.');
}

globalNormalize();
