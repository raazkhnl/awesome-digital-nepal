import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import About from "./pages/About";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

/**
 * Root application component.
 *
 * Why HashRouter? GitHub Pages serves a static 404.html for any unknown URL
 * and there's no server-side rewrite available on a project page. HashRouter
 * keeps everything client-side (`/#/category/fintech-payments`), so deep links
 * always work without extra deployment shims.
 *
 * The Layout route wraps every page so they share Header/Footer chrome and
 * the scroll-to-top-on-navigation behavior.
 */
export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/category/:id" element={<Category />} />
					<Route path="/search" element={<Search />} />
					<Route path="/about" element={<About />} />
					<Route path="/disclaimer" element={<Disclaimer />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}
