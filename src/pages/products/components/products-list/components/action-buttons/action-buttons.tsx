import { Button } from "@/components/ui/button";
import { DynamicIcon } from "lucide-react/dynamic";

export const ActionButtons = () => {
	return (
		<div className="flex gap-4">
			<Button
				variant={"ghost"}
				size={"icon"}
				className="size-5 hover:text-blue-500 transition-colors"
			>
				<DynamicIcon name="edit" />
			</Button>
			<Button
				variant={"ghost"}
				size={"icon"}
				className="size-5 hover:text-green-600 transition-colors"
			>
				<DynamicIcon name="dollar-sign" />
			</Button>
			<Button
				variant={"ghost"}
				size={"icon"}
				className="size-5 hover:text-red-600 transition-colors"
			>
				<DynamicIcon name="trash" />
			</Button>
		</div>
	);
};
