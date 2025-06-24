import type { CreateProduct, UpdateProduct } from "@/models/product";
import type { ProductRepository } from "@/repositories";
import { formatCurrencyBRL } from "@/utils";
import { AppError, AppErrorCode } from "@/utils/errors";

export class UpdateProductService {
	constructor(private readonly productRepository: ProductRepository) {}
	async execute(id: string, data: UpdateProduct) {
		const requiredFields = ["name", "price", "stock"];

		const product = await this.productRepository.find(id);

		if (!product) {
			throw new AppError(AppErrorCode.NOT_FOUND, "Produto não encontrado", 404);
		}

		if (product.deletedAt !== null) {
			throw new AppError(AppErrorCode.CONFLICT, "Produto já foi deletado", 409);
		}

		const hasUpdates = Object.entries(data).some(
			([_, value]) => value !== undefined,
		);

		if (!product) {
			throw new AppError(
				AppErrorCode.NOT_FOUND,
				"Produto não encontrado.",
				404,
			);
		}

		if (!hasUpdates) {
			throw new AppError(
				AppErrorCode.UNPROCESSABLE,
				"No fields to update",
				422,
			);
		}

		const missingFields = requiredFields.filter(
			(field) =>
				data[field as keyof CreateProduct] === undefined ||
				data[field as keyof CreateProduct] === null ||
				data[field as keyof CreateProduct] === "",
		);

		if (missingFields.length > 0) {
			throw new AppError(
				AppErrorCode.VALIDATION,
				`Campos obrigatórios faltando: [${missingFields.join(", ")}]`,
				400,
			);
		}

		if (data?.price) {
			if (data.price <= 0) {
				throw new AppError(
					AppErrorCode.VALIDATION,
					`Price must be greater than 0`,
					400,
				);
			}

			if (data.price > 100000000) {
				throw new AppError(
					AppErrorCode.VALIDATION,
					`Price must not be greater than ${formatCurrencyBRL(100000000 / 100)}`,
					400,
				);
			}
		}

		return await this.productRepository.update(id, data);
	}
}
