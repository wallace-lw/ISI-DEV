import { ErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { couponCodeSchema } from "./schema";
import type * as T from "./types";
import { mockedAvailableCoupons } from "./utils";

export const CouponForm = ({ onSuccess }: T.CouponProps) => {
	const [selectedCouponID, setSelecetedCouponID] = useState<string | null>();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<T.CouponSchema>({
		resolver: zodResolver(couponCodeSchema),
	});

	const onSubmit: SubmitHandler<T.CouponSchema> = (data) => {
		console.log(data);
		onSuccess();
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<Label>Código do Cupom</Label>
			<Controller
				control={control}
				name="coupon"
				render={({ field }) => (
					<Input
						{...field}
						placeholder="Digite o código do cupom"
						onChange={(e) => {
							field.onChange(e.target.value);
							setSelecetedCouponID(null);
						}}
					/>
				)}
			/>
			<ErrorMessage message={errors.coupon?.message} />

			<div className="flex flex-col gap-2 mt-6">
				<Label className="text-xs">Cupons disponiveis para teste:</Label>

				<div className="grid grid-cols-3 gap-2">
					{mockedAvailableCoupons.map((coupon) => (
						<Button
							key={coupon.id}
							variant={selectedCouponID === coupon.id ? "default" : "outline"}
							type="button"
							onClick={() => {
								setSelecetedCouponID(coupon.id);
								setValue("coupon", coupon.code);
							}}
						>
							{coupon.label}
						</Button>
					))}
				</div>
			</div>

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
