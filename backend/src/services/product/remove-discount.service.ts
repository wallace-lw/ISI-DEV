import type { Product } from "@/models";
import type { ProductRepository } from "@/repositories";
import prisma from "@/utils/db";
import { AppError, AppErrorCode } from "@/utils/errors";

export class RemoveDiscountService {
	constructor(private productRepository: ProductRepository) {}
	async execute(id: string) {
		return await prisma.$transaction(async (tx) => {
			const product = await this.productRepository.hasDiscount(id);

			if (!product) {
				throw new AppError(AppErrorCode.NOT_FOUND, "Product not found", 404);
			}

			const productWithDiscount = product as unknown as Product & {
				discount: any;
			};

			if (!productWithDiscount.discount) {
				throw new AppError(
					AppErrorCode.UNPROCESSABLE,
					"No discount applied",
					422,
				);
			}

			await tx.productDiscount.delete({
				where: { productId: id },
			});

			return this.productRepository.find(id);
		});
	}
}
