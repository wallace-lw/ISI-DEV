import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage, PageTitle } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProduct } from "@/hooks";
import { formatToCurrency } from "@/utils";
import { productSchema } from "./schema";
import type * as T from "./types";

export const ProductRegistration = () => {
	const [priceText, setPriceText] = useState("");

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<T.ProductSchema>({
		resolver: zodResolver(productSchema),
	});

	const { mutate, isPending } = useCreateProduct();

	const onSubmit: SubmitHandler<T.ProductSchema> = (data) => {
		mutate(data, {
			onSuccess: () => {
				reset();
				setPriceText("");
			},
		});
	};

	return (
		<main className="flex flex-col gap-12">
			<PageTitle title="Cadastro de Produto" icon="file-plus-2" />

			<div className="bg-background w-full rounded-2xl">
				<header className="border-b border-accent h-12 flex items-center w-full px-6">
					<h6 className="font-semibold">Dados do produto</h6>
				</header>

				<form
					className="p-6 flex flex-col gap-8"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="grid gap-2">
						<Label className="flex gap-0">
							Nome do Produto
							<DynamicIcon
								name="asterisk"
								color="red"
								size={12}
								className="mb-1"
							/>
						</Label>

						<Controller
							control={control}
							name="name"
							render={({ field }) => (
								<Input
									{...field}
									placeholder="Informe o nome do produto"
									value={field.value ?? ""}
								/>
							)}
						/>

						<ErrorMessage message={errors.name?.message} />
					</div>

					<div className="grid gap-2">
						<Label>Descrição</Label>

						<Controller
							control={control}
							name="description"
							render={({ field }) => (
								<Textarea
									{...field}
									value={field.value ?? ""}
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
										{...field}
										value={priceText}
										onChange={(e) => {
											const raw = e.target.value.replace(/\D/g, "");
											const numeric = Number(raw) / 100;
											setPriceText(formatToCurrency(numeric));
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
								render={({ field }) => (
									<Input
										{...field}
										placeholder="0"
										value={field.value ?? ""}
										onChange={(e) => {
											field.onChange(Number(e.target.value));
										}}
									/>
								)}
							/>

							<ErrorMessage message={errors.stock?.message} />
						</div>
					</div>

					<div className="flex justify-end gap-4">
						<Button variant={"outline"} type="button">
							Cancelar
						</Button>
						<Button type="submit" disabled={isPending}>
							{isPending ? (
								<>
									<Loader className="w-4 h-4 mr-2 animate-spin" />
									Processando...
								</>
							) : (
								"Cadastrar"
							)}
						</Button>
					</div>
				</form>
			</div>
		</main>
	);
};
