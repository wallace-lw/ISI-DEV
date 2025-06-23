import * as z from "zod";

export const productSchema = z.object({
	name: z.string({
		invalid_type_error: "Tipo inválido",
		required_error: "* Campo obrigatório",
	}),
	description: z.string().optional(),
	price: z
		.number({
			invalid_type_error: "Tipo inválido",
			required_error: "* Campo obrigatório",
		})
		.transform((val) => val * 100)
		.refine((val) => !Number.isNaN(val), { message: "* Valor inválido" }),
	stock: z.coerce.number({
		invalid_type_error: "Tipo inválido",
		required_error: "* Campo obrigatório",
	}),
});
