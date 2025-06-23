import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCoupon } from "@/models/coupon";
import { UpdateCouponService } from "@/services";

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
