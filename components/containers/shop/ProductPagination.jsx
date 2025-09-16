'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ProductPagination = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  hasNextPage,
  hasPrevPage,
  goToPage,
  nextPage,
  prevPage,
  goToFirstPage,
  goToLastPage,
}) => {
  const t = useTranslations('TerpeneShop.Pagination');

  // Always show results info, but only show pagination controls if more than 1 page
  const showPaginationControls = totalPages > 1;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust start if we're near the end
      const adjustedStart = Math.max(1, endPage - maxVisiblePages + 1);

      for (let i = adjustedStart; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Results info */}
      <div className="text-sm text-gray-600">
        {t('showing', {
          start: startIndex,
          end: endIndex,
          total: totalItems,
          defaultValue: `Showing ${startIndex} to ${endIndex} of ${totalItems} products`,
        })}
      </div>

      {/* Pagination controls */}
      {showPaginationControls && (
        <div className="flex items-center gap-1">
          {/* First page */}
          <button
            onClick={goToFirstPage}
            disabled={!hasPrevPage}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={t('firstPage', { defaultValue: 'First page' })}
          >
            <ChevronsLeft size={16} />
          </button>

          {/* Previous page */}
          <button
            onClick={prevPage}
            disabled={!hasPrevPage}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={t('previousPage', { defaultValue: 'Previous page' })}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                  pageNum === currentPage
                    ? 'border-stardust bg-stardust text-umbra-100'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
                aria-label={t('pageNumber', { page: pageNum, defaultValue: `Page ${pageNum}` })}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {/* Next page */}
          <button
            onClick={nextPage}
            disabled={!hasNextPage}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={t('nextPage', { defaultValue: 'Next page' })}
          >
            <ChevronRight size={16} />
          </button>

          {/* Last page */}
          <button
            onClick={goToLastPage}
            disabled={!hasNextPage}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={t('lastPage', { defaultValue: 'Last page' })}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPagination;
