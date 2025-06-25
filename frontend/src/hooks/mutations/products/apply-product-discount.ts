import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { applyProductDiscount } from "@/services";
import { apiErrorHandler } from "@/utils/handlers";

export const useApplyProductDiscount = () => {
	return useMutation({
		mutationKey: ["apply-product-discount"],
		mutationFn: applyProductDiscount,
		onSuccess: () => {
			toast.success("Discount Applied");
		},
		onError: (error) => {
			toast.error(apiErrorHandler(error));
		},
	});
};
