export type CouponType = "FIXED" | "PERCENT";

export type Coupon = {
	id: string;
	code: string;
	type: CouponType;
	value: number;
	oneShot: boolean;
	validFrom: string;
	validUntil: string;
	usesCount: number;
	maxUses: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
};
