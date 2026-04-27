import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';

const FINAL_MAPPING = {
    '01-government.json': '⚖',
    '02-government-apis.json': '🛠',
    '03-open-data.json': '⊞',
    '04-fintech.json': '⛃',
    '05-stock-market.json': '◬',
    '06-telecom.json': '☎',
    '07-maps-geo.json': '⛶',
    '08-oss-libraries.json': '{ }',
    '09-ai-nlp.json': '⌬',
    '10-fonts.json': '🄰',
    '11-education.json': '✎',
    '12-health.json': '✚',
    '13-agri-tourism-transport.json': '✦',
    '14-news-media.json': '▤',
    '15-weather-disaster.json': '☁',
    '16-ecommerce-jobs.json': '🛒',
    '17-communities.json': '≡',
    '18-blogs-podcasts.json': '🎙',
    '19-civic-tech.json': '🗳',
    '20-companies.json': '🏢',
    '21-sister-lists.json': '▤',
    '22-dao.json': '🏛',
    '23-provincial-bodies.json': '◬',
    '24-local-governments.json': '☖',
    '25-misc.json': '≡'
};

function standardizeIcons() {
    console.log('--- Phase: Unique Grayscale Icon Mapping ---');
    
    Object.entries(FINAL_MAPPING).forEach(([file, icon]) => {
        const filePath = path.join(CATEGORIES_DIR, file);
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            data.icon = icon;
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Updated ${file} icon to -> ${icon}`);
        }
    });

    console.log('Icon standardization complete.');
}

standardizeIcons();
