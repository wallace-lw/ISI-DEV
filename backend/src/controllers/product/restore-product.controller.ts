import { RestoreProductService } from "@/services";
import { FastifyRequest, FastifyReply } from "fastify";

export class RestoreProductController {
	constructor(private readonly deleteProductService: RestoreProductService) {}
	async execute(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		try {
			await this.deleteProductService.execute(req.params.id);
			reply.code(204).send();
		} catch (error) {}
	}
}
