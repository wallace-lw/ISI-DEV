import * as z from "zod/v4";

export const productSchema = z.object({
	product_name: z.string({ error: "* Campo obrigatório" }),
	product_description: z.string({ error: "* Campo obrigatório" }),
	price: z.string({ error: "* Campo obrigatório" }),
	stock: z.number({ error: "* Campo obrigatório" }),
});
