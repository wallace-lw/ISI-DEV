import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateCoupon } from "@/models/coupon";
import type { CreateCouponService } from "@/services";

export class CreateCouponController {
	constructor(private createCouponService: CreateCouponService) {}
	async execute(
		req: FastifyRequest<{ Body: CreateCoupon }>,
		reply: FastifyReply,
	) {
		const data = req.body;
		const coupon = await this.createCouponService.execute(data);
		reply.code(201).send(coupon);
	}
}
