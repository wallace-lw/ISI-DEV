import type { FastifyReply, FastifyRequest } from "fastify";
import type { ListProductsService } from "@/services";

interface ProductQueryParams {
	page?: number;
	limit?: number;
	search?: string;
	minPrice?: number;
	maxPrice?: number;
	hasDiscount?: boolean;
}

export class ListProductsController {
	constructor(private readonly listProductsService: ListProductsService) {}
	async execute(
		req: FastifyRequest<{ Querystring: ProductQueryParams }>,
		reply: FastifyReply,
	) {
		const page = parseInt(req.query.page as any) || 1;
		const limit = parseInt(req.query.limit as any) || 10;
		const minPrice = parseInt(req.query.minPrice as any) || 1;
		const maxPrice = parseInt(req.query.maxPrice as any) || 10;
		const offset = (page - 1) * limit;

		const where: any = {
			deletedAt: null,
		};

		if (req.query.search) {
			where.name = { contains: req.query.search, mode: "insensitive" };
		}

		if (minPrice !== undefined) {
			where.price = { ...where.price, gte: minPrice };
		}

		if (maxPrice !== undefined) {
			where.price = { ...where.price, lte: maxPrice };
		}

		if (req.query.hasDiscount !== undefined) {
			if (req.query.hasDiscount) {
				where.discount = { isNot: null };
			} else {
				where.discount = null;
			}
		}

		const response = await this.listProductsService.execute(
			page,
			limit,
			where,
			offset,
		);

		reply.send(response);
	}
}
