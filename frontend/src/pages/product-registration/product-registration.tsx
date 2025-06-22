import { ErrorMessage, PageTitle } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicIcon } from "lucide-react/dynamic";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { productSchema } from "./schema";
import type * as T from "./types";

export const ProductRegistration = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<T.ProductSchema>({
		resolver: zodResolver(productSchema),
	});

	const onSubmit: SubmitHandler<T.ProductSchema> = (data) => {
		console.log(data);
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
							name="product_name"
							render={({ field }) => (
								<Input {...field} placeholder="Informe o nome do produto" />
							)}
						/>

						<ErrorMessage message={errors.product_name?.message} />
					</div>

					<div className="grid gap-2">
						<Label className="flex gap-0">
							Descrição
							<DynamicIcon
								name="asterisk"
								color="red"
								size={12}
								className="mb-1"
							/>
						</Label>

						<Controller
							control={control}
							name="product_description"
							render={({ field }) => (
								<Textarea
									{...field}
									placeholder="Descrição detalhada do produto"
									className="h-28"
								/>
							)}
						/>

						<ErrorMessage message={errors.product_description?.message} />
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
									<Input {...field} placeholder="R$ 0,00" />
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
						{/* TODO: BOTÃO CANCELAR LIMPAR CAMPOS E VOLTAR A TELA ANTERIOR */}
						<Button variant={"outline"} type="button">
							Cancelar
						</Button>
						<Button type="submit">Cadastrar</Button>
					</div>
				</form>
			</div>
		</main>
	);
};
