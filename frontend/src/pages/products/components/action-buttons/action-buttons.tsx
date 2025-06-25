import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CouponDialog } from "../coupon-dialog";
import * as T from "./types";

export const ActionButtons = ({ id }: T.ActionButtonsProps) => {
	return (
		<div className="flex gap-4">
			<Link to={`/products/${id}/edit`}>
				<Button
					variant={"ghost"}
					size={"icon"}
					className="size-5 hover:text-blue-500 transition-colors"
				>
					<DynamicIcon name="edit" />
				</Button>
			</Link>
			<CouponDialog productId={id} />
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
