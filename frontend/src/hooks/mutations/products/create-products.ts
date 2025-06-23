import { createProduct } from "@/services/products";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProduct = () => {
	return useMutation({
		mutationKey: ["create-products"],
		mutationFn: createProduct,
		onSuccess: () => {
			toast("Produto criado com sucesso!");
		},
		onError: (error) => {
			toast(error.message);
		},
	});
};
