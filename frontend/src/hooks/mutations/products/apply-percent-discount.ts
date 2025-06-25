import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { applyPercentDiscount } from "@/services";
import { apiErrorHandler } from "@/utils/handlers";

export const useApplyPercentDiscount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["apply-product-discount"],
		mutationFn: applyPercentDiscount,
		onSuccess: () => {
			toast.success("Discount Applied");
			queryClient.invalidateQueries({ queryKey: ["list-products"] });
		},
		onError: (error) => {
			toast.error(apiErrorHandler(error));
		},
	});
};
