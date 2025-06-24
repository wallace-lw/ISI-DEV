import { Label } from "@radix-ui/react-label";
import { MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavbar } from "@/stores/navbar/navbar";

export const Header = () => {
	const [navbar, setNavbar] = useNavbar();

	return (
		<>
			<header className="h-16 w-full border-b border-accent items-center justify-between flex lg:justify-end px-4 md:px-6 py-2">
				<MenuIcon
					className="lg:hidden"
					onClick={() => setNavbar({ ...navbar, isOpen: true })}
				/>

				<div className="flex gap-3 items-center">
					<Avatar>
						<AvatarImage src="https://github.com/wallace-lw.png" />
						<AvatarFallback>WL</AvatarFallback>
					</Avatar>
					<Label className="font-semibold font-kanit tracking-wide">
						Wallace Leonardo
					</Label>
				</div>
			</header>
		</>
	);
};
