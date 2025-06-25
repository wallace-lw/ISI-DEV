import { z } from "zod";

export const percentualSchema = z.object({
	code: z
		.string({ required_error: "* Insira o código" })
		.transform((val) => val.toLowerCase()),
});
