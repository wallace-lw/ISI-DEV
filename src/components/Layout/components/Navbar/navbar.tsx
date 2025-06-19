import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Logo } from "./components";
import { navIcons, navLinks } from "./utils";

export const Navbar = () => {
	return (
		<aside className="w-56 h-full border border-accent flex flex-col justify-between">
			<div className="flex flex-col gap-6">
				<header className="flex items-center gap-2 w-full p-4">
					<h1 className="font-kanit font-bold text-3xl">grupo</h1>
					<Logo />
				</header>
				<nav className="flex flex-col gap-3">
					{navLinks.map((item) => (
						<a
							key={item.value}
							href={item.path}
							className="flex items-center gap-2 hover:bg-neutral-100 transition px-4 py-2"
						>
							<DynamicIcon name={navIcons[item.value]} size={24} />
							<Label className="font-semibold cursor-pointer">
								{item.label}
							</Label>
						</a>
					))}
				</nav>
			</div>
			<footer className="w-full py-2">
				<Button
					variant={"ghost"}
					className="text-red-500 cursor-pointer text-lg w-full flex justify-start px-4"
				>
					Sair <LogOut />
				</Button>
			</footer>
		</aside>
	);
};
