import { Coupon } from "@/models/coupon";
import { CouponRepository } from "@/repositories";

export class ListCouponsService {
	constructor(private readonly couponRepository: CouponRepository) {}
	async execute(): Promise<Coupon[]> {
		return await this.couponRepository.findAll();
	}
}
