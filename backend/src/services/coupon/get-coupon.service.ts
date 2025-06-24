import type { Coupon } from "@/models/coupon";
import type { CouponRepository } from "@/repositories";
import { AppError, AppErrorCode } from "@/utils/errors";

export class GetCouponService {
	constructor(private readonly couponRepository: CouponRepository) {}
	async execute(code: string): Promise<Coupon> {
		const coupon = await this.couponRepository.find(code);

		if (!coupon) {
			throw new AppError(AppErrorCode.NOT_FOUND, "Coupon not found", 404);
		}

		return coupon as Coupon;
	}
}
