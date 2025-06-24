/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProduct } from "@/hooks";
import { formatToCurrency } from "@/utils";
import { productSchema } from "./schema";
import type * as T from "./types";

export const ProductUpdateForm = ({ product }: T.ProductUpdateProps) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<T.ProductSchema>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: product?.name ?? "",
			description: product?.description ?? "",
			price: product?.price ? product.price / 100 : 0,
			stock: product?.stock,
		},
	});

	const { mutate, isPending } = useUpdateProduct();

	const onSubmit: SubmitHandler<T.ProductSchema> = (data) => {
		if (product) {
			mutate({
				id: product.id,
				...data,
			});
		}
	};

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		setValue("name", product?.name ?? "");
		setValue("description", product?.description ?? "");
		setValue("price", product?.price ? product.price / 100 : 0);
		setValue("stock", product?.stock ?? 0);
	}, [product]);

	return (
		<form className="p-6 flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-2">
				<Label className="flex gap-0">
					Nome do Produto
					<DynamicIcon name="asterisk" color="red" size={12} className="mb-1" />
				</Label>

				<Controller
					control={control}
					name="name"
					render={({ field }) => (
						<Input {...field} placeholder="Informe o nome do produto" />
					)}
				/>

				<ErrorMessage message={errors.name?.message} />
			</div>

			<div className="grid gap-2">
				<Label className="flex gap-0">
					Descrição
					<DynamicIcon name="asterisk" color="red" size={12} className="mb-1" />
				</Label>

				<Controller
					control={control}
					name="description"
					render={({ field }) => (
						<Textarea
							{...field}
							placeholder="Descrição detalhada do produto"
							className="h-28"
						/>
					)}
				/>

				<ErrorMessage message={errors.description?.message} />
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="grid gap-2">
					<Label className="flex gap-0">
						Preço
						<DynamicIcon
							name="asterisk"
							color="red"
							size={12}
							className="mb-1"
						/>
					</Label>

					<Controller
						control={control}
						name="price"
						render={({ field }) => (
							<Input
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

					<ErrorMessage message={errors.price?.message} />
				</div>

				<div className="grid gap-2">
					<Label className="flex gap-0">
						Estoque
						<DynamicIcon
							name="asterisk"
							color="red"
							size={12}
							className="mb-1"
						/>
					</Label>

					<Controller
						control={control}
						name="stock"
						render={({ field }) => <Input {...field} placeholder="0" />}
					/>

					<ErrorMessage message={errors.stock?.message} />
				</div>
			</div>

			<div className="flex justify-end gap-4">
				<Button variant={"outline"} type="button" onClick={handleGoBack}>
					Cancelar
				</Button>
				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<>
							<Loader className="w-4 h-4 mr-2 animate-spin" />
							Processando...
						</>
					) : (
						"Atualizar"
					)}
				</Button>
			</div>
		</form>
	);
};
