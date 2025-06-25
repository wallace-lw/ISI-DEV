import type { FastifyReply, FastifyRequest } from "fastify";
import type { DeleteCouponService } from "@/services";

export class DeleteCouponController {
	constructor(private readonly deleteCouponService: DeleteCouponService) {}
	async execute(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		await this.deleteCouponService.execute(req.params.id);
		reply.code(204).send();
	}
}
