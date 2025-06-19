export type NavItems = "dashboard" | "products" | "records" | "admin";

export type NavLinks = {
	label: string;
	value: NavItems;
	path: string;
};
