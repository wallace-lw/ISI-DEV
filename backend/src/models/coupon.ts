import { z } from "zod";
import { couponCodeSchema, validateCouponValue } from "@/utils";

export const CouponTypeSchema = z.enum(["FIXED", "PERCENT"]);

export const CouponBaseSchema = z.object({
	id: z.string().uuid(),
	code: couponCodeSchema,
	type: CouponTypeSchema,
	value: z.number().int(),
	oneShot: z.boolean(),
	validFrom: z.date(),
	validUntil: z.date(),
	usesCount: z.number().int(),
	maxUses: z.number().int().optional().nullable(),
});

export const CouponSchema = CouponBaseSchema.superRefine((data, ctx) => {
	if (!validateCouponValue(data.value, data.type)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message:
				data.type === "PERCENT"
					? "Valor percentual deve estar entre 1% e 80%"
					: "Valor fixo deve ser positivo",
		});
	}
});

export const CreateCouponSchema = CouponBaseSchema.pick({
	code: true,
	type: true,
	value: true,
	oneShot: true,
	validFrom: true,
	validUntil: true,
	maxUses: true,
});

export const UpdateCouponSchema = CouponBaseSchema.pick({
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
