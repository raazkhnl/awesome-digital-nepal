import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';
const README_PATH = 'README.md';

function generateTable() {
    const files = fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.json')).sort();
    
    let table = '| #   | Category | Tagline | Count |\n';
    table += '| --- | --- | --- | ---: |\n';

    let totalResources = 0;

    files.forEach(file => {
        const filePath = path.join(CATEGORIES_DIR, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const count = data.resources.length;
        totalResources += count;

        const id = file.split('-')[0];
        const title = data.title;
        const tagline = data.tagline || 'No tagline';
        
        table += `| ${id}  | [${title}](./src/data/categories/${file}) | ${tagline} | ${count} |\n`;
    });

    console.log(`Generated table for ${files.length} categories and ${totalResources} total resources.`);
    return { table, totalResources, categoryCount: files.length };
}

function updateReadme() {
    const { table, totalResources, categoryCount } = generateTable();
    let content = fs.readFileSync(README_PATH, 'utf8');

    // Update the total counts in the header
    content = content.replace(/Currently catalogues \*\*.*resources\*\* across \*\*.*categories\*\*\./, 
        `Currently catalogues **${totalResources} resources** across **${categoryCount} categories**.`);

    // Update the main table
    const tableStart = content.indexOf('| #   | Category');
    const tableEnd = content.indexOf('**Stats:**');
    
    if (tableStart !== -1 && tableEnd !== -1) {
        const beforeTable = content.substring(0, tableStart);
        const afterTable = content.substring(tableEnd);
        content = beforeTable + table + '\n' + afterTable;
    }

    fs.writeFileSync(README_PATH, content);
    console.log('README.md documentation updated successfully.');
}

updateReadme();
