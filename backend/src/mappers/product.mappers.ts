import type { PublicProductDTO } from "@/dtos/product.dto";
import type { CouponType, Product } from "@/models";

type ProductWithDiscount = Product & {
	discount?: {
		appliedAt: Date;
		coupon: {
			value: number;
			type: CouponType;
		};
	};
};

export const mapProductToPublicDTO = (
	product: ProductWithDiscount,
): PublicProductDTO => {
	const discount = product.discount?.coupon;
	const price = product.price;

	const finalPrice =
		discount?.type === "PERCENT"
			? Math.round(price * (1 - discount.value / 10000))
			: discount?.type === "FIXED"
				? price - discount.value
				: price;

	return {
		id: product.id,
		name: product.name,
		description: product.description ?? null,
		stock: product.stock,
		isOutOfStock: product.stock <= 0,
		price,
		finalPrice,
		discount: discount
			? {
					type: discount.type.toLowerCase() as "FIXED" | "PERCENT",
					value: discount.value,
					appliedAt: product.discount!.appliedAt.toISOString(),
				}
			: undefined,
		hasCouponApplied: !!discount,
		createdAt: product.createdAt.toISOString(),
		updatedAt: product.updatedAt?.toISOString() ?? null,
		deletedAt: product.deletedAt?.toISOString() ?? null,
	};
};
