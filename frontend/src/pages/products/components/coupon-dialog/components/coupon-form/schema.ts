import * as z from "zod";

export const couponCodeSchema = z.object({
	code: z
		.string({ required_error: "* Insira o código" })
		.transform((val) => val.toLowerCase()),
});
