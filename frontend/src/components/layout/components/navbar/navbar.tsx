import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { NavLink, useLocation } from "react-router";
import { Logo } from "./components";
import { navIcons, navLinks } from "./utils";

export const Navbar = () => {
	const location = useLocation();

	return (
		<aside className="h-full border border-accent flex flex-col justify-between w-fit xl:w-64">
			<div className="flex flex-col gap-6">
				<header className="flex items-center gap-2 w-full p-4">
					<h1 className="font-kanit font-bold text-3xl hidden xl:block">
						grupo
					</h1>
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
							<Label className="font-semibold cursor-pointer hidden xl:block">
								{item.label}
							</Label>
						</NavLink>
					))}
				</nav>
			</div>
			<footer className="w-full py-2 border-t border-accent">
				<Button
					variant={"ghost"}
					className="text-red-500 text-lg w-full justify-start px-4 hidden xl:flex"
				>
					Sair <LogOut />
				</Button>
				<Button
					variant={"ghost"}
					className="text-red-500 text-lg w-full flex justify-center px-4 xl:hidden"
				>
					<LogOut />
				</Button>
			</footer>
		</aside>
	);
};
