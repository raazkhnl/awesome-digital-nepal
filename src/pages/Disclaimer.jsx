/**
 * Disclaimer page.
 *
 * Legally important — this is what the entire repo points to whenever
 * unofficial scrapers, government APIs, or risky integrations are mentioned.
 * The text mirrors DISCLAIMER.md in the repo root so a printed PDF and the
 * website say the same thing.
 */
export default function Disclaimer() {
  return (
    <article className="container-page py-12 md:py-16 max-w-3xl">
      <p
        className="font-mono text-[11px] uppercase tracking-[0.25em] mb-3"
        style={{ color: 'var(--crimson)' }}
      >
        Important Notice
      </p>
      <h1
        className="font-display tracking-tightest leading-[1] mb-8"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontVariationSettings: '"opsz" 144',
        }}
      >
        Disclaimer
      </h1>

      <div
        className="font-body text-lg leading-[1.75] space-y-6"
        style={{ color: 'var(--ink-soft)' }}
      >
        <p
          className="text-xl font-display italic p-6 border-l-4"
          style={{
            borderColor: 'var(--crimson)',
            background: 'var(--card)',
            color: 'var(--ink)',
          }}
        >
          This is an unofficial, community-curated list maintained for
          development, research, and educational purposes. It is not affiliated
          with the Government of Nepal, Nepal Rastra Bank, NEPSE, or any listed
          organization.
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          Scope and intent
        </h2>
        <p>
          Awesome Digital Nepal is a reference for developers, researchers,
          students, and the curious. Listed APIs, scrapers, and SDKs may
          change, become deprecated, or violate platform terms of service at
          any time. <strong>Inclusion in this list is not an endorsement.</strong>
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          Unofficial APIs and scrapers
        </h2>
        <p>
          Use of any unofficial scraper or wrapper listed here is{' '}
          <strong>at your own risk</strong>. Always:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Read the upstream provider's terms of service before integrating into production.</li>
          <li>Respect <code className="font-mono text-sm">robots.txt</code> and rate-limit aggressively.</li>
          <li>Attribute the source.</li>
          <li>Never republish personal or private data.</li>
          <li>Prefer official APIs whenever they exist — even if less convenient.</li>
        </ul>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          Cryptocurrency
        </h2>
        <p
          className="p-6 border-l-4"
          style={{
            borderColor: 'var(--crimson)',
            background: 'rgba(178, 58, 58, 0.05)',
          }}
        >
          <strong style={{ color: 'var(--crimson)' }}>
            Cryptocurrency trading, mining, and holding is illegal in Nepal.
          </strong>{' '}
          Per Nepal Rastra Bank notices (2017 onward, reinforced 2021–25),
          the Foreign Exchange Regulation Act 1962, the NRB Act 2002, and the
          National Penal Code 2017, penalties range from 3–7 years imprisonment
          and fines up to 3× the transaction amount. No crypto integrations are
          recommended for Nepal-based users, and none are listed in this atlas.
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          Personal data
        </h2>
        <p>
          Sources that aggregate personally identifiable information at scale
          (voter rolls with PII, individual taxpayer records, etc.) are{' '}
          <strong>deliberately excluded</strong> from this catalog, even when
          such tools exist publicly. The Electronic Transactions Act 2063 and
          related Nepali laws place real liability on unauthorized access.
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          Accuracy
        </h2>
        <p>
          Every entry was verified at time of inclusion, but the digital
          ecosystem moves quickly. URLs may break, projects may be archived,
          maintainers may change. If you spot something out of date, please{' '}
          <a
            href="https://github.com/raazkhnl/awesome-digital-nepal/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink"
          >
            open an issue
          </a>{' '}
          or submit a pull request.
        </p>

        <h2
          className="font-display text-3xl tracking-tight pt-6"
          style={{ color: 'var(--ink)' }}
        >
          No warranty
        </h2>
        <p>
          This atlas is provided "as is", without warranty of any kind, express
          or implied. The maintainers are not liable for any damages arising
          from use of the information contained herein.
        </p>

        <hr className="rule-line my-8" />

        <p className="font-mono text-sm" style={{ color: 'var(--ink-muted)' }}>
          Last updated with each release. See the repository for full revision
          history.
        </p>
      </div>
    </article>
  )
}
