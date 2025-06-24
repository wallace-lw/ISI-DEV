import type { FastifyReply, FastifyRequest } from "fastify";
import type { DeleteProductService } from "@/services";

export class DeleteProductController {
	constructor(private readonly deleteProductService: DeleteProductService) {}
	async execute(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		await this.deleteProductService.execute(req.params.id);
		reply.status(204).send();
	}
}
