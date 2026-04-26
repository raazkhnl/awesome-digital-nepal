/**
 * Data loader for Awesome Digital Nepal.
 *
 * Strategy: every JSON file in `src/data/categories/` is auto-imported via
 * Vite's `import.meta.glob` with `{ eager: true }`. This means contributors
 * can add a new category by dropping in a `XX-name.json` file — no other
 * code changes needed.
 *
 * Schema for each file is documented in `src/data/schema.json`.
 *
 * Exports:
 *   - categories: sorted array of category objects
 *   - allResources: flattened array of all resources, each tagged with its
 *     parent category id and title (for global search & home-page stats)
 *   - getCategoryById(id): convenience lookup
 *   - getStats(): aggregate counts for the hero section
 */

const modules = import.meta.glob('./categories/*.json', { eager: true })

/**
 * @typedef {Object} Resource
 * @property {string} name
 * @property {string} url
 * @property {string} description
 * @property {'official'|'community'|'unofficial'|'deprecated'} status
 * @property {'active'|'stale'|'archived'|'unknown'} [maintenance]
 * @property {'rest'|'graphql'|'sdk'|'scraper'|'webhook'|'form'|'none'} [api]
 * @property {string[]} [tags]
 * @property {boolean} [starred]
 * @property {string} [note]
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} title
 * @property {string} [tagline]
 * @property {string} description
 * @property {string} [icon]
 * @property {number} order
 * @property {Resource[]} resources
 */

/** @type {Category[]} */
export const categories = Object.values(modules)
  .map((m) => m.default || m)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

/** Flattened list with category metadata attached to each resource. */
export const allResources = categories.flatMap((cat) =>
  cat.resources.map((r) => ({
    ...r,
    categoryId: cat.id,
    categoryTitle: cat.title,
    categoryIcon: cat.icon,
  }))
)

/**
 * Convenience lookup by category id.
 * @param {string} id
 * @returns {Category | undefined}
 */
export function getCategoryById(id) {
  return categories.find((c) => c.id === id)
}

/**
 * Aggregate statistics for the hero / about page.
 * @returns {{categories: number, resources: number, official: number, community: number, unofficial: number, starred: number}}
 */
export function getStats() {
  return {
    categories: categories.length,
    resources: allResources.length,
    official: allResources.filter((r) => r.status === 'official').length,
    community: allResources.filter((r) => r.status === 'community').length,
    unofficial: allResources.filter((r) => r.status === 'unofficial').length,
    starred: allResources.filter((r) => r.starred).length,
  }
}
