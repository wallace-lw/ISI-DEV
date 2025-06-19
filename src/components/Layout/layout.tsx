import { Outlet } from "react-router";
import { Header, Navbar } from "./components";

export const Layout = () => {
	return (
		<div className="h-screen flex">
			<Navbar />
			<div className="flex flex-col flex-1">
				<Header />
				<main className="flex-1 bg-white p-4 overflow-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
