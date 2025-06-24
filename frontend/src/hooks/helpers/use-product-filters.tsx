import { useAtom } from "jotai";
import {
	clearProductFiltersAtom,
	defaultProductFilters,
	isFilteredAtom,
	productFilterAtom,
} from "@/stores";
import type * as T from "@/stores/products-filter/types";

export const useProductFilters = () => {
	const [filters, setFilters] = useAtom(productFilterAtom);
	const [isFiltered] = useAtom(isFilteredAtom);
	const [, clearFilters] = useAtom(clearProductFiltersAtom);

	const resetFilters = (preservePage = false) => {
		setFilters({
			...defaultProductFilters,
			page: preservePage ? filters.page : 1,
		});
	};

	const updateFilters = (partial: Partial<T.ProductFilters>) => {
		setFilters({ ...partial });
	};

	return {
		filters,
		setFilters,
		updateFilters,
		isFiltered,
		resetFilters,
		clearFilters,
	};
};
