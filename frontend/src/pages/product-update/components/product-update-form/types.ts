import * as z from "zod";
import type { Product } from "@/services/products/types";
import type { productSchema } from "./schema";

export type ProductSchema = z.infer<typeof productSchema>;

export type ProductUpdateProps = {
	product: Product | undefined;
};
