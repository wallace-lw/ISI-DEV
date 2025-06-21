import * as z from "zod/v4";

export const couponCodeSchema = z.object({
	coupon: z.string({ error: "* Campo obrigatório" }),
});
