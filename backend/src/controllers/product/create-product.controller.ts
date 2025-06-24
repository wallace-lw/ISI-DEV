import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateProduct } from "@/models/product";
import type { CreateProductService } from "@/services";

export class CreateProductController {
	constructor(private readonly createProductService: CreateProductService) {}

	async execute(
		req: FastifyRequest<{ Body: CreateProduct }>,
		reply: FastifyReply,
	) {
		const data = req.body;
		await this.createProductService.execute(data);

		reply.status(201).send({
			message: "Product created successfully",
		});
	}
}
