/**
 * Awesome Digital Nepal - Master Maintenance Engine
 * 
 * This tool manages the 1,346+ resource database by orchestrating modular tasks:
 * 1. Global health-check (Headless link validation)
 * 2. Categorization & Hierarchy Re-indexing
 * 3. Global Deduplication & Schema Alignment
 * 4. Documentation synchronization (README table generator)
 * 
 * Usage:
 *   node src/scripts/maintenance.mjs --full    # Run all (Re-index -> Dedupe -> Docs)
 *   node src/scripts/maintenance.mjs --index   # Sync category indexing and metadata
 *   node src/scripts/maintenance.mjs --dedupe  # Remove global URL/Name duplicates
 *   node src/scripts/maintenance.mjs --docs    # Update README table and stats
 */

import { reIndex } from './re-index.mjs';
import { dedupe } from './dedupe.mjs';
// import { healthCheck } from './health-check.mjs'; // Modularized but optional for daily maintenance

async function runMaintenance() {
    const args = process.argv.slice(2);
    const doFull = args.includes('--full');
    const doIndex = args.includes('--index') || doFull;
    const doDedupe = args.includes('--dedupe') || doFull;
    const doDocs = args.includes('--docs') || doFull;

    if (!doIndex && !doDedupe && !doDocs) {
        console.log('Available commands: --index, --dedupe, --docs, --full');
        return;
    }

    if (doIndex) await reIndex();
    if (doDedupe) await dedupe();
    if (doDocs) {
        // We reuse the logic from docs.mjs or just run it via child process
        // For consistency, we keep it modular
        const { updateReadme } = await import('./docs.mjs');
    }

    console.log('\n=======================================');
    console.log('   MAINTENANCE COMPLETED SUCCESSFULLY');
    console.log('=======================================');
}

runMaintenance().catch(console.error);
