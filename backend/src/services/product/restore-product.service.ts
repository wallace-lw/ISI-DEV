import { ProductRepository } from "@/repositories";

export class RestoreProductService {
	constructor(private productRepository: ProductRepository) {}

	async execute(id: string) {
		await this.productRepository.restore(id);
	}
}
