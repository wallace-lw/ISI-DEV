import { api } from "../api";
import type * as T from "./types";

export const createProduct = async ({
	name,
	price,
	stock,
	description,
}: T.ProductInput) => {
	const { data } = await api.post("/products", {
		name,
		price,
		stock,
		description,
	});

	return data;
};

export const getProductById = async (id: string) => {
	const { data } = await api.get<T.Product>(`/products/${id}`);

	return data;
};

export const updateProduct = async ({
	id,
	name,
	price,
	stock,
	description,
}: T.UpdateProductInput) => {
	const { data } = await api.patch(`/products/${id}`, {
		name,
		price,
		stock,
		description,
	});

	return data;
};

export const listProducts = async ({
	page = 1,
	limit = 10,
	search,
	minPrice = 1,
	maxPrice = 100000000,
	has_discount = false,
}: T.ListProductsProps) => {
	const { data } = await api.get<T.Paginate<T.Product>>("/products", {
		params: { page, minPrice, maxPrice, has_discount, search, limit },
	});

	return data;
};
