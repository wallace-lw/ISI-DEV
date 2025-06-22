import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCurrencyBRL } from "@/utils";
import { ActionButtons } from "./components";
import { mockTableData, tableHeaders } from "./utils";

export const ProductsList = () => {
	return (
		<Table className="bg-background mt-6 rounded-lg drop-shadow-accent">
			<TableHeader>
				<TableRow className="h-16">
					{tableHeaders.map((item) => (
						<TableHead key={item.value}>{item.label}</TableHead>
					))}
				</TableRow>
			</TableHeader>

			<TableBody>
				{mockTableData.map((item) => (
					<TableRow key={item.id} className="h-12">
						<TableCell>{item.name}</TableCell>
						<TableCell className="max-w-[120px] truncate text-gray-500">
							{item.descritpion}
						</TableCell>
						<TableCell>{formatCurrencyBRL(item.price / 100)}</TableCell>
						<TableCell>{item.stock}</TableCell>
						<TableCell align="right">
							<ActionButtons id={item.id} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
