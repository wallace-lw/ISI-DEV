import * as z from "zod";

export const couponCodeSchema = z.object({
	coupon: z.string().optional(),
});
