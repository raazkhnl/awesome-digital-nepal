import StatusBadge from "./StatusBadge";

/**
 * Compact card for one resource.
 * - Whole card is a click target (anchor wraps it).
 * - Status, maintenance, and API tags are surfaced as scannable metadata.
 * - The "starred" prop adds a small crimson tick for must-know entries.
 * - Optional `note` becomes a small caveat in saffron.
 */
const MAINTENANCE_LABEL = {
	active: "active",
	stale: "stale",
	archived: "archived",
	unknown: "unknown",
};

const API_LABEL = {
	rest: "REST",
	graphql: "GraphQL",
	sdk: "SDK",
	scraper: "Scraper",
	webhook: "Webhook",
	form: "Form-only",
	none: "No API",
};

export default function ResourceCard({ resource }) {
	const {
		name,
		url,
		description,
		status,
		maintenance,
		api,
		starred,
		note,
		tags,
	} = resource;

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="resource-card group flex flex-col w-full h-full"
		>
			<div className="flex items-start justify-between gap-4 mb-2">
				<h3 className="font-display text-xl leading-tight tracking-tight group-hover:text-crimson transition-colors">
					{starred && (
						<span
							aria-label="essential"
							title="Essential"
							className="text-crimson mr-1.5"
						>
							★
						</span>
					)}
					{name}
				</h3>
				<span
					className="font-mono text-xs opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1"
					aria-hidden="true"
				>
					↗
				</span>
			</div>

			<p
				className="text-sm leading-relaxed mb-4 flex-grow"
				style={{ color: "var(--ink-soft)" }}
			>
				{description}
			</p>

			{note && (
				<p
					className="text-xs italic mb-3 px-2 py-1.5 border-l-2"
					style={{
						color: "var(--ink-muted)",
						borderColor: "var(--saffron)",
						background: "rgba(232, 163, 61, 0.06)",
					}}
				>
					⚠ {note}
				</p>
			)}

			<div className="flex flex-wrap items-center gap-2 text-xs mt-auto pt-3">
				<StatusBadge status={status} />
				{maintenance && maintenance !== "unknown" && (
					<span
						className="font-mono text-[11px] uppercase tracking-wider"
						style={{ color: "var(--ink-muted)" }}
					>
						<span className={`dot dot-${maintenance}`} />
						{MAINTENANCE_LABEL[maintenance]}
					</span>
				)}
				{api && api !== "none" && (
					<span
						className="font-mono text-[11px] px-1.5 py-0.5"
						style={{
							color: "var(--ink-muted)",
							border: "1px dashed var(--rule)",
							borderRadius: "2px",
						}}
					>
						{API_LABEL[api]}
					</span>
				)}
				{tags && tags.length > 0 && (
					<span
						className="font-mono text-[11px]"
						style={{ color: "var(--ink-muted)" }}
					>
						{tags.map((t) => `#${t}`).join(" ")}
					</span>
				)}
			</div>
		</a>
	);
}
