import { atom } from "jotai";
import type * as T from "./types";

export const defaultProductFilters: T.ProductFilters = {
	page: 1,
	limit: 10,
	search: "",
	minPrice: 0.01,
	maxPrice: 100000000,
	has_discount: true,
};

const baseProductFilterAtom = atom<T.ProductFilters>(defaultProductFilters);

export const productFilterAtom = atom(
	(get) => get(baseProductFilterAtom),
	(get, set, newFilters: Partial<T.ProductFilters>) => {
		const current = get(baseProductFilterAtom);
		set(baseProductFilterAtom, { ...current, ...newFilters });
	},
);

export const isFilteredAtom = atom((get) => {
	const filters = get(productFilterAtom);
	return (
		filters.search !== defaultProductFilters.search ||
		filters.minPrice !== defaultProductFilters.minPrice ||
		filters.maxPrice !== defaultProductFilters.maxPrice ||
		filters.has_discount !== defaultProductFilters.has_discount
	);
});

export const clearProductFiltersAtom = atom(null, (get, set) => {
	get(productFilterAtom);
	set(productFilterAtom, {
		...defaultProductFilters,
		page: 1,
	});
});
