import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetCouponService } from "@/services";
import { AppError, AppErrorCode } from "@/utils/errors";

export class GetCouponController {
	constructor(private readonly getCouponService: GetCouponService) {}
	async execute(
		req: FastifyRequest<{ Params: { code: string } }>,
		reply: FastifyReply,
	) {
		const coupon = await this.getCouponService.execute(req.params.code);

		if (!coupon) {
			throw new AppError(AppErrorCode.NOT_FOUND, "Coupon not found", 404);
		}

		reply.send(coupon);
	}
}
