import * as z from "zod/v4";
import type { productSchema } from "./schema";

export type ProductSchema = z.infer<typeof productSchema>;
