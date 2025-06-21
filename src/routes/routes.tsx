import { ErrorBoundary, Layout } from "@/components";
import { ProductRegistration, Products, ProductUpdate } from "@/pages";
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
			{
				path: ROUTES.PRODUCTS.CREATE_PRODUCT,
				element: <ProductRegistration />,
			},
			{
				path: ROUTES.PRODUCTS.EDIT_PRODUCT,
				element: <ProductUpdate />,
			},
			{ path: ROUTES.DASHBOARD.BASE, element: <h1>DASHBOARD</h1> },
			{ path: ROUTES.ADMIN.BASE, element: <h1>ADMINISTRAÇÃO</h1> },
			{ path: ROUTES.RECORDS.BASE, element: <h1>RELATÓRIOS</h1> },
		],
	},
	{
		path: "*",
		element: "nãooooo",
	},
]);
