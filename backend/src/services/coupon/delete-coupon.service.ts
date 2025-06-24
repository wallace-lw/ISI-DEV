import type { CouponRepository } from "@/repositories";

export class DeleteCouponService {
	constructor(private couponRepository: CouponRepository) {}

	async execute(id: string) {
		await this.couponRepository.delete(id);
	}
}
