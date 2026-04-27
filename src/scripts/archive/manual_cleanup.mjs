import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = 'src/data/categories';

// Move resources between categories
const manualMoves = [
    { from: '25-nepal-ecosystem-misc.json', to: '16-ecommerce-jobs.json', name: 'Sastodeal' },
    { from: '25-nepal-ecosystem-misc.json', to: '01-government.json', name: 'NEA Customer Service Portal' },
    { from: '25-nepal-ecosystem-misc.json', to: '01-government.json', name: 'Nepal Army Official Site' },
    { from: '25-nepal-ecosystem-misc.json', to: '01-government.json', name: 'Nepal Army Recruitment Portal' },
    { from: '25-nepal-ecosystem-misc.json', to: '19-civic-tech.json', name: 'Pratipakchya Government Work Tracker' },
    { from: '25-nepal-ecosystem-misc.json', to: '03-open-data.json', name: 'data.humdata.org (Nepal)' },
    { from: '25-nepal-ecosystem-misc.json', to: '13-agri-tourism-transport.json', name: 'Tribhuwan International Airport Flight Data' },
    { from: '25-nepal-ecosystem-misc.json', to: '23-local-governments.json', name: 'muannepal.org.np' },
    { from: '25-nepal-ecosystem-misc.json', to: '23-local-governments.json', name: 'muannepal.org.np/municipality' },
    { from: '25-nepal-ecosystem-misc.json', to: '04-fintech.json', name: 'swifttech.com.np' },
    { from: '25-nepal-ecosystem-misc.json', to: '04-fintech.json', name: 'sussol.net' },
    { from: '25-nepal-ecosystem-misc.json', to: '05-stock-market.json', name: 'sourcecode.com.np' },
];

function moveResources() {
    const files = {};
    fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.json')).forEach(f => {
        files[f] = JSON.parse(fs.readFileSync(path.join(CATEGORIES_DIR, f), 'utf8'));
    });

    manualMoves.forEach(({ from, to, name }) => {
        if (!files[from] || !files[to]) return;

        const index = files[from].resources.findIndex(r => r.name === name);
        if (index > -1) {
            const item = files[from].resources.splice(index, 1)[0];
            
            // Check if already in target
            if (!files[to].resources.find(r => r.url === item.url || r.name === item.name)) {
                files[to].resources.push(item);
                console.log(`Moved "${name}" from ${from} to ${to}`);
            } else {
                console.log(`"${name}" already exists in ${to}, removed from ${from}`);
            }
        }
    });

    Object.entries(files).forEach(([name, data]) => {
        data.resources.sort((a, b) => (a.order || 99) - (b.order || 99) || a.name.localeCompare(b.name));
        fs.writeFileSync(path.join(CATEGORIES_DIR, name), JSON.stringify(data, null, 2));
    });
}

moveResources();
