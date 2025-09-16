'use client';

import { useCallback, useMemo, useState } from 'react';

/**
 * Custom hook for client-side pagination
 * @param {Array} data - Array of items to paginate
 * @param {number} itemsPerPage - Number of items per page (default: 9)
 * @returns {Object} Pagination state and controls
 */
export const usePagination = (data = [], itemsPerPage = 9) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when data changes
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Calculate pagination values
  const paginationInfo = useMemo(() => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    return {
      currentItems,
      currentPage,
      totalPages,
      totalItems,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems),
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [data, currentPage, itemsPerPage]);

  // Navigation functions
  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && page <= paginationInfo.totalPages) {
        setCurrentPage(page);
      }
    },
    [paginationInfo.totalPages],
  );

  const nextPage = useCallback(() => {
    if (paginationInfo.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [paginationInfo.hasNextPage]);

  const prevPage = useCallback(() => {
    if (paginationInfo.hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [paginationInfo.hasPrevPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPage(paginationInfo.totalPages);
  }, [paginationInfo.totalPages]);

  return {
    ...paginationInfo,
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
  };
};
