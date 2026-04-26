import React from "react";
import { Link } from "react-router-dom";

export default function HomePage({ stats }) {
	return (
		<div className="bg-ink text-parchment">
			{/* Hero Section */}
			<section className="container-main py-20 md:py-32">
				<div className="max-w-3xl">
					<p className="text-accent text-sm font-mono tracking-wider mb-4">
						● VOLUME I · EDITION 2024 · AN OPEN ATLAS
					</p>
					<h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6">
						The digital ecosystem of <span className="text-accent">Nepal</span>
					</h1>
					<p className="text-lg text-parchment/80 mb-8 leading-relaxed">
						A curated, community-maintained atlas of every meaningful digital
						tool, API, SDK, dataset, library, and developer resource built{" "}
						<em>in, for,</em> or <em>commonly used in</em> Nepal — for
						development, research, and educational purposes.
					</p>
					<Link to="/atlas" className="btn-primary inline-block">
						Explore the Atlas
					</Link>
				</div>
			</section>

			{/* Stats Section */}
			<section className="container-main py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
				{stats && (
					<>
						<div>
							<p className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2">
								{stats.categories || 21}
							</p>
							<p className="text-parchment/60 text-sm">CATEGORIES</p>
						</div>
						<div>
							<p className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2">
								{stats.resources || 315}
							</p>
							<p className="text-parchment/60 text-sm">RESOURCES</p>
						</div>
						<div>
							<p className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2">
								{stats.essentials || 90}
							</p>
							<p className="text-parchment/60 text-sm">ESSENTIALS</p>
						</div>
						<div>
							<p className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2">
								{stats.official || 137}
							</p>
							<p className="text-parchment/60 text-sm">OFFICIAL</p>
						</div>
					</>
				)}
			</section>

			{/* CTA Section */}
			<section className="container-main py-16 border-t border-parchment/20">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="text-3xl font-serif font-bold mb-6">
						Help us grow the atlas
					</h2>
					<p className="text-parchment/80 mb-8">
						Know a tool, API, or resource that should be here? Contribute on
						GitHub or suggest it via an issue.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="https://github.com/raazkhnl/awesome-digital-nepal"
							target="_blank"
							rel="noopener noreferrer"
							className="btn-primary"
						>
							View on GitHub
						</a>
						<a
							href="https://github.com/raazkhnl/awesome-digital-nepal/issues/new?template=new-resource.yml"
							target="_blank"
							rel="noopener noreferrer"
							className="btn-secondary"
						>
							Suggest a Resource
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
