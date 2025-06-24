import type { FastifyReply, FastifyRequest } from "fastify";
import type { ApplyCoupon } from "@/models/product";
import type { ApplyCouponDiscountService } from "@/services";

export class ApplyCouponDiscountController {
	constructor(
		private readonly applyCouponDiscountService: ApplyCouponDiscountService,
	) {}
	async execute(
		req: FastifyRequest<{
			Params: { id: string };
			Body: ApplyCoupon;
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
