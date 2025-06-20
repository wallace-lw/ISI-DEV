import { Outlet } from "react-router";
import { Header, Navbar } from "./components";

export const Layout = () => {
	return (
		<div className="h-screen flex">
			<Navbar />
			<div className="flex flex-col flex-1">
				<Header />
				<main className="flex-1 px-24 py-6 overflow-auto bg-[#f8fbfd]">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
