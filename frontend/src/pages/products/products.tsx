import { PageTitle } from "@/components/page-title";
import { Filters, ProductsList } from "./components";

export const Products = () => {
	return (
		<>
			<PageTitle title="Produtos" icon="shopping-bag" />
			<Filters />
			<ProductsList />
		</>
	);
};
