import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';

const FEDERAL_MAP = {
    'acourt.gov.np': 'Supreme Court of Nepal',
    'adbl.gov.np': 'Agricultural Development Bank',
    'aepc.gov.np': 'Alternative Energy Promotion Centre',
    'ahd.gov.np': 'Department of Animal Health',
    'apf.gov.np': 'Armed Police Force (APF)',
    'attorneygeneral.gov.np': 'Office of the Attorney General',
    'bagmati.gov.np': 'Bagmati Province Portal',
    'chd.gov.np': 'Civil Helicopter Department',
    'ppmo.gov.np': 'Public Procurement Monitoring Office',
    'mof.gov.np': 'Ministry of Finance',
    'opmcm.gov.np': 'Office of the Prime Minister',
    'nepal.gov.np': 'Government of Nepal Portal',
    'moha.gov.np': 'Ministry of Home Affairs',
    'doenv.gov.np': 'Department of Environment',
    'dohs.gov.np': 'Department of Health Services',
    'dotm.gov.np': 'Department of Transport Management',
    'dors.gov.np': 'Department of Roads',
    'mofaga.gov.np': 'Ministry of Federal Affairs',
    'moci.gov.np': 'Ministry of Communication',
    'moest.gov.np': 'Ministry of Education & Science',
    'mohp.gov.np': 'Ministry of Health',
    'mofe.gov.np': 'Ministry of Forests',
    'moljpa.gov.np': 'Ministry of Law & Justice',
    'mowcsc.gov.np': 'Ministry of Women & Children',
    'mcits.gov.np': 'Ministry of Information Tech',
    'psc.gov.np': 'Public Service Commission',
    'ciaa.gov.np': 'CIAA (Anti-Corruption Body)',
    'nrb.org.np': 'Nepal Rastra Bank',
    'nepalpolice.gov.np': 'Nepal Police',
    'mofa.gov.np': 'Ministry of Foreign Affairs',
    'mopit.gov.np': 'Ministry of Phys. Infrastructure',
    'moewri.gov.np': 'Ministry of Energy & Water',
    'molcp.gov.np': 'Ministry of Labor & Employment',
    'molma.gov.np': 'Ministry of Land Mgmt',
    'moud.gov.np': 'Ministry of Urban Development',
    'motsol.gov.np': 'Ministry of Tourism & Aviation',
    'dams.gov.np': 'DAMS (Data Archive Mgmt)',
    'dos.gov.np': 'Department of Survey',
    'dg.gov.np': 'Directorate General',
    'doed.gov.np': 'Department of Education',
    'ocr.gov.np': 'Office of Company Registrar'
};

function universalNameFix() {
    console.log('--- Phase: Universal Institutional Titling ---');
    const files = fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.json')).sort();
    
    files.forEach(file => {
        const filePath = path.join(CATEGORIES_DIR, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let changed = false;

        data.resources.forEach(res => {
            const originalName = res.name;
            const lowUrl = res.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
            const lowName = res.name.toLowerCase();

            // 1. Recover from Corrupted Warnings
            if (res.name.startsWith('[WARNING')) {
                res.name = lowUrl;
            }

            // 2. Special Category Naming logic (DAO, Local Levels)
            if (file.includes('22-dao') || file.includes('24-local-governments')) {
                // Heuristic: Extract "[Name] Municipality" or "District Admin... [Name]" from description if name is a domain
                if (res.name.includes('.gov.np') || res.name.length < 5) {
                    const munMatch = res.description.match(/^([A-Za-z\s]+ (Municipality|Rural Municipality|Gaupalika))/i);
                    const daoMatch = res.description.match(/(District Administration Office [A-Za-z\s]+)/i);
                    
                    if (munMatch) {
                        res.name = munMatch[1].trim();
                    } else if (daoMatch) {
                        res.name = daoMatch[1].trim();
                    } else {
                        // Fallback: Title Case the first part of the domain
                        const part = lowUrl.replace(/mun\.gov\.np$/, '').replace(/^dao/, '');
                        res.name = part.charAt(0).toUpperCase() + part.slice(1) + (file.includes('dao') ? ' DAO' : ' Local Gov');
                    }
                }
            } else {
                // 3. Federal / General Mapping
                if (FEDERAL_MAP[lowName]) {
                    res.name = FEDERAL_MAP[lowName];
                } else if (FEDERAL_MAP[lowUrl]) {
                    res.name = FEDERAL_MAP[lowUrl];
                }
            }

            // 4. Global Sanity: If name still contains .gov.np, strip and title case
            if (res.name.toLowerCase().endsWith('.gov.np')) {
                const parts = res.name.split('.');
                res.name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + ' Portal';
            }

            if (res.name !== originalName) {
                changed = true;
                console.log(`Aligned: ${originalName} -> ${res.name}`);
            }
        });

        if (changed) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        }
    });

    console.log('Universal naming complete.');
}

universalNameFix();
