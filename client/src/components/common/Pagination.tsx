import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false,
}) => {
    const handlePrevious = () => {
        if (currentPage > 1 && !isLoading) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages && !isLoading) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        if (!isLoading && page !== currentPage) {
            onPageChange(page);
        }
    };

    // Generate page numbers to show
    const getVisiblePages = () => {
        const pages: number[] = [];
        const showPages = 5; // Show max 5 page numbers
        
        if (totalPages <= showPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const start = Math.max(1, currentPage - 2);
            const end = Math.min(totalPages, start + showPages - 1);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-6 py-3 bg-dark-100 border border-dark-300 rounded-lg">
            <div className="flex items-center text-sm text-dark-600">
                <span>
                    Page {currentPage} of {totalPages}
                </span>
            </div>
            
            <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1 || isLoading}
                    className={cn(
                        "flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200",
                        currentPage === 1 || isLoading
                            ? "bg-dark-200 text-dark-400 cursor-not-allowed"
                            : "bg-white border border-dark-300 text-dark-500 hover:bg-dark-50"
                    )}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                    {getVisiblePages().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            disabled={isLoading}
                            className={cn(
                                "w-10 h-10 rounded-lg font-medium transition-colors duration-200",
                                page === currentPage
                                    ? "bg-primary-600 text-white"
                                    : isLoading
                                    ? "bg-dark-200 text-dark-400 cursor-not-allowed"
                                    : "bg-white border border-dark-300 text-dark-700 hover:bg-dark-50"
                            )}
                            aria-label={`Go to page ${page}`}
                            aria-current={page === currentPage ? "page" : undefined}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages || isLoading}
                    className={cn(
                        "flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200",
                        currentPage === totalPages || isLoading
                            ? "bg-dark-200 text-dark-400 cursor-not-allowed"
                            : "bg-white border border-dark-300 text-dark-500 hover:bg-dark-50"
                    )}
                    aria-label="Next page"
                >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
