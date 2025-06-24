import * as z from "zod";

export const productSchema = z.object({
	name: z
		.string({
			invalid_type_error: "Tipo inválido",
			required_error: "* Campo obrigatório",
		})
		.min(3, "Nome deve ter pelo menos 3 caracteres")
		.max(100, "Nome não deve ter mais de 100 caracteres"),
	description: z.string().optional(),
	price: z
		.number({
			invalid_type_error: "Tipo inválido",
			required_error: "* Campo obrigatório",
		})
		.min(0.01, "O valor do produto deve ser maior ou igual a R$0,01")
		.max(1000000, "O valor do produto deve ser menor ou igual a R$1.000.000,00")
		.transform((val) => val * 100)
		.refine((val) => !Number.isNaN(val), { message: "* Valor inválido" }),
	stock: z.coerce
		.number({
			required_error: "*Campo obrigatório",
			invalid_type_error: "O tipo do valor é inválido",
		})
		.min(0, "Valor de estoque não pode ser menor que zero")
		.max(999999, "Quantidade excedida. Max.: 999999"),
});
