export const formatCurrencyBRL = (value: number): string => {
	if (Number.isNaN(value)) return "Valor inválido.";

	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
};

export const formatToCurrency = (val?: string | number) => {
	if (!val) return "";

	const num =
		typeof val === "number"
			? val
			: Number(val.toString().replace(/\D/g, "")) / 100;
	return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const parseCurrencyToNumber = (formatted: string): number => {
	const numeric = formatted.replace(/\D/g, "");
	return Number(numeric) / 100;
};
