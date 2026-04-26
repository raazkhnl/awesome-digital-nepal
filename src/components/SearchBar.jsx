/**
 * Search input + status filter row.
 *
 * Controlled component — parent owns query/filter state and passes setters.
 * Designed to look like a printed form field: rule-bordered, serif label,
 * mono input. Filter pills double as visual category counters.
 */
const STATUSES = [
	{ id: "all", label: "All" },
	{ id: "official", label: "Official" },
	{ id: "community", label: "Community" },
	{ id: "unofficial", label: "Unofficial" },
	{ id: "deprecated", label: "Deprecated" },
];

export default function SearchBar({
	query,
	setQuery,
	status,
	setStatus,
	count,
}) {
	return (
		<div className="space-y-4">
			<div
				className="flex items-center gap-3 px-4 py-3"
				style={{
					background: "var(--card)",
					border: "1px solid var(--rule)",
				}}
			>
				<span className="text-xl" style={{ color: "var(--ink-muted)" }}>
					⌕
				</span>
				<input
					type="text"
					autoFocus
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search the atlas — eSewa, NEPSE, OCR, Nepali date…"
					className="flex-1 bg-transparent font-body text-base placeholder:opacity-50"
					style={{ color: "var(--ink)", outline: "none" }}
				/>
				{query && (
					<button
						onClick={() => setQuery("")}
						className="font-mono text-xs px-2 py-1 hover:text-crimson"
						style={{ color: "var(--ink-muted)" }}
						aria-label="Clear search"
					>
						✕ clear
					</button>
				)}
			</div>

			<div className="flex flex-wrap items-center gap-2 text-sm">
				<span
					className="font-mono text-[11px] uppercase tracking-widest mr-2"
					style={{ color: "var(--ink-muted)" }}
				>
					Filter:
				</span>
				{STATUSES.map((s) => {
					const active = status === s.id;
					return (
						<button
							key={s.id}
							onClick={() => setStatus(s.id)}
							className="font-mono text-xs px-2.5 py-1 transition-all"
							style={{
								background: active ? "var(--ink)" : "transparent",
								color: active ? "var(--bg)" : "var(--ink-soft)",
								border: "1px solid",
								borderColor: active ? "var(--ink)" : "var(--rule)",
								borderRadius: "2px",
							}}
						>
							{s.label}
						</button>
					);
				})}
				{typeof count === "number" && (
					<span
						className="ml-auto font-mono text-xs"
						style={{ color: "var(--ink-muted)" }}
					>
						{count} result{count !== 1 && "s"}
					</span>
				)}
			</div>
		</div>
	);
}
