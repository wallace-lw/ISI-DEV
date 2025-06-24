import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "react-router";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/utils";
import { Filters, ProductsList } from "./components";

export const Products = () => {
	return (
		<>
			<div className="flex w-full justify-between ">
				<PageTitle title="Produtos" icon="shopping-bag" />

				<Link to={ROUTES.PRODUCTS.CREATE_PRODUCT}>
					<Button className="cursor-pointer">
						<DynamicIcon name="plus" size={16} />
						<span className="hidden lg:block">Criar produto</span>
					</Button>
				</Link>
			</div>
			<Filters />
			<ProductsList />
		</>
	);
};
