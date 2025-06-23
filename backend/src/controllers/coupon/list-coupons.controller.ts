import { FastifyRequest, FastifyReply } from "fastify";
import { ListCouponsService } from "@/services";

export class ListCouponsController {
	constructor(private listCouponsService: ListCouponsService) {}
	async execute(req: FastifyRequest, reply: FastifyReply) {
		const response = await this.listCouponsService.execute();
		reply.send(response);
	}
}
