import type { z } from "zod";
import type { couponCodeSchema } from "./schema";

export type CouponSchema = z.infer<typeof couponCodeSchema>;

export type CouponProps = {
	onSuccess: () => void;
};

export type Coupon = {
	id: string;
	code: string;
	label: string;
};
