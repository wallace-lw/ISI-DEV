import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct } from "@/services/products";
import { apiErrorHandler } from "@/utils/handlers";

export const useCreateProduct = () => {
	return useMutation({
		mutationKey: ["create-products"],
		mutationFn: createProduct,
		onSuccess: () => {
			toast.success("Product created!");
		},
		onError: (error) => {
			toast.error(apiErrorHandler(error));
		},
	});
};
