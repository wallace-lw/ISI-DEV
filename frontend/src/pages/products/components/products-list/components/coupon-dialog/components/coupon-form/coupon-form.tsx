import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { Suspense, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCouponsList } from "@/hooks";
import { couponCodeSchema } from "./schema";
import type * as T from "./types";

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

	const { data } = useCouponsList();

	const onSubmit: SubmitHandler<T.CouponSchema> = (data) => {
		if (!data.coupon) return;
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
				<Suspense fallback={<Loader className="w-4 h-4 animate-spin" />}>
					<div className="grid grid-cols-3 gap-2">
						{data?.map((coupon) => (
							<Button
								key={coupon.code}
								variant={selectedCouponID === coupon.id ? "default" : "outline"}
								type="button"
								onClick={() => {
									setSelecetedCouponID(coupon.id);
									setValue("coupon", coupon.code);
								}}
							>
								{coupon.code}
							</Button>
						))}
					</div>
				</Suspense>
			</div>

			<div className="flex justify-end gap-4 mt-4">
				<DialogClose asChild>
					<Button variant={"outline"} type="button">
						Cancelar
					</Button>
				</DialogClose>
				<Button type="submit">Aplicar</Button>
			</div>
		</form>
	);
};
