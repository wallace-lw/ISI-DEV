import type { FastifyReply, FastifyRequest } from "fastify";
import type { UpdateCoupon } from "@/models/coupon";
import type { UpdateCouponService } from "@/services";

export class UpdateCouponController {
	constructor(private readonly updateCouponService: UpdateCouponService) {}
	async execute(
		req: FastifyRequest<{
			Params: { id: string };
			Body: UpdateCoupon;
		}>,
		reply: FastifyReply,
	) {
		const data = req.body;

		const response = await this.updateCouponService.execute(
			req.params.id,
			data,
		);

		reply.send(response);
	}
}
