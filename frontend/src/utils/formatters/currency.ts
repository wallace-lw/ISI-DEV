export const formatCurrencyBRL = (value: number): string => {
	if (Number.isNaN(value)) return "Valor inválido.";

	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
};
