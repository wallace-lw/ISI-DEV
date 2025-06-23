import { CouponRepository, ProductRepository } from "@/repositories";
import prisma from "@/utils/db";
import { AppError, AppErrorCode } from "@/utils/errors";

export class ApplyCouponDiscountService {
	constructor(
		private productRepository: ProductRepository,
		private couponRepository: CouponRepository,
	) {}
	async execute(id: string, code: string) {
		const result = await prisma.$transaction(async (_tx) => {
			// Verificar se já existe desconto
			const discountExists = await this.productRepository.hasDiscount(id);

			if (discountExists) {
				throw new AppError(
					AppErrorCode.CONFLICT,
					"Discount already applied",
					409,
				);
			}

			// Buscar cupom
			const coupon = await this.couponRepository.findValidCouponByCode(code);

			if (!coupon) {
				throw new AppError(AppErrorCode.NOT_FOUND, "Coupon not found", 404);
			}

			// Verificação manual de maxUses
			if (coupon?.maxUses! !== null && coupon.usesCount >= coupon?.maxUses!) {
				throw new AppError(
					AppErrorCode.CONFLICT,
					"Coupon has reached its usage limit",
					409,
				);
			}

			// Buscar produto
			const product = await this.productRepository.find(id);

			if (!product) {
				throw new AppError(AppErrorCode.NOT_FOUND, "Product not found", 404);
			}

			// Aplicar desconto
			let newPrice = product.originalPrice;
			if (coupon.type === "fixed") {
				newPrice -= coupon.value;
			} else if (coupon.type === "percent") {
				const discountAmount = Math.floor(
					(product.originalPrice * coupon.value) / 10000,
				);
				newPrice = product.originalPrice - discountAmount;
			}

			// Validar preço final
			if (newPrice < 1) {
				throw new AppError(
					AppErrorCode.UNPROCESSABLE,
					"Final price must be at least 1 cent",
					422,
				);
			}

			// Atualizar produto
			await this.productRepository.updatePrice(id, newPrice);
			await this.couponRepository.incrementUses(coupon.id);

			// Registrar desconto
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
