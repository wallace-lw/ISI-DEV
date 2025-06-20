import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "react-router";

export const Filters = () => {
	return (
		<div className="mt-6 flex items-end justify-between">
			<div className="flex gap-4 items-end">
				<div className="flex flex-col gap-2">
					<Label>Preço mínimo</Label>
					<Input placeholder="R$ 0,00" />
				</div>

				<div className="flex flex-col gap-2">
					<Label>Preço máximo</Label>
					<Input placeholder="R$ 0,00" />
				</div>
				<Button className="cursor-pointer" variant={"outline"} disabled={true}>
					<DynamicIcon name="refresh-ccw" />
					Limpar filtros
				</Button>
			</div>

			<div className="flex gap-6">
				<div className="relative">
					<div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
						<DynamicIcon name="search" size={16} />
					</div>
					<Input
						placeholder="Buscar produto..."
						className="w-96 rounded-lg pl-8"
					/>
				</div>

				<Link to={ROUTES.PRODUCTS.CREATE_PRODUCT}>
					<Button className="cursor-pointer">
						<DynamicIcon name="plus" size={16} />
						Criar produto
					</Button>
				</Link>
			</div>
		</div>
	);
};
