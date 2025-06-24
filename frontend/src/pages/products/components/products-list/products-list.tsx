import { Loader } from "lucide-react";
import { Suspense } from "react";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useProductsList } from "@/hooks";
import { formatCurrencyBRL } from "@/utils";
import { ActionButtons } from "./components";
import { ProductPagination } from "./components/products-pagination/product-pagination";
import { tableHeaders } from "./utils";

export const ProductsList = () => {
	const { data } = useProductsList();

	return (
		<Suspense fallback={<Loader className="w-4 h-4 mr-2 animate-spin" />}>
			{data?.data.length ? (
				<div className="w-full overflow-x-auto mt-6 rounded-lg drop-shadow-accent bg-background pb-5">
					<Table className="min-w-[768px]">
						<TableHeader>
							<TableRow className="h-16">
								{tableHeaders.map((item) => (
									<TableHead key={item.value}>{item.label}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.data.map((item) => (
								<TableRow key={item.id} className="h-12">
									<TableCell>{item.name}</TableCell>
									<TableCell className="max-w-[120px] truncate text-gray-500">
										{item.description || "Sem descrição"}
									</TableCell>
									<TableCell>{formatCurrencyBRL(item.price / 100)}</TableCell>
									<TableCell>
										{item.stock === 0 ? (
											<Label className="bg-red-500 text-white text-xs w-fit px-2 py-1 rounded-lg">
												Esgotado
											</Label>
										) : (
											item.stock
										)}
									</TableCell>
									<TableCell align="right">
										<ActionButtons id={item.id} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<ProductPagination
						totalPages={data.meta.totalPages}
						currentPage={data.meta.page}
					/>
				</div>
			) : (
				<div className="h-[calc(100vh-300px)] w-full flex justify-center items-center">
					<h1>Nenhum produto cadastrado...</h1>
				</div>
			)}
		</Suspense>
	);
};
