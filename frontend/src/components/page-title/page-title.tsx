import { DynamicIcon } from "lucide-react/dynamic";
import type * as T from "./types";

export const PageTitle = ({ title, icon }: T.PageTitleProps) => {
	return (
		<div className="flex gap-2 items-end">
			<DynamicIcon name={icon} className="size-8 md:size-9" />
			<h1 className="text-xl md:text-2xl font-semibold font-kanit">{title}</h1>
		</div>
	);
};
