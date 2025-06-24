import type { AxiosError } from "axios";

export const apiErrorHandler = (error: Error) => {
	const err = error as AxiosError<{ error: string }>;
	const errorMessage = err.response?.data?.error ?? "Erro ao criar produto.";

	return errorMessage;
};
