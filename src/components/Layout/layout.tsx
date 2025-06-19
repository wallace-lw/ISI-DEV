import { Header, Navbar } from "./components";

type LayoutProps = {
	children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="h-screen flex">
			<Navbar />
			<div className="flex flex-col flex-1">
				<Header />
				<main className="flex-1 bg-white p-4 overflow-auto">{children}</main>
			</div>
		</div>
	);
};
