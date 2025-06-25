import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProduct } from "@/services";
import { apiErrorHandler } from "@/utils/handlers";

export const useDeleteProduct = (id: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete-product"],
		mutationFn: () => deleteProduct(id),
		onSuccess: () => {
			toast.success("Produto deletado");
			queryClient.invalidateQueries({ queryKey: ["list-products"] });
		},
		onError: (error) => {
			toast.error(apiErrorHandler(error));
		},
	});
};
