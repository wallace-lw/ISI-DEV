import type { PublicProductDTO } from "@/dtos/product.dto";
import { mapProductToPublicDTO } from "@/mappers";
import type { ProductRepository } from "@/repositories";
import type { PaginatedResponse, PaginationMeta } from "@/utils";
import { sanitizeString } from "@/utils";

export class ListProductsService {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(
		page: number,
		limit: number,
		where: any,
		offset: number,
	): Promise<PaginatedResponse<PublicProductDTO>> {
		if (where?.search) {
			where.search = sanitizeString(where.search);
		}

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
			data: products.map((product) => mapProductToPublicDTO(product)),
			meta,
		};
	}
}
