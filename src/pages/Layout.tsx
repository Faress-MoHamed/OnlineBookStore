import TopHeader from "../components/TopHeader/TopHeader";
import NavBar from "../components/NavBar/NavBar";

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function Layout() {
	return (
		<>
			<header className="font-Inter">
				<TopHeader />
				<NavBar />
			</header>
			<main className="font-Inter">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
