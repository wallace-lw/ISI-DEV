import type { FastifyReply, FastifyRequest } from "fastify";
import type { RemoveDiscountService } from "@/services";

export class RemoveDiscountController {
	constructor(private readonly removeDiscountService: RemoveDiscountService) {}
	async execute(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		const productId = req.params.id;
		const response = await this.removeDiscountService.execute(productId);
		reply.send(response);
	}
}
