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
