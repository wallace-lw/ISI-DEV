import type { z } from "zod";
import type { priceFilter } from "./schema";

export type PriceFilterSchema = z.infer<typeof priceFilter>;
