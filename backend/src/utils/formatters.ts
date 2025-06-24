export const formatCurrencyBRL = (value: number): string => {
	if (Number.isNaN(value)) return "Valor inválido.";

	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
};

export const sanitizeString = (value: unknown): string => {
	if (typeof value !== "string") return "";
	return value.trim().replace(/[^\w\sÀ-ú.,-]/gi, "");
};
