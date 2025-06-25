import type { Coupon, CouponType, CreateCoupon, UpdateCoupon } from "@/models";
import prisma from "@/utils/db";

export interface CouponRepository {
	create(data: CreateCoupon): Promise<string>;
	find(code: string): Promise<Coupon>;
	findAll(): Promise<Coupon[]>;
	update(id: string, data: UpdateCoupon): Promise<void>;
	delete(id: string): Promise<void>;
	restore(id: string): Promise<void>;
	findValidCouponByCode(code: string): Promise<Coupon | null>;
	incrementUses(couponId: string): Promise<void>;
}

export class CouponRepositoryImpl implements CouponRepository {
	async create(data: CreateCoupon): Promise<string> {
		const result = await prisma.coupon.create({
			data: {
				...data,
				type: data.type as CouponType,
			},
		});
		return result?.id;
	}

	async find(code: string): Promise<Coupon> {
		const coupon = await prisma.coupon.findUnique({
			where: { code },
		});
		return coupon as Coupon;
	}

	async findAll(): Promise<Coupon[]> {
		const coupons = await prisma.coupon.findMany();
		return coupons as Coupon[];
	}

	async update(id: string, data: UpdateCoupon): Promise<void> {
		await prisma.coupon.update({
			where: { id },
			data: data,
		});
	}

	async delete(id: string): Promise<any> {
		await prisma.coupon.update({
			where: { id },
			data: { deletedAt: new Date() },
		});
	}

	async restore(id: string): Promise<any> {
		await prisma.coupon.update({
			where: { id },
			data: { deletedAt: null },
		});
	}

	async findValidCouponByCode(code: string): Promise<Coupon | null> {
		const couponOrNull = (await prisma.coupon.findFirst({
			where: {
				code,
				validFrom: { lte: new Date() },
				validUntil: { gte: new Date() },
			},
		})) as Coupon | null;
		return couponOrNull;
	}

	async incrementUses(couponId: string): Promise<void> {
		await prisma.coupon.update({
			where: { id: couponId },
			data: { usesCount: { increment: 1 } },
		});
	}
}
