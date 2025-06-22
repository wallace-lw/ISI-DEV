import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DynamicIcon } from "lucide-react/dynamic";
import { useState } from "react";
import { CouponForm, PercentageForm } from "./components";

export const CouponDialog = () => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant={"ghost"}
					size={"icon"}
					className="size-5 hover:text-green-600 transition-colors"
					onClick={() => setOpen(true)}
				>
					<DynamicIcon name="dollar-sign" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[550px]">
				<Tabs defaultValue="coupon">
					<DialogHeader className="py-4 border-b border-accent">
						<DialogTitle className="flex items-center gap-2 font-kanit text-xl">
							<DynamicIcon name="tag" />
							Aplicar Desconto
						</DialogTitle>
						<DialogDescription>
							Escolha como aplicar o desconto ao produto
						</DialogDescription>

						<TabsList className="w-full flex gap-4 mt-2">
							<TabsTrigger
								value="coupon"
								className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
							>
								<DynamicIcon name="tag" />
								Código Cupom
							</TabsTrigger>

							<TabsTrigger
								value="percentual"
								className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
							>
								<DynamicIcon name="percent" />
								Percentual Direto
							</TabsTrigger>
						</TabsList>
					</DialogHeader>

					<TabsContent value="coupon" className="mt-2">
						<CouponForm onSuccess={() => setOpen(false)} />
					</TabsContent>

					<TabsContent value="percentual">
						<PercentageForm />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};
