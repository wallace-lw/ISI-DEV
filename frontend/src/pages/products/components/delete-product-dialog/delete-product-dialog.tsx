import { DialogClose } from "@radix-ui/react-dialog";
import { Loader } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useDeleteProduct } from "@/hooks";
import type * as T from "./types";

export const DeleteProductDialog = ({ id }: T.DeleteProductProps) => {
	const { mutate, isPending } = useDeleteProduct(id);

	return (
		<Dialog>
			<DialogTrigger>
				<Button
					variant={"ghost"}
					size={"icon"}
					className="size-5 hover:text-red-600 transition-colors"
				>
					<DynamicIcon name="trash" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-end">
						<DynamicIcon name="trash-2" className="text-red-500" />
						Deletar Produto
					</DialogTitle>
					<Label className="mt-2">
						Tem certeza que deseja deletar esse produto ?
					</Label>
					<div className="w-full flex justify-end gap-4 mt-6">
						<DialogClose asChild>
							<Button variant={"outline"}>Cancelar</Button>
						</DialogClose>
						<Button variant={"destructive"} onClick={() => mutate()}>
							{isPending ? (
								<Loader className="size-4 animate-spin" />
							) : (
								"Deletar"
							)}
						</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
