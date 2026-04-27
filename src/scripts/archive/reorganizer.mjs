import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';
const RAW_DIR = 'src/data/raw';

const NEW_HIERARCHY = [
    { old: '01-government.json', new: '01-government.json', id: 'government', title: 'Government (Federal)', tagline: 'Central ministries, national ID, and e-governance', icon: '⚖' },
    { old: '02-government-apis.json', new: '02-government-apis.json', id: 'government-apis', title: 'Government APIs', tagline: 'Official and community APIs for gov data', icon: '🛠' },
    { old: '03-open-data.json', new: '03-open-data.json', id: 'open-data', title: 'Open Data', tagline: 'Datasets, census data, and humanitarian portals', icon: '📊' },
    { old: '04-fintech.json', new: '04-fintech.json', id: 'fintech', title: 'Fintech & Wallets', tagline: 'E-wallets, payment gateways, and banking tools', icon: '💳' },
    { old: '05-stock-market.json', new: '05-stock-market.json', id: 'stock-market', title: 'Stock Market', tagline: 'NEPSE, MeroShare, and capital market tools', icon: '📈' },
    { old: '06-telecom.json', new: '06-telecom.json', id: 'telecom', title: 'Telecom & SMS', tagline: 'SMS gateways, USSD codes, and ISP developer resources', icon: '☎' },
    { old: '07-maps-geo.json', new: '07-maps-geo.json', id: 'maps-geo', title: 'Maps & Geospatial', tagline: 'Nepal-specific maps and address APIs', icon: '🗺' },
    { old: '08-oss-libraries.json', new: '08-oss-libraries.json', id: 'oss-libraries', title: 'OSS Libraries', tagline: 'Community packages and development toolkits', icon: '{ }' },
    { old: '09-ai-nlp.json', new: '09-ai-nlp.json', id: 'ai-nlp', title: 'AI & NLP', tagline: 'Large language models and speech tools for Nepali', icon: '🤖' },
    { old: '10-fonts.json', new: '10-fonts.json', id: 'fonts', title: 'Fonts & Layouts', tagline: 'Preeti, Unicode, and keyboard layouts', icon: '🔠' },
    { old: '11-education.json', new: '11-education.json', id: 'education', title: 'Education', tagline: 'Universities, results, and scholarship portals', icon: '🎓' },
    { old: '12-health.json', new: '12-health.json', id: 'health', title: 'Health', tagline: 'Hospital portals and national health data', icon: '🏥' },
    { old: '13-agri-tourism-transport.json', new: '13-agri-tourism-transport.json', id: 'agri-transport', title: 'Agri & Transport', tagline: 'Agriculture, Civil Aviation, and NEA', icon: '🚜' },
    { old: '14-news-media.json', new: '14-news-media.json', id: 'news-media', title: 'News & Media', tagline: 'Authoritative news outlets and aggregators', icon: '📰' },
    { old: '15-weather-disaster.json', new: '15-weather-disaster.json', id: 'weather-disaster', title: 'Weather & Disaster', tagline: 'DRR, Hydrology, and real-time alerts', icon: '☁' },
    { old: '16-ecommerce-jobs.json', new: '16-ecommerce-jobs.json', id: 'ecommerce-jobs', title: 'Ecommerce & Jobs', tagline: 'Marketplaces and employment portals', icon: '🛍' },
    { old: '17-communities.json', new: '17-communities.json', id: 'communities', title: 'Communities', tagline: 'Developer groups, FOSS, and tech forums', icon: '👥' },
    { old: '18-blogs-podcasts.json', new: '18-blogs-podcasts.json', id: 'blogs-podcasts', title: 'Blogs & Podcasts', tagline: 'High-quality Nepali tech content', icon: '🎙' },
    { old: '19-civic-tech.json', new: '19-civic-tech.json', id: 'civic-tech', title: 'Civic Tech', tagline: 'Transparency trackers and election data', icon: '🗳' },
    { old: '20-companies.json', new: '20-companies.json', id: 'companies', title: 'Tech Companies', tagline: 'Nepali companies with significant OSS footprints', icon: '▣' },
    { old: '21-sister-lists.json', new: '21-sister-lists.json', id: 'sister-lists', title: 'Sister Lists', tagline: 'Other curated Nepalese resources', icon: '📂' },
    { old: null, new: '22-dao.json', id: 'dao', title: 'District Admin (DAO)', tagline: 'Official District Administration Office portals', icon: '🏛', source: 'dao_list.json' },
    { old: '27-provincial-bodies.json', new: '23-provincial-bodies.json', id: 'provincial-bodies', title: 'Provincial Bodies', tagline: 'Ministries and secretariats of all 7 provinces', icon: '🏔' },
    { old: '23-local-governments.json', new: '24-local-governments.json', id: 'local-governments', title: 'Local Governments', tagline: 'All 753 Municipalities & Rural Mun.', icon: '🏠' },
    { old: '25-nepal-ecosystem-misc.json', new: '25-misc.json', id: 'misc', title: 'Nepal Ecosystem (Misc)', tagline: 'Miscellaneous digital services', icon: '🌐' }
];

function reorganize() {
    console.log('--- Phase: Restore & Re-index Hierarchy ---');

    // 1. Rename and update existing
    NEW_HIERARCHY.forEach((item, index) => {
        const order = index + 1;
        let data;

        if (item.old && fs.existsSync(path.join(CATEGORIES_DIR, item.old))) {
            data = JSON.parse(fs.readFileSync(path.join(CATEGORIES_DIR, item.old), 'utf8'));
            if (item.old !== item.new) {
                fs.renameSync(path.join(CATEGORIES_DIR, item.old), path.join(CATEGORIES_DIR, item.new));
                console.log(`Renamed: ${item.old} -> ${item.new}`);
            }
        } else if (item.source && fs.existsSync(path.join(RAW_DIR, item.source))) {
            // Restore from raw
            const rawData = JSON.parse(fs.readFileSync(path.join(RAW_DIR, item.source), 'utf8'));
            data = {
                id: item.id,
                title: item.title,
                tagline: item.tagline,
                description: `Official portals for ${item.title}.`,
                icon: item.icon,
                resources: Array.isArray(rawData) ? rawData : (rawData.resources || [])
            };
            console.log(`Restored: ${item.new} from ${item.source}`);
        } else {
            console.warn(`File not found: ${item.old || item.source}`);
            return;
        }

        // Apply metadata fixes
        data.id = item.id;
        data.title = item.title;
        data.tagline = item.tagline;
        data.icon = item.icon;
        data.order = order;

        fs.writeFileSync(path.join(CATEGORIES_DIR, item.new), JSON.stringify(data, null, 2));
    });

    console.log('Hierarchy reorganization complete.');
}

reorganize();
