import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCoupon } from "@/models/coupon";
import { CreateCouponService } from "@/services";

export class CreateCouponController {
	constructor(private createCouponService: CreateCouponService) {}
	async execute(
		req: FastifyRequest<{ Body: CreateCoupon }>,
		reply: FastifyReply,
	) {
		const data = req.body as any;
		const coupon = await this.createCouponService.execute(data);
		reply.code(201).send(coupon);
	}
}
