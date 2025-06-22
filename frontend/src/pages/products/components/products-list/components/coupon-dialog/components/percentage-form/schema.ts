import { z } from "zod/v4";

export const percentualSchema = z.object({
	percentage: z.string({ error: "* Campo obrigatório" }),
});
