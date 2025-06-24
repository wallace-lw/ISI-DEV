export type Coupon = {
	id: string;
	code: string;
	type: "fixed" | "percentage";
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
