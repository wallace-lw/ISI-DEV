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
import { useApplyPercentDiscount } from "@/hooks/mutations/products/apply-percent-discount";
import { percentualSchema } from "./schema";
import type * as T from "./types";

export const PercentageForm = ({ productId, closeDialog }: T.PercentProps) => {
	const [selectedCouponID, setSelecetedCouponID] = useState<string | null>(
		null,
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<T.PercentualSchema>({
		resolver: zodResolver(percentualSchema),
	});

	const { data } = useCouponsList();

	const { mutate } = useApplyPercentDiscount();
	const onSubmit: SubmitHandler<T.PercentualSchema> = (data) => {
		mutate(
			{
				id: productId,
				code: data.code,
			},
			{
				onSuccess: () => {
					closeDialog();
				},
			},
		);
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<Label>Percentual de Desconto</Label>
			<div className="grid gap-1">
				<Controller
					control={control}
					name="code"
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
			</div>
			<ErrorMessage message={errors.code?.message} />

			<Suspense fallback={<Loader className="w-4 h-4 animate-spin" />}>
				<div className="grid grid-cols-3 gap-2">
					{data?.length ? (
						data
							?.filter((coupon) => coupon.type === "PERCENT")
							?.map((coupon) => (
								<Button
									key={coupon.code}
									variant={
										selectedCouponID === coupon.id ? "default" : "outline"
									}
									type="button"
									onClick={() => {
										setSelecetedCouponID(coupon.id);
										setValue("code", coupon.code.toUpperCase(), {
											shouldValidate: true,
											shouldDirty: true,
											shouldTouch: true,
										});
									}}
								>
									{coupon.code.toUpperCase()}
								</Button>
							))
					) : (
						<div className="col-span-3">
							<Label>Não há cupons disponíveis</Label>
						</div>
					)}
				</div>
			</Suspense>

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
