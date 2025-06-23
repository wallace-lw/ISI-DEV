import { Product } from "@/models/product";
import { ProductRepository } from "@/repositories";
import { PaginatedResponse, PaginationMeta } from "@/utils";

export class ListProductsService {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(
		page: number,
		limit: number,
		where: any,
		offset: number,
	): Promise<PaginatedResponse<Product>> {
		const [products, total] = await this.productRepository.findAll(
			limit,
			where,
			offset,
		);

		const meta: PaginationMeta = {
			page,
			limit,
			totalItems: total,
			totalPages: Math.ceil(total / limit),
		};

		return {
			data: products,
			meta,
		};
	}
}
