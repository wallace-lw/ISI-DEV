import type { CouponType, CreateCoupon } from "@/models";
import type { CouponRepository } from "@/repositories";
import { AppError, AppErrorCode } from "@/utils";

export class CreateCouponService {
	constructor(private readonly couponRepository: CouponRepository) {}
	async execute(data: CreateCoupon): Promise<{ id: string }> {
		if (!Object.values(data).includes(data.type as CouponType)) {
			throw new AppError(AppErrorCode.VALIDATION, `Invalid coupom type`, 400);
		}

		const id = await this.couponRepository.create({
			...data,
			value: data.value * 100,
			type: data.type as CouponType,
		});

		return { id };
	}
}
