import { LogOut, X } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { NavLink, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useNavbar } from "@/stores/navbar/navbar";
import { Logo } from "./components";
import { navIcons, navLinks } from "./utils";

export const Navbar = () => {
	const location = useLocation();
	const [navbar, setNavbar] = useNavbar();

	const closeSidebar = () => setNavbar({ ...navbar, isOpen: false });

	return (
		<>
			<aside className="hidden lg:flex h-full border border-accent flex-col justify-between w-72">
				<div className="flex flex-col gap-6">
					<header className="flex items-center gap-2 w-full p-4">
						<h1 className="font-kanit font-bold text-3xl">grupo</h1>
						<Logo />
					</header>
					<nav className="flex flex-col gap-3">
						{navLinks.map((item) => (
							<NavLink
								key={item.value}
								to={item.path}
								className={cn(
									"flex items-center gap-2 hover:bg-neutral-100 transition px-4 py-2",
									location.pathname === item.path && "bg-neutral-200",
								)}
							>
								<DynamicIcon name={navIcons[item.value]} size={24} />
								<Label className="font-semibold cursor-pointer">
									{item.label}
								</Label>
							</NavLink>
						))}
					</nav>
				</div>

				<footer className="w-full py-2 border-t border-accent">
					<Button
						variant={"ghost"}
						className="text-red-500 text-lg w-full justify-start px-4 flex"
					>
						Sair <LogOut />
					</Button>
				</footer>
			</aside>

			{navbar.isOpen && (
				<div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
					<aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col justify-between z-50">
						<div className="flex flex-col gap-6">
							<header className="flex items-center justify-between p-4">
								<div className="flex items-center gap-2">
									<h1 className="font-kanit font-bold text-2xl">grupo</h1>
									<Logo />
								</div>
								<Button variant="ghost" size="icon" onClick={closeSidebar}>
									<X className="w-5 h-5" />
								</Button>
							</header>

							<nav className="flex flex-col gap-3 px-2">
								{navLinks.map((item) => (
									<NavLink
										key={item.value}
										to={item.path}
										onClick={closeSidebar}
										className={cn(
											"flex items-center gap-2 hover:bg-neutral-100 transition px-4 py-2 rounded",
											location.pathname === item.path && "bg-neutral-200",
										)}
									>
										<DynamicIcon name={navIcons[item.value]} size={24} />
										<Label className="font-semibold cursor-pointer">
											{item.label}
										</Label>
									</NavLink>
								))}
							</nav>
						</div>

						<footer className="border-t border-accent p-4">
							<Button
								variant="ghost"
								className="text-red-500 text-lg w-full justify-start"
							>
								Sair <LogOut />
							</Button>
						</footer>
					</aside>
				</div>
			)}
		</>
	);
};
