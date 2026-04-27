import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';
const RAW_DIR = 'src/data/raw';

const CATEGORY_MAP = {
    '01-government.json': '01-government-federal.json', // Rename for clarity
    '24-federal-bodies.json': '01-government-federal.json', // Merge into 01
};

const KEYWORD_RULES = [
    { target: '04-fintech.json', keywords: ['khalti', 'esewa', 'payment', 'wallet', 'connectips', 'fonepay'] },
    { target: '05-stock-market.json', keywords: ['nepse', 'meroshare', 'broker', 'ipo', 'tms'] },
    { target: '09-ai-nlp.json', keywords: ['nlp', 'speech', 'summarizer', 'nepali-nlp', 'language-model'] },
    { target: '08-oss-libraries.json', keywords: ['library', 'sdk', 'wrapper', 'toolkit', 'converter', 'bikram-sambat'] },
    { target: '03-open-data.json', keywords: ['dataset', 'csv', 'census', 'historical-data'] }
];

function cleanup() {
    const files = {};
    fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.json')).forEach(f => {
        files[f] = JSON.parse(fs.readFileSync(path.join(CATEGORIES_DIR, f), 'utf8'));
    });

    // 1. Merge 24 into 01
    if (files['01-government.json'] && files['24-federal-bodies.json']) {
        console.log(`Merging ${files['24-federal-bodies.json'].resources.length} items from 24-federal-bodies.json to 01-government.json`);
        files['24-federal-bodies.json'].resources.forEach(res => {
            if (!files['01-government.json'].resources.find(ex => ex.url === res.url)) {
                files['01-government.json'].resources.push(res);
            }
        });
        fs.unlinkSync(path.join(CATEGORIES_DIR, '24-federal-bodies.json'));
        delete files['24-federal-bodies.json'];
    }

    // 2. Refactor 22-github-deep-mining.json
    if (files['22-github-deep-mining.json']) {
        const miners = files['22-github-deep-mining.json'].resources;
        console.log(`Analyzing ${miners.length} mined resources...`);
        
        let movedCount = 0;
        miners.forEach(res => {
            const content = `${res.name} ${res.description || ''} ${res.url}`.toLowerCase();
            let moved = false;
            
            for (const rule of KEYWORD_RULES) {
                if (rule.keywords.some(k => content.includes(k))) {
                    if (files[rule.target]) {
                        if (!files[rule.target].resources.find(ex => ex.url === res.url)) {
                            files[rule.target].resources.push(res);
                        }
                        moved = true;
                        movedCount++;
                        break;
                    }
                }
            }
        });
        
        console.log(`Moved ${movedCount} high-quality items from Deep Mining. Retiring category.`);
        
        // Move the whole file to RAW as an archive
        fs.writeFileSync(path.join(RAW_DIR, 'archived_github_discovery.json'), JSON.stringify(files['22-github-deep-mining.json'], null, 2));
        fs.unlinkSync(path.join(CATEGORIES_DIR, '22-github-deep-mining.json'));
        delete files['22-github-deep-mining.json'];
    }

    // 3. Save optimized files
    Object.entries(files).forEach(([name, data]) => {
        data.resources.sort((a, b) => (a.order || 99) - (b.order || 99) || a.name.localeCompare(b.name));
        fs.writeFileSync(path.join(CATEGORIES_DIR, name), JSON.stringify(data, null, 2));
    });

    console.log('Final reorganization complete.');
}

cleanup();
