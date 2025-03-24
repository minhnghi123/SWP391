

import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pagination = memo(({ currentPage, totalPages, startIndex, endIndex, totalItems, onPageChange }) => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-2 ">
        <div className="text-sm text-blue-600 mb-4 sm:mb-0">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} records
        </div>
  
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft/>
          </Button>
          <div className="flex items-center px-4 border border-blue-200 rounded-md">
            <span className="text-blue-700">
              Page {currentPage} of {totalPages || 1}
            </span>
          </div>
          <Button
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
           <ChevronRight/>
          </Button>
        </div>
      </div>
    );
  });
  export default Pagination;