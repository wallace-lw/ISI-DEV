import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "react-router";

export const Filters = () => {
	const isEmpty = true;

	return (
		<div className="mt-6 flex items-end justify-between gap-6">
			<div className="flex gap-4 items-end">
				<div className="flex flex-col gap-2">
					<Label>Preço mínimo</Label>
					<Input placeholder="R$ 0,00" />
				</div>

				<div className="flex flex-col gap-2">
					<Label>Preço máximo</Label>
					<Input placeholder="R$ 0,00" />
				</div>
				<Button
					className="cursor-pointer"
					variant={isEmpty ? "default" : "outline"}
				>
					<DynamicIcon name={isEmpty ? "filter" : "refresh-ccw"} />
					{isEmpty ? "Filtrar" : "Limpar filtros"}
				</Button>
			</div>

			<div className="flex gap-6">
				<div className="relative flex-1">
					<div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
						<DynamicIcon name="search" size={16} />
					</div>
					<Input
						placeholder="Buscar produto..."
						className="w-full rounded-lg pl-8"
					/>
				</div>

				<Link to={ROUTES.PRODUCTS.CREATE_PRODUCT}>
					<Button className="cursor-pointer">
						<DynamicIcon name="plus" size={16} />
						<span className="hidden lg:block">Criar produto</span>
					</Button>
				</Link>
			</div>
		</div>
	);
};
