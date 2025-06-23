import { UpdateProduct } from "@/models/product";
import { UpdateProductService } from "@/services";
import { FastifyReply, FastifyRequest } from "fastify";

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
