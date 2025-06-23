import { z } from "zod";

const envSchema = z.object({
	VITE_API_URL: z
		.string()
		.url({ message: "VITE_API_URL precisa ser uma URL válida" }),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
	console.error(
		"❌ Erro ao validar variáveis de ambiente:",
		_env.error.format(),
	);
	throw new Error("Variáveis de ambiente inválidas.");
}

export const env = _env.data;
