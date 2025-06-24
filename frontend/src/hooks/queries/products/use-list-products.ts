import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { listProducts } from "@/services";
import { productFilterAtom } from "@/stores";

export const useProductsList = () => {
	const [filters] = useAtom(productFilterAtom);

	return useQuery({
		queryKey: ["list-products", filters],
		queryFn: () => listProducts(filters),
	});
};
