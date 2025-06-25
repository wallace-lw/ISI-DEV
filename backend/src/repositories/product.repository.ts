import type { CreateProduct, Product } from "@/models";
import prisma from "@/utils/db";

export interface ProductRepository {
	create: (data: CreateProduct) => Promise<string>;
	find: (id: string) => Promise<Product>;
	findByName: (name: string) => Promise<boolean>;
	findAll: (
		limit: number,
		where: any,
		offset: number,
	) => Promise<[Product[], number]>;
	update: (id: string, data: Partial<Product>) => Promise<void>;
	delete: (id: string) => Promise<void>;
	restore: (id: string) => Promise<void>;
	hasDiscount(productId: string): Promise<boolean>;
}

export class ProductRepositoryImpl implements ProductRepository {
	async create(data: CreateProduct): Promise<string> {
		const product = await prisma.product.create({ data });

		return product.id;
	}

	async find(id: string): Promise<Product> {
		const product = await prisma.product.findUnique({
			where: { id, deletedAt: null },
			include: {
				discount: {
					include: {
						coupon: {
							select: {
								type: true,
								value: true,
							},
						},
					},
				},
			},
		});

		return product as Product;
	}

	async findByName(name: string): Promise<boolean> {
		const product = await prisma.product.findUnique({
			where: { name, deletedAt: null },
			include: { discount: true },
		});

		return !!product;
	}

	async findAll(
		limit: number,
		where: any,
		offset: number,
	): Promise<[Product[], number]> {
		const [products, total] = await Promise.all([
			prisma.product.findMany({
				where,
				skip: offset,
				take: limit,
				orderBy: { createdAt: "desc" },
				include: {
					discount: {
						include: {
							coupon: {
								select: {
									type: true,
									value: true,
								},
							},
						},
					},
				},
			}),
			prisma.product.count({ where }),
		]);

		return [products, total];
	}

	async update(id: string, data: Partial<Product>): Promise<any> {
		await prisma.product.update({
			where: { id },
			data: {
				...data,
				updatedAt: new Date(),
			},
		});
	}

	async delete(id: string): Promise<any> {
		return await prisma.product.update({
			where: { id },
			data: { deletedAt: new Date() },
		});
	}

	async restore(id: string): Promise<any> {
		await prisma.product.update({
			where: { id },
			data: { deletedAt: null },
		});
	}

	async hasDiscount(productId: string): Promise<boolean> {
		const discount = await prisma.productDiscount.findUnique({
			where: { productId },
		});
		return !!discount;
	}
}
