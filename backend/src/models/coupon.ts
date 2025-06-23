import { z } from "zod";
import { couponCodeSchema, validateCouponValue } from "@/utils";

export const CouponTypeSchema = z.enum(["fixed", "percent"]);

export const CouponSchema = z.object({
	id: z.string().uuid(),
	code: couponCodeSchema,
	type: CouponTypeSchema,
	value: z
		.number()
		.int()
		// @ts-ignore
		.refine((val, ctx) => {
			if (!validateCouponValue(val, ctx.path[0] as "fixed" | "percent")) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						ctx.path[0] === "percent"
							? "Valor percentual deve estar entre 1% e 80%"
							: "Valor fixo deve ser positivo",
				});
				return false;
			}
			return true;
		}),
	oneShot: z.boolean(),
	validFrom: z.date(),
	validUntil: z.date(),
	usesCount: z.number().int(),
	maxUses: z.number().int().optional().nullable(),
});

export const CreateCouponSchema = CouponSchema.pick({
	code: true,
	type: true,
	value: true,
	oneShot: true,
	validFrom: true,
	validUntil: true,
	maxUses: true,
});

export const UpdateCouponSchema = CouponSchema.pick({
	type: true,
	value: true,
	oneShot: true,
	validFrom: true,
	validUntil: true,
	maxUses: true,
});

export type Coupon = z.infer<typeof CouponSchema>;
export type CreateCoupon = z.infer<typeof CreateCouponSchema>;
export type UpdateCoupon = z.infer<typeof UpdateCouponSchema>;
export type CouponType = z.infer<typeof CouponTypeSchema>;
