import { ROUTES } from "@/utils";
import type { NavItems, NavLinks } from "@/utils/types";
import type { IconName } from "lucide-react/dynamic";

export const navIcons: Record<NavItems, IconName> = {
	dashboard: "house",
	products: "shopping-bag",
	records: "file-text",
	admin: "settings",
};

export const navLinks: NavLinks[] = [
	{
		label: "Dashboard",
		value: "dashboard",
		path: ROUTES.DASHBOARD.BASE,
	},
	{
		label: "Produtos",
		value: "products",
		path: ROUTES.PRODUCTS.BASE,
	},
	{
		label: "Relatórios",
		value: "records",
		path: ROUTES.RECORDS.BASE,
	},
	{
		label: "Administração",
		value: "admin",
		path: ROUTES.ADMIN.BASE,
	},
];
