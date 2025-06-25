import type { ProductRepository } from "@/repositories";
import prisma from "@/utils/db";
import { AppError, AppErrorCode } from "@/utils/errors";

export class ApplyPercentDiscountService {
	constructor(private productRepository: ProductRepository) {}
	async execute(id: string, percentage: number) {
		const result = await prisma.$transaction(async (_tx) => {
			const discountExists = await this.productRepository.hasDiscount(id);

			if (discountExists) {
				throw new AppError(
					AppErrorCode.CONFLICT,
					"Discount already applied",
					409,
				);
			}

			const product = await this.productRepository.find(id);

			if (!product) {
				throw new AppError(AppErrorCode.NOT_FOUND, "Product not found", 404);
			}

			const discountAmount = Math.floor(product.price * (percentage / 10000));
			const finalPrice = product.price - discountAmount;

			if (finalPrice < 1) {
				throw new AppError(
					AppErrorCode.UNPROCESSABLE,
					"Final price must be at least 1 cent",
					422,
				);
			}

			return this.productRepository.find(id);
		});

		return result;
	}
}
