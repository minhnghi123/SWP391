import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComponent({ currentPage, totalPages, handlePageChange, startIndex, endIndex, filteredData }) {
    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages = [];
        if (currentPage > 4) pages.push(1, 2, "...");

        const start = Math.max(3, currentPage - 1);
        const end = Math.min(totalPages - 2, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) pages.push("...", totalPages - 1, totalPages);

        return pages;
    };

    return (
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-blue-100 bg-gradient-to-b from-blue-50/30 to-transparent">
            <div className="text-sm text-blue-700 font-medium">
                Showing <span className="text-blue-900">{startIndex + 1}</span> to <span className="text-blue-900">{Math.min(endIndex, filteredData.length)}</span> of <span className="text-blue-900">{filteredData.length}</span> entries
            </div>

            <div className="flex justify-end">
                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent className="gap-1">
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => handlePageChange(currentPage - 1)} 
                                    disabled={currentPage === 1}
                                    className="hover:bg-blue-50 border-blue-200 text-blue-700"
                                />
                            </PaginationItem>

                            {getPageNumbers().map((page, index) =>
                                page === "..." ? (
                                    <PaginationItem key={`ellipsis-${index}`}>
                                        <PaginationEllipsis className="text-blue-400" />
                                    </PaginationItem>
                                ) : (
                                    <PaginationItem key={page}>
                                        <PaginationLink 
                                            className={`hover:bg-blue-50 border-blue-200 ${
                                                currentPage === page 
                                                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                                                    : "text-blue-700"
                                            }`}
                                            onClick={() => handlePageChange(page)}
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}

                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => handlePageChange(currentPage + 1)} 
                                    disabled={currentPage === totalPages}
                                    className="hover:bg-blue-50 border-blue-200 text-blue-700"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
}

