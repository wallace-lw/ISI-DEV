import { DeleteCouponService } from "@/services";
import { FastifyRequest, FastifyReply } from "fastify";

export class DeleteCouponController {
	constructor(private readonly deleteCouponService: DeleteCouponService) {}
	async execute(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		try {
			await this.deleteCouponService.execute(req.params.id);
			reply.code(204).send();
		} catch (error) {}
	}
}
