import { Link } from 'react-router-dom'

/**
 * 404 — kept terse and on-brand. Big serif "404" with a return link.
 */
export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p
        className="display-num text-9xl text-crimson mb-4"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        404
      </p>
      <h1 className="font-display text-3xl tracking-tight mb-3">
        This page does not exist in the atlas.
      </h1>
      <p className="font-body text-lg mb-8" style={{ color: 'var(--ink-soft)' }}>
        It may have been deprecated, archived, or never recorded.
      </p>
      <Link
        to="/"
        className="inline-block font-sans text-sm px-5 py-2.5"
        style={{ background: 'var(--ink)', color: 'var(--bg)' }}
      >
        ← Return to atlas home
      </Link>
    </div>
  )
}
