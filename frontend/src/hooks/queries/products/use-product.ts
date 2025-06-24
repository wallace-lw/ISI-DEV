import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services";

export const useProduct = (id: string) => {
	return useQuery({
		queryKey: ["find-product"],
		queryFn: () => getProductById(id),
	});
};
