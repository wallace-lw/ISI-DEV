import { DynamicIcon } from "lucide-react/dynamic";
import type * as T from "./types";

export const PageTitle = ({ title, icon }: T.PageTitleProps) => {
	return (
		<div className="flex gap-2 items-end">
			<DynamicIcon name={icon} size={36} />
			<h1 className="text-2xl font-semibold font-kanit">{title}</h1>
		</div>
	);
};
