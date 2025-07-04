import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProduct } from "@/services";
import { apiErrorHandler } from "@/utils/handlers";

export const useUpdateProduct = () => {
	return useMutation({
		mutationKey: ["create-products"],
		mutationFn: updateProduct,
		onSuccess: () => {
			toast.success("Product updated!");
		},
		onError: (error) => {
			toast.error(apiErrorHandler(error));
		},
	});
};
