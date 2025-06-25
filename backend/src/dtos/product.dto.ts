import type { CouponType } from "@/models";

export interface DiscountDTO {
	type: CouponType;
	value: number;
	appliedAt: string;
}

export interface PublicProductDTO {
	id: string;
	name: string;
	description: string | null;
	stock: number;
	isOutOfStock: boolean;
	price: number;
	finalPrice: number;
	discount?: DiscountDTO;
	hasCouponApplied: boolean;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}
