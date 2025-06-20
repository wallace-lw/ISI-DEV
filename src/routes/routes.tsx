import { ErrorBoundary, Layout } from "@/components";
import { Products } from "@/pages";
import { ROUTES } from "@/utils";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ErrorBoundary fullScreen>
				<Layout />
			</ErrorBoundary>
		),
		children: [
			{ index: true, element: <Products /> },
			{ path: ROUTES.PRODUCTS.BASE, element: <Products /> },
			{ path: ROUTES.PRODUCTS.CREATE_PRODUCT, element: <h1>CRIAR PRODUTO</h1> },
			{ path: ROUTES.DASHBOARD.BASE, element: <h1>DASHBOARD</h1> },
			{ path: ROUTES.ADMIN.BASE, element: <h1>ADMINISTRAÇÃO</h1> },
			{ path: ROUTES.RECORDS.BASE, element: <h1>RELATÓRIOS</h1> },
		],
	},
]);
