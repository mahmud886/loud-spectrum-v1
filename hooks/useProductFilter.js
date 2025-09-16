'use client';

import { useMemo, useState } from 'react';

/**
 * Custom hook for client-side product filtering
 * @param {Array} products - Array of products to filter
 * @returns {Object} Filter state and controls
 */
export const useProductFilter = (products = []) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    productType: '',
    priceRange: { min: 0, max: Infinity },
    sortBy: 'name', // 'name', 'price-low', 'price-high', 'newest'
  });

  // Get unique categories and product types from products
  const filterOptions = useMemo(() => {
    const categories = [...new Set(products.map((p) => p.category?.name).filter(Boolean))];
    const productTypes = [...new Set(products.map((p) => p.productType?.name).filter(Boolean))];

    // Get price range
    const prices = products.flatMap((p) => p.subProducts?.map((sp) => sp.price).filter(Boolean) || []);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;

    return {
      categories: categories.sort(),
      productTypes: productTypes.sort(),
      priceRange: { min: minPrice, max: maxPrice },
    };
  }, [products]);

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm) ||
          product.category?.name?.toLowerCase().includes(searchTerm),
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category?.name === filters.category);
    }

    // Product type filter
    if (filters.productType) {
      filtered = filtered.filter((product) => product.productType?.name === filters.productType);
    }

    // Price range filter
    if (filters.priceRange.min > 0 || filters.priceRange.max < Infinity) {
      filtered = filtered.filter((product) => {
        const prices = product.subProducts?.map((sp) => sp.price).filter(Boolean) || [];
        if (prices.length === 0) return true;
        const minProductPrice = Math.min(...prices);
        const maxProductPrice = Math.max(...prices);
        return maxProductPrice >= filters.priceRange.min && minProductPrice <= filters.priceRange.max;
      });
    }

    // Sorting
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name?.localeCompare(b.name) || 0);
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const aMin = Math.min(...(a.subProducts?.map((sp) => sp.price).filter(Boolean) || [Infinity]));
          const bMin = Math.min(...(b.subProducts?.map((sp) => sp.price).filter(Boolean) || [Infinity]));
          return aMin - bMin;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const aMax = Math.max(...(a.subProducts?.map((sp) => sp.price).filter(Boolean) || [0]));
          const bMax = Math.max(...(b.subProducts?.map((sp) => sp.price).filter(Boolean) || [0]));
          return bMax - aMax;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters]);

  // Filter update functions
  const updateSearch = (search) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const updateCategory = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const updateProductType = (productType) => {
    setFilters((prev) => ({ ...prev, productType }));
  };

  const updatePriceRange = (priceRange) => {
    setFilters((prev) => ({ ...prev, priceRange }));
  };

  const updateSortBy = (sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      productType: '',
      priceRange: { min: 0, max: Infinity },
      sortBy: 'name',
    });
  };

  const clearSearch = () => {
    setFilters((prev) => ({ ...prev, search: '' }));
  };

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.category ||
      filters.productType ||
      filters.priceRange.min > 0 ||
      filters.priceRange.max < Infinity
    );
  };

  return {
    filters,
    filteredProducts,
    filterOptions,
    updateSearch,
    updateCategory,
    updateProductType,
    updatePriceRange,
    updateSortBy,
    clearFilters,
    clearSearch,
    hasActiveFilters: hasActiveFilters(),
    totalFilteredCount: filteredProducts.length,
  };
};
