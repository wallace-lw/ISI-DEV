import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useProductFilters } from "@/hooks/helpers/use-product-filters";
import type * as T from "./types";

export const ProductPagination = ({
	currentPage,
	totalPages,
}: T.PaginationProps) => {
	const pages = Array.from({ length: totalPages }, (_, i) => ({
		label: i + 1,
		page: i + 1,
		isActive: i + 1 === currentPage,
	})).filter(
		(item) => item.page >= currentPage - 3 && item.page <= currentPage + 3,
	);

	const { filters, updateFilters } = useProductFilters();

	const handlePreviousPage = () => {
		if (currentPage === 1) return;
		updateFilters({ ...filters, page: currentPage - 1 });
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			updateFilters({ ...filters, page: currentPage + 1 });
		}
	};

	return (
		<Pagination className="mt-4">
			<PaginationContent>
				<PaginationItem
					className="bg-background rounded-lg"
					onClick={handlePreviousPage}
				>
					<PaginationPrevious />
				</PaginationItem>
				{pages.map((item) => (
					<PaginationLink
						key={item.page}
						className="bg-background"
						isActive={item.isActive}
						onClick={() => updateFilters({ page: item.page })}
					>
						{item.label}
					</PaginationLink>
				))}
				<PaginationItem className="bg-background" onClick={handleNextPage}>
					<PaginationNext />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
