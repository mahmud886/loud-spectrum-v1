'use client';

import ProductGridCard from '@/components/product/ProductGridCard';
import { usePagination } from '@/hooks/usePagination';
import { useProductFilter } from '@/hooks/useProductFilter';
import { getCategoryProducts } from '@/services/get-category-products';
import { getTypeWiseProducts } from '@/services/get-type-wise-products';
import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import ProductPagination from './ProductPagination';
import TerpeneCategoryProductsLoading from './TerpeneCategoryProductsLoading';

// Client-side component that manages products with pagination and filtering
const TerpeneCategoryProducts = ({ categoryId, productTypes, isProductType }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations('TerpeneShop');

  // Determine if this is "all products" view (should show filters)
  const isAllProductsView = categoryId === 'all' || categoryId === null || categoryId === undefined;

  // Fetch products on mount and when dependencies change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let productData;

        if (isProductType?.type) {
          // Fetch products by type
          productData = await getTypeWiseProducts(isProductType?.name);
        } else if (categoryId && categoryId !== 'all') {
          // Fetch products by specific category
          productData = await getCategoryProducts(categoryId);
        } else {
          // Fetch all products for "all" category
          productData = await getCategoryProducts('all');
        }

        if (productData?.data) {
          // Filter active products
          const activeProducts = productData.data.filter(
            (product) => product.status === 'Active' && product.is_deleted === false,
          );
          setAllProducts(activeProducts);
        } else {
          setAllProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, isProductType]);

  // Initialize filtering (only for "all products" view)
  const filterHook = useProductFilter(isAllProductsView ? allProducts : []);
  const {
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
    hasActiveFilters,
    totalFilteredCount,
  } = filterHook;

  // Use filtered products for "all" view, original products for category view
  const productsToDisplay = isAllProductsView ? filteredProducts : allProducts;

  // Initialize pagination
  const paginationHook = usePagination(productsToDisplay, 9);
  const {
    currentItems,
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
    resetPagination,
  } = paginationHook;

  // Reset pagination when products change
  useEffect(() => {
    resetPagination();
  }, [productsToDisplay.length, resetPagination]);

  // Loading state
  if (loading) {
    return <TerpeneCategoryProductsLoading />;
  }

  // Error state
  if (error) {
    return (
      <div className="w-full space-y-10 xl:w-[75%]">
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <TriangleAlert size={50} className="text-red-500" />
          </div>
          <h3 className="text-umbra-100 mb-3 font-sans text-[24px] leading-[130%] font-medium">
            {t('ErrorLoadingProducts') || 'Error loading products'}
          </h3>
          <p className="text-umbra-60 mb-6 max-w-md font-sans text-[16px] leading-[150%]">{error}</p>
        </div>
      </div>
    );
  }

  // No products state
  if (allProducts.length === 0) {
    return <NoProductsFound hasFilters={false} />;
  }

  // No filtered products state
  // if (isAllProductsView && filteredProducts.length === 0 && hasActiveFilters) {
  //   return (
  //     <div className="w-full space-y-10 xl:w-[75%]">
  //       {/* Show filters */}
  //       <ProductFilters
  //         filters={filters}
  //         updateSortBy={updateSortBy}
  //         clearFilters={clearFilters}
  //         hasActiveFilters={hasActiveFilters}
  //         totalFilteredCount={totalFilteredCount}
  //         totalProducts={allProducts.length}
  //       />
  //       <NoProductsFound hasFilters={true} />
  //     </div>
  //   );
  // }

  return (
    <div className="w-full space-y-10 xl:w-[75%]">
      {/* Show filters only for "all products" view */}
      {/* {isAllProductsView && (
        <ProductFilters
          filters={filters}
          updateSortBy={updateSortBy}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          totalFilteredCount={totalFilteredCount}
          totalProducts={allProducts.length}
        />
      )} */}

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 space-y-8 lg:grid-cols-3 lg:gap-2 xl:grid-cols-3 xl:gap-5 xl:space-y-16">
        {currentItems.map((product) => (
          <ProductGridCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        goToPage={goToPage}
        nextPage={nextPage}
        prevPage={prevPage}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
      />

      <div className="border-1"></div>
    </div>
  );
};

// No Products Found Component
const NoProductsFound = ({ hasFilters }) => {
  const t = useTranslations('TerpeneShop');

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="bg-umbra-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
        <TriangleAlert size={50} />
      </div>
      <h3 className="text-umbra-100 mb-3 font-sans text-[24px] leading-[130%] font-medium">
        {hasFilters
          ? t('NoProductsInCategory') || 'No products match your filters'
          : t('NoProductsAvailable') || 'No products available'}
      </h3>
      <p className="text-umbra-60 mb-6 max-w-md font-sans text-[16px] leading-[150%]">
        {hasFilters
          ? t('NoProductsInCategoryDescription') || 'Try adjusting your filters or clear them to see more products.'
          : t('NoProductsAvailableDescription') ||
            "We're currently updating our inventory. Please check back soon for new products."}
      </p>
    </div>
  );
};

export default TerpeneCategoryProducts;
