import { z } from "zod";

// Validar nomes
export const normalizeName = (name: string): string => {
	return name.trim().toLowerCase().replace(/\s+/g, " ");
};

// Validar cupons
export const couponCodeSchema = z.string().regex(/^[a-zA-Z0-9]{4,20}$/);

// Validar valores de cupons
export const validateCouponValue = (
	value: number,
	type: "fixed" | "percent",
): boolean => {
	if (type === "percent") {
		return value >= 100 && value <= 8000; // 1% a 80% em centavos (100 = 1%)
	}
	return value > 0;
};

// Paginação
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
