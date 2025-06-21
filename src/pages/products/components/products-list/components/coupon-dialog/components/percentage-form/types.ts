import type { z } from "zod/v4";
import type { percentualSchema } from "./schema";

export type PercentualSchema = z.infer<typeof percentualSchema>;
