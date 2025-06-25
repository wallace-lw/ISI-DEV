import type { Discount } from "@/services/products/types";

export type ProductPriceProps = {
	price: number;
	finalPrice: number;
	discount?: Discount;
	hasCouponApplied: boolean;
};
