import { useMemo } from 'react'
import { allResources } from '../data/loader'

/**
 * Lightweight client-side search across all resources.
 *
 * No fuzzy matching — the dataset is small (~hundreds of items) and exact /
 * substring matching keeps results predictable and fast. Results are scored
 * by where the term hits (name > tags > description > category).
 *
 * @param {string} query
 * @param {{ status?: string, category?: string }} [filters]
 * @returns {Array<Resource & { _score: number }>}
 */
export function useSearch(query, filters = {}) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()
    let pool = allResources

    if (filters.status && filters.status !== 'all') {
      pool = pool.filter((r) => r.status === filters.status)
    }
    if (filters.category && filters.category !== 'all') {
      pool = pool.filter((r) => r.categoryId === filters.category)
    }

    if (!q) return pool

    const scored = []
    for (const r of pool) {
      let score = 0
      const name = r.name.toLowerCase()
      const desc = r.description.toLowerCase()
      const cat = (r.categoryTitle || '').toLowerCase()
      const tags = (r.tags || []).join(' ').toLowerCase()

      if (name.includes(q)) score += 10
      if (name.startsWith(q)) score += 5
      if (tags.includes(q)) score += 4
      if (desc.includes(q)) score += 2
      if (cat.includes(q)) score += 1

      if (score > 0) scored.push({ ...r, _score: score })
    }
    return scored.sort((a, b) => b._score - a._score)
  }, [query, filters.status, filters.category])
}
