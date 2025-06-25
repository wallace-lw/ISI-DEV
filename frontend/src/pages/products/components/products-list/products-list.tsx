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
import { ActionButtons } from "../action-buttons";
import { ProductPagination } from "../products-pagination/product-pagination";
import { ProductPrice } from "./components";
import { tableHeaders } from "./utils";

export const ProductsList = () => {
	const { data } = useProductsList();

	return (
		<Suspense fallback={<Loader className="w-4 h-4 mr-2 animate-spin" />}>
			{data?.data.length ? (
				<>
					<Table className="min-w-[768px] bg-background rounded-lg mt-4">
						<TableHeader>
							<TableRow className="h-12">
								{tableHeaders.map((item) => (
									<TableHead key={item.value}>{item.label}</TableHead>
								))}
							</TableRow>
						</TableHeader>

						<TableBody>
							{data.data.map((item) => (
								<TableRow key={item.id} className="h-16">
									<TableCell>{item.name}</TableCell>

									<TableCell className="max-w-[120px] truncate text-gray-500">
										{item.description || "Sem descrição"}
									</TableCell>

									<TableCell>
										<ProductPrice
											finalPrice={item.finalPrice}
											hasCouponApplied={item.hasCouponApplied}
											price={item.price}
											discount={item.discount}
										/>
									</TableCell>

									<TableCell>
										{item.isOutOfStock ? (
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
						currentPage={data.meta.page}
						totalPages={data.meta.totalPages}
					/>
				</>
			) : (
				<div className="h-[calc(100vh-300px)] w-full flex justify-center items-center">
					<h1>Nenhum produto cadastrado...</h1>
				</div>
			)}
		</Suspense>
	);
};
