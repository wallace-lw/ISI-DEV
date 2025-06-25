import { z } from "zod";
import type { CouponType } from "@/models";

export const normalizeName = (name: string): string => {
	return name.trim().replace(/\s+/g, " ");
};

export const couponCodeSchema = z.string().regex(/^[a-zA-Z0-9]{4,20}$/);

export const validateCouponValue = (
	value: number,
	type: CouponType,
): boolean => {
	if (type === "PERCENT") {
		return value >= 100 && value <= 8000;
	}
	return value > 0;
};

export interface PaginationMeta {
	page: number;
	limit: number;
	totalItems: number;
	totalPages: number;
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: PaginationMeta;
}
