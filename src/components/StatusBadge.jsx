/**
 * Visual badge for a resource's status.
 *
 * official    → "first-party / government" (green sage)
 * community   → "third-party but legitimately published" (indigo)
 * unofficial  → "scraper / reverse-engineered" (saffron)
 * deprecated  → "no longer maintained" (crimson, struck through)
 */
const LABELS = {
  official: 'Official',
  community: 'Community',
  unofficial: 'Unofficial',
  deprecated: 'Deprecated',
}

const CLASSES = {
  official: 'badge-official',
  community: 'badge-community',
  unofficial: 'badge-unofficial',
  deprecated: 'badge-deprecated',
}

export default function StatusBadge({ status }) {
  if (!status) return null
  return <span className={`badge ${CLASSES[status] || ''}`}>{LABELS[status] || status}</span>
}
