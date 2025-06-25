import type { CouponRepository, ProductRepository } from "@/repositories";
import prisma from "@/utils/db";
import { AppError, AppErrorCode } from "@/utils/errors";

export class ApplyCouponDiscountService {
	constructor(
		private productRepository: ProductRepository,
		private couponRepository: CouponRepository,
	) {}
	async execute(id: string, code: string) {
		const result = await prisma.$transaction(async (_tx) => {
			const discountExists = await this.productRepository.hasDiscount(id);

			if (discountExists) {
				throw new AppError(
					AppErrorCode.CONFLICT,
					"Discount already applied",
					409,
				);
			}

			const coupon = await this.couponRepository.findValidCouponByCode(code);

			if (!coupon) {
				throw new AppError(AppErrorCode.NOT_FOUND, "Coupon not found", 404);
			}

			if (coupon?.maxUses! !== null && coupon.usesCount >= coupon?.maxUses!) {
				throw new AppError(
					AppErrorCode.CONFLICT,
					"Coupon has reached its usage limit",
					409,
				);
			}

			const product = await this.productRepository.find(id);

			if (!product) {
				throw new AppError(AppErrorCode.NOT_FOUND, "Product not found", 404);
			}

			await this.couponRepository.incrementUses(coupon.id);

			await prisma.productDiscount.create({
				data: {
					productId: id,
					couponId: coupon.id,
				},
			});

			return this.productRepository.find(id);
		});

		return result;
	}
}
