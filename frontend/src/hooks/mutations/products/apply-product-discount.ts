import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { applyProductDiscount } from "@/services";
import { apiErrorHandler } from "@/utils/handlers";

export const useApplyProductDiscount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["apply-product-discount"],
		mutationFn: applyProductDiscount,
		onSuccess: () => {
			toast.success("Discount Applied");
			queryClient.invalidateQueries({ queryKey: ["list-products"] });
		},
		onError: (error) => {
			toast.error(apiErrorHandler(error));
		},
	});
};
