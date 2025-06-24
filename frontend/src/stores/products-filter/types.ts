export type ProductFilters = {
	page: number;
	limit: number;
	search?: string;
	minPrice: number;
	maxPrice: number;
	has_discount: boolean;
};
