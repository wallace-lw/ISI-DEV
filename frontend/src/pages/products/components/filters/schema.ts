import { z } from "zod";

export const priceFilter = z
	.object({
		minPrice: z
			.number({
				invalid_type_error: "Tipo inválido",
				required_error: "* Campo obrigatório",
			})
			.transform((val) => val * 100)
			.optional()
			.refine((val) => !Number.isNaN(val), { message: "* Valor inválido" }),
		maxPrice: z
			.number({
				invalid_type_error: "Tipo inválido",
				required_error: "* Campo obrigatório",
			})
			.transform((val) => val * 100)
			.optional()
			.refine((val) => !Number.isNaN(val), { message: "* Valor inválido" }),
	})
	.superRefine((data, ctx) => {
		if (data.minPrice && data.maxPrice) {
			if (data.minPrice! > data.maxPrice!) {
				ctx.addIssue({
					code: "custom",
					path: ["minPrice"],
					message: "* Valor minimo não poder ser maior que o máximo.",
				});
			}
		}
	});
