import { CouponRepository } from "@/repositories";

export class CreateCouponService {
	constructor(private readonly couponRepository: CouponRepository) {}
	async execute(data: any): Promise<{ id: string }> {
		const id = await this.couponRepository.create(data);
		return { id };
	}
}
