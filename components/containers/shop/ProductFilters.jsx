'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const ProductFilters = ({
  filters,
  updateSortBy,
  clearFilters,
  hasActiveFilters,
  totalFilteredCount,
  totalProducts,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const t = useTranslations('TerpeneShop.Filters');

  const sortOptions = [
    { value: 'name', label: t('sortBy.name', { defaultValue: 'Name (A-Z)' }) },
    { value: 'price-low', label: t('sortBy.priceLow', { defaultValue: 'Price (Low to High)' }) },
    { value: 'price-high', label: t('sortBy.priceHigh', { defaultValue: 'Price (High to Low)' }) },
    { value: 'newest', label: t('sortBy.newest', { defaultValue: 'Newest First' }) },
  ];

  return (
    <>
      {/* Desktop Filters - Sort Only */}
      <div className="hidden lg:block">
        <div className="mb-6">
          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => updateSortBy(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <div className="text-sm text-gray-600">
          {totalFilteredCount} of {totalProducts} products
        </div>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Sort
        </button>
      </div>

      {/* Mobile Sort Overlay */}
      {showMobileFilters && (
        <div className="bg-opacity-50 fixed inset-0 z-50 bg-black lg:hidden">
          <div className="absolute top-0 right-0 h-full w-80 bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-medium">Sort</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div>
              {/* Sort */}
              <select
                value={filters.sortBy}
                onChange={(e) => {
                  updateSortBy(e.target.value);
                  setShowMobileFilters(false);
                }}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;
