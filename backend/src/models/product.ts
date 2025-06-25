import { z } from "zod";
import { normalizeName } from "@/utils";

export const ProductSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1).max(100).transform(normalizeName),
	description: z.string().max(300).optional().nullable(),
	stock: z.number().int().min(0).max(999999),
	price: z.number().int().min(1),
	createdAt: z.date(),
	updatedAt: z.date().optional().nullable(),
	deletedAt: z.date().optional().nullable(),
});

export const CreateProductSchema = ProductSchema.pick({
	name: true,
	description: true,
	stock: true,
	price: true,
});

export const UpdateProductSchema = z.object({
	name: z.string().min(1).max(100).transform(normalizeName).optional(),
	description: z.string().max(300).optional().nullable(),
	stock: z.number().int().min(0).max(999999).optional(),
	price: z.number().int().min(1).optional(),
});

export const ApplyPercentDiscountSchema = z.object({
	percentage: z.number().int().min(1).max(80),
});

export const ApplyCouponSchema = z.object({
	code: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
export type ApplyPercentDiscount = z.infer<typeof ApplyPercentDiscountSchema>;
export type ApplyCoupon = z.infer<typeof ApplyCouponSchema>;
