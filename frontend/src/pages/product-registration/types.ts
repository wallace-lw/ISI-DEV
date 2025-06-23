import * as z from "zod";
import type { productSchema } from "./schema";

export type ProductSchema = z.infer<typeof productSchema>;
