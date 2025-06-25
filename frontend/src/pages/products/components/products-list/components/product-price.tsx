import { formatCurrencyBRL } from "@/utils";
import type * as T from "./types";

export const ProductPrice = ({
	price,
	finalPrice,
	discount,
	hasCouponApplied,
}: T.ProductPriceProps) => {
	console.log(discount);

	const isPercentDiscount =
		discount?.type.toLowerCase() === "percent" && hasCouponApplied;

	return (
		<div className="flex items-center gap-1">
			<div className="flex flex-col items-start gap-1">
				{hasCouponApplied && (
					<div className="flex gap-2">
						<span className="line-through text-gray-500 ">
							{formatCurrencyBRL(price / 100)}
						</span>
					</div>
				)}

				<span className="text-black  font-semibold">
					{formatCurrencyBRL(finalPrice / 100)}
				</span>
			</div>

			{isPercentDiscount && (
				<span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full font-light">
					{discount.value / 100}%
				</span>
			)}
		</div>
	);
};
