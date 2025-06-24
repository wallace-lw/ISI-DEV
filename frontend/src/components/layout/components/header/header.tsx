import { Label } from "@radix-ui/react-label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
	return (
		<header className="h-16 px-16 w-full border border-b-accent border-l-0">
			<div className="w-full flex justify-end py-4 items-center gap-3">
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>AM</AvatarFallback>
				</Avatar>
				<Label>Arthur Morgan</Label>
			</div>
		</header>
	);
};
