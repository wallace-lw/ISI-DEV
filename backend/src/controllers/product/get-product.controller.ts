import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetProductService } from "@/services";

export class GetProductController {
	constructor(private readonly getProductService: GetProductService) {}
	async execute(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		const product = await this.getProductService.execute(req.params.id);
		reply.send(product);
	}
}
