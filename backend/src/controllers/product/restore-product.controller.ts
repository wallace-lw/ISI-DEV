import type { FastifyReply, FastifyRequest } from "fastify";
import type { RestoreProductService } from "@/services";

export class RestoreProductController {
	constructor(private readonly deleteProductService: RestoreProductService) {}
	async execute(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		await this.deleteProductService.execute(req.params.id);
		reply.code(204).send();
	}
}
