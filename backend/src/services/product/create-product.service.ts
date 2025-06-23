import { CreateProduct } from "@/models/product";
import { ProductRepository } from "@/repositories";
import {
  AppError,
  AppErrorCode,
  formatCurrencyBRL,
  normalizeName,
} from "@/utils";

export class CreateProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(data: CreateProduct) {
		const requiredFields = ["name", "price", "stock"];

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

		const nameNormalized = normalizeName(data.name);

		if (nameNormalized.length < 3) {
			throw new AppError(
				AppErrorCode.VALIDATION,
				"Product name must have at least 3 characters",
				400,
			);
		}

		if (nameNormalized.length > 100) {
			throw new AppError(
				AppErrorCode.VALIDATION,
				"Product name must not exceed 100 characters.",
				400,
			);
		}

		const regex = /^[a-zA-Z0-9\s\-_,.]+$/;
		if (!regex.test(nameNormalized)) {
			throw new AppError(
				AppErrorCode.VALIDATION,
				"The 'name' field must contain only letters.",
				400,
			);
		}

		const productExists =
			await this.productRepository.findByName(nameNormalized);

		if (productExists) {
			throw new AppError(AppErrorCode.CONFLICT, "Product already exists", 409);
		}

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

		return this.productRepository.create({
			...data,
			name: nameNormalized,
		});
	}
}
