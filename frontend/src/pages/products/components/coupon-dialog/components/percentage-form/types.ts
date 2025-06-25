import type { z } from "zod";
import type { percentualSchema } from "./schema";

export type PercentualSchema = z.infer<typeof percentualSchema>;

export type PercentProps = {
	productId: string;
	closeDialog: VoidFunction;
};
