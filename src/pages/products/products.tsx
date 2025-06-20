import { DynamicIcon } from "lucide-react/dynamic";
import { Filters } from "./components";

export const Products = () => {
	return (
		<>
			<div className="flex gap-2 items-center">
				<DynamicIcon name="shopping-bag" size={36} />
				<h1 className="text-2xl font-semibold">Produtos</h1>
			</div>
			<Filters />
		</>
	);
};
