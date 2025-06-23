import { DeleteProductService } from "@/services";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteProductController {
	constructor(private readonly deleteProductService: DeleteProductService) {}
	async execute(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		try {
			await this.deleteProductService.execute(req.params.id);
			reply.status(204).send();
		} catch (error) {
			throw error;
		}
	}
}
