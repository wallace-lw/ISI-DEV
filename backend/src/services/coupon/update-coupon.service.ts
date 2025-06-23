import { UpdateCoupon } from "@/models/coupon";
import { AppError, AppErrorCode } from "@/utils/errors";
import { CouponRepository } from "@/repositories";

export class UpdateCouponService {
	constructor(private readonly productRepository: CouponRepository) {}
	async execute(id: string, data: UpdateCoupon) {
		const hasUpdates = Object.entries(data).some(
			([_, value]) => value !== undefined,
		);

		if (!hasUpdates) {
			throw new AppError(
				AppErrorCode.UNPROCESSABLE,
				"No fields to update",
				422,
			);
		}

		await this.productRepository.update(id, data);
	}
}
