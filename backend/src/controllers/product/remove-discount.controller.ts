import { RemoveDiscountService } from "@/services";
import { FastifyRequest, FastifyReply } from "fastify";

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
