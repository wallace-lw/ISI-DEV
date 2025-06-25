import type { FastifyReply, FastifyRequest } from "fastify";
import type { ApplyPercentDiscount } from "@/models/product";
import type { ApplyCouponDiscountService } from "@/services";

export class ApplyPercentDiscountController {
	constructor(
		private readonly applyCouponDiscountService: ApplyCouponDiscountService,
	) {}
	async execute(
		req: FastifyRequest<{
			Params: { id: string };
			Body: ApplyPercentDiscount;
		}>,
		reply: FastifyReply,
	) {
		const { code } = req.body;
		const productId = req.params.id;

		const response = await this.applyCouponDiscountService.execute(
			productId,
			code,
		);

		reply.send(response);
	}
}
