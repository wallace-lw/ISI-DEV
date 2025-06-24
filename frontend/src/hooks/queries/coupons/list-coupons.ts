import { useQuery } from "@tanstack/react-query";
import { listCoupons } from "@/services";

export const useCouponsList = () => {
	return useQuery({
		queryKey: ["coupons-list"],
		queryFn: listCoupons,
	});
};
