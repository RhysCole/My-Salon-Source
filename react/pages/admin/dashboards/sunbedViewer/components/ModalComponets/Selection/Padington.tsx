
interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex items-center justify-end">
            <span className="text-base-content/80 hidden text-sm lg:inline">
                Showing <span className="text-base-content font-medium">{startItem} to {endItem}</span> of {totalItems} items
            </span>
            <div className="inline-flex items-center gap-1">
                <button 
                    className="btn btn-circle sm:btn-sm btn-xs btn-ghost" 
                    aria-label="Prev"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    <span className="iconify lucide--chevron-left"></span>
                </button>
                
                <button className="btn btn-primary btn-circle sm:btn-sm btn-xs">
                    {currentPage}
                </button>

                <button 
                    className="btn btn-circle sm:btn-sm btn-xs btn-ghost" 
                    aria-label="Next"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    <span className="iconify lucide--chevron-right"></span>
                </button>
            </div>
        </div>
    );
};