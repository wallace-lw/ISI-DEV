import { ErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { percentualSchema } from "./schema";
import type * as T from "./types";

export const PercentageForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<T.PercentualSchema>({
		resolver: zodResolver(percentualSchema),
	});

	const onSubmit: SubmitHandler<T.PercentualSchema> = (data) => {
		console.log(data);
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<Label>Percentual de Desconto</Label>
			<div className="grid gap-1">
				<Controller
					control={control}
					name="percentage"
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Digite o código do cupom"
							onChange={(e) => {
								field.onChange(e.target.value);
							}}
						/>
					)}
				/>
				<Label className="text-xs text-gray-400 ml-1">
					Digite um valor 1% e 100%
				</Label>
			</div>
			<ErrorMessage message={errors.percentage?.message} />

			<div className="flex justify-end gap-4 mt-4">
				{/* TODO: BOTÃO CANCELAR LIMPAR CAMPOS E VOLTAR A TELA ANTERIOR */}
				<Button variant={"outline"} type="button">
					Cancelar
				</Button>
				<Button type="submit">Aplicar</Button>
			</div>
		</form>
	);
};
