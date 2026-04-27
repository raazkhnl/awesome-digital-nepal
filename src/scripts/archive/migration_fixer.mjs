import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';

function migrate() {
    console.log('--- Phase: Surgical Resource Migration ---');
    
    const miscFile = path.join(CATEGORIES_DIR, '25-misc.json');
    const sisterFile = path.join(CATEGORIES_DIR, '21-sister-lists.json');
    const companyFile = path.join(CATEGORIES_DIR, '20-companies.json');

    if (!fs.existsSync(miscFile)) return;

    let misc = JSON.parse(fs.readFileSync(miscFile, 'utf8'));
    let sister = JSON.parse(fs.readFileSync(sisterFile, 'utf8'));
    let company = JSON.parse(fs.readFileSync(companyFile, 'utf8'));

    const toSister = ['govdirectory.org/nepal', 'govnp.com', 'knownepal.vercel.app/government'];
    const toCompany = ['raralabs.com'];

    // Filter out moved items from misc
    const resources = misc.resources;
    const remainingInMisc = [];

    resources.forEach(res => {
        if (toSister.includes(res.name)) {
            if (!sister.resources.find(ex => ex.url === res.url)) {
                sister.resources.push(res);
                console.log(`Moved ${res.name} to Sister Lists.`);
            }
        } else if (toCompany.includes(res.name)) {
            if (!company.resources.find(ex => ex.url === res.url)) {
                company.resources.push(res);
                console.log(`Moved ${res.name} to Tech Companies.`);
            }
        } else {
            remainingInMisc.push(res);
        }
    });

    // Save updated files
    misc.resources = remainingInMisc;
    fs.writeFileSync(miscFile, JSON.stringify(misc, null, 2));
    fs.writeFileSync(sisterFile, JSON.stringify(sister, null, 2));
    fs.writeFileSync(companyFile, JSON.stringify(company, null, 2));

    console.log('Surgical migration complete.');
}

migrate();
