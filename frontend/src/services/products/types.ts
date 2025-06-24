export type ProductInput = {
	name: string;
	description?: string;
	stock: number;
	price: number;
};

export type UpdateProductInput = {
	id: string;
} & ProductInput;

export type ListProductsProps = {
	page?: number;
	search?: string;
	limit?: number;
	minPrice?: number;
	maxPrice?: number;
	has_discount?: boolean;
};

export type Product = {
	id: string;
	name: string;
	description: string | null;
	stock: number;
	price: number;
	originalPrice: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	discount: number | null;
};

export type Paginate<T> = {
	data: T[];
	meta: {
		page: number;
		limit: number;
		totalItems: number;
		totalPages: number;
	};
};
