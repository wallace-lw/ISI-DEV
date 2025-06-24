import { Label } from "@radix-ui/react-label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
	return (
		<header className="h-16 px-16 w-full border border-b-accent border-l-0">
			<div className="w-full flex justify-end py-4 items-center gap-3">
				<Avatar>
					<AvatarImage src="https://github.com/wallace-lw.png" />
					<AvatarFallback>WL</AvatarFallback>
				</Avatar>
				<Label className="font-semibold font-kanit tracking-wide">
					Wallace Leonardo
				</Label>
			</div>
		</header>
	);
};
