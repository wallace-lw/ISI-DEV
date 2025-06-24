import { api } from "../api";
import type * as T from "./types";

export const listCoupons = async () => {
	const { data } = await api.get<T.Coupon[]>("/coupons");

	return data;
};
