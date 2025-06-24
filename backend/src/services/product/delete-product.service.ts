import type { ProductRepository } from "@/repositories";
import { AppError, AppErrorCode } from "@/utils";

export class DeleteProductService {
	constructor(private productRepository: ProductRepository) {}

	async execute(id: string) {
		const product = await this.productRepository.find(id);

		if (!product) {
			throw new AppError(
				AppErrorCode.NOT_FOUND,
				"Produto não encontrado.",
				404,
			);
		}

		await this.productRepository.delete(id);
	}
}
