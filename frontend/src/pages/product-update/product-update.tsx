import { Loader } from "lucide-react";
import { Suspense } from "react";
import { useParams } from "react-router";
import { PageTitle } from "@/components";
import { useProduct } from "@/hooks";
import { ProductUpdateForm } from "./components/product-update-form";

export const ProductUpdate = () => {
	const { id } = useParams();

	const { data } = useProduct(id as string);

	return (
		<Suspense fallback={<Loader className="w-4 h-4 mr-2 animate-spin" />}>
			<main className="flex flex-col gap-12">
				<PageTitle title="Editar Produto" icon="edit" />

				<div className="bg-background w-full rounded-2xl">
					<header className="border-b border-accent h-12 flex items-center w-full px-6">
						<h6 className="font-semibold">Dados do produto</h6>
					</header>

					<ProductUpdateForm product={data} />
				</div>
			</main>
		</Suspense>
	);
};
