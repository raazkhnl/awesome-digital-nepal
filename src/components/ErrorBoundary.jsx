import React from "react";

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error("Error caught:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="flex items-center justify-center min-h-screen bg-parchment">
					<div className="text-center">
						<h1 className="text-4xl font-serif text-ink mb-4">
							Something went wrong
						</h1>
						<p className="text-ink/70 mb-6">
							Please refresh the page or report this issue on GitHub.
						</p>
						<button
							onClick={() => window.location.reload()}
							className="px-6 py-2 bg-accent text-white rounded hover:bg-accent/90"
						>
							Reload Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
