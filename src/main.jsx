import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

/**
 * Application bootstrap.
 *
 * StrictMode is intentionally enabled — the app is small enough that any
 * double-invocations from concurrent rendering checks won't be expensive,
 * and it surfaces accidental side effects in development.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
