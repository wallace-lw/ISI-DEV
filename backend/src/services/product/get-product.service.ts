import type { ProductRepository } from "@/repositories";
import { AppError, AppErrorCode } from "@/utils/errors";

export class GetProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(id: string) {
		const product = await this.productRepository.find(id);

		if (!product) {
			throw new AppError(AppErrorCode.NOT_FOUND, "Product not found", 404);
		}

		return product;
	}
}
