import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicIcon } from "lucide-react/dynamic";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProductFilters } from "@/hooks/helpers/use-product-filters";
import { formatToCurrency } from "@/utils";
import { priceFilter } from "./schema";
import type * as T from "./types";

export const Filters = () => {
	const { filters, isFiltered, resetFilters, updateFilters } =
		useProductFilters();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<T.PriceFilterSchema>({
		resolver: zodResolver(priceFilter),
	});

	const minPriceValue = watch("minPrice");
	const maxPriceValue = watch("maxPrice");

	const hasValueOnPriceFilter = !!minPriceValue || !!maxPriceValue;

	const onSubmit: SubmitHandler<T.PriceFilterSchema> = (data) => {
		updateFilters({
			...filters,
			minPrice: data.minPrice,
			maxPrice: data.maxPrice,
		});
	};

	return (
		<div className="mt-6 flex flex-col gap-1">
			<div className="flex items-end gap-4">
				<div className="relative">
					<div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
						<DynamicIcon name="search" size={16} />
					</div>
					<Input
						placeholder="Buscar produto..."
						className="rounded-lg pl-8"
						value={filters.search}
						onChange={(e) => updateFilters({ search: e.target.value, page: 1 })}
					/>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex gap-4 items-end"
				>
					<div className="flex flex-col gap-2">
						<Label>Preço mínimo</Label>
						<Controller
							control={control}
							name="minPrice"
							render={({ field }) => (
								<Input
									{...field}
									value={formatToCurrency(field.value)}
									onChange={(e) => {
										const raw = e.target.value.replace(/\D/g, "");
										const numeric = Number(raw) / 100;
										field.onChange(numeric);
									}}
									placeholder="R$ 0,00"
								/>
							)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Preço máximo</Label>
						<Controller
							control={control}
							name="maxPrice"
							render={({ field }) => (
								<Input
									{...field}
									value={formatToCurrency(field.value)}
									onChange={(e) => {
										const raw = e.target.value.replace(/\D/g, "");
										const numeric = Number(raw) / 100;
										field.onChange(numeric);
									}}
									placeholder="R$ 0,00"
								/>
							)}
						/>
					</div>
					<div className="flex gap-2">
						<Button
							className="cursor-pointer"
							type="submit"
							variant={"default"}
							disabled={!hasValueOnPriceFilter}
						>
							<DynamicIcon name={"filter"} />
							Filtrar
						</Button>
						{isFiltered && (
							<Button
								className="cursor-pointer"
								type="submit"
								variant={"outline"}
								onClick={() => {
									resetFilters(true);
									reset();
								}}
							>
								<DynamicIcon name={"refresh-ccw"} />
								Limpar filtros
							</Button>
						)}
					</div>
				</form>
			</div>
			<ErrorMessage message={errors.minPrice?.message} />
			<ErrorMessage message={errors.maxPrice?.message} />
		</div>
	);
};
