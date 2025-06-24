import type { FastifyReply, FastifyRequest } from "fastify";
import type { UpdateProduct } from "@/models/product";
import type { UpdateProductService } from "@/services";

export class UpdateProductController {
	constructor(private readonly updateProductService: UpdateProductService) {}
	async execute(
		req: FastifyRequest<{
			Params: { id: string };
			Body: UpdateProduct;
		}>,
		reply: FastifyReply,
	) {
		const data = req.body;

		await this.updateProductService.execute(req.params.id, data);

		reply.status(200).send({
			message: "Product updated successfully",
		});
	}
}
