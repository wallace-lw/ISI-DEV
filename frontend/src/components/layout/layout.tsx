import { Outlet } from "react-router";
import { Header, Navbar } from "./components";

export const Layout = () => {
	return (
		<div className="h-screen flex">
			<Navbar />
			<div className="flex flex-col w-full">
				<Header />
				<div className="w-full flex-1 bg-[#f8fbfd]">
					<main className="overflow-auto container w-full mx-auto px-4 py-6">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
};
