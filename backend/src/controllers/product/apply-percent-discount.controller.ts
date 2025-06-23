import { FastifyRequest, FastifyReply } from "fastify";
import { ApplyPercentDiscount } from "@/models/product";
import { ApplyPercentDiscountService } from "@/services";

export class ApplyPercentDiscountController {
	constructor(
		private readonly applyPercentDiscountService: ApplyPercentDiscountService,
	) {}
	async execute(
		req: FastifyRequest<{
			Params: { id: string };
			Body: ApplyPercentDiscount;
		}>,
		reply: FastifyReply,
	) {
		const { percentage } = req.body;
		const productId = req.params.id;

		const response = await this.applyPercentDiscountService.execute(
			productId,
			percentage,
		);

		reply.send(response);
	}
}
