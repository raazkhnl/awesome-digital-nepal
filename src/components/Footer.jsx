import { Link } from 'react-router-dom'

/**
 * Site footer.
 *
 * Three columns on desktop, stacked on mobile:
 *   1. Wordmark + tagline + the famous "made with ꨄ︎ by @raazkhnl" line.
 *   2. Internal navigation.
 *   3. External / project links (GitHub, license, contributing).
 *
 * Subtle copyright line at the very bottom with the current year.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-24 pt-16 pb-10"
      style={{
        borderTop: '1px solid var(--rule)',
        background: 'var(--bg-deep)',
      }}
    >
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Identity */}
          <div>
            <h2
              className="font-display text-2xl tracking-tightest mb-3"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              Awesome <span className="text-crimson">Digital</span> Nepal
              <span className="text-saffron text-lg ml-1.5" aria-hidden>
                ꨄ︎
              </span>
            </h2>
            <p
              className="font-body text-base leading-relaxed max-w-sm"
              style={{ color: 'var(--ink-soft)' }}
            >
              An atlas of Nepal's digital ecosystem. APIs, SDKs, datasets,
              libraries, communities — curated for developers, researchers,
              and the curious.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h3
              className="font-mono text-[11px] uppercase tracking-widest mb-4"
              style={{ color: 'var(--ink-muted)' }}
            >
              Navigate
            </h3>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <Link to="/" className="hover:text-crimson transition-colors">
                  Atlas Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-crimson transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-crimson transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-crimson transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Project */}
          <div>
            <h3
              className="font-mono text-[11px] uppercase tracking-widest mb-4"
              style={{ color: 'var(--ink-muted)' }}
            >
              Project
            </h3>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <a
                  href="https://github.com/raazkhnl/awesome-digital-nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-crimson transition-colors"
                >
                  GitHub Repository ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/raazkhnl/awesome-digital-nepal/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-crimson transition-colors"
                >
                  Contributing Guide ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/raazkhnl/awesome-digital-nepal/issues/new/choose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-crimson transition-colors"
                >
                  Suggest a Resource ↗
                </a>
              </li>
              <li>
                <a
                  href="https://creativecommons.org/publicdomain/zero/1.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-crimson transition-colors"
                >
                  CC0 1.0 Licensed
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="rule-line mb-6" />

        {/* Bottom strip */}
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4">
          <p
            className="font-mono text-[11px] tracking-wide"
            style={{ color: 'var(--ink-muted)' }}
          >
            © {year} Awesome Digital Nepal. Content under CC0 1.0. Code MIT.
          </p>
          <p
            className="font-body text-sm italic"
            style={{ color: 'var(--ink-soft)' }}
          >
            made with{' '}
            <span className="text-crimson not-italic" aria-label="love">
              ꨄ︎
            </span>{' '}
            by{' '}
            <a
              href="https://github.com/raazkhnl"
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink"
            >
              @raazkhnl
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
