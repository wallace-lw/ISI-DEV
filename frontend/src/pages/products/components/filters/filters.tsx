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
		<div className="space-y-4">
			<div className="grid grid-cols-1 items-end gap-4 mt-4 md:grid-cols-3">
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
					className="grid grid-cols-1 gap-2 md:flex md:col-span-2"
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
					<div className="grid grid-cols-1 gap-2 mt-2 md:flex md:items-end">
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
