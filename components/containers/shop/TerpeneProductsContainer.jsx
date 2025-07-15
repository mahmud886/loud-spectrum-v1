'use client';
import ProductFilter from '@/components/containers/ProductFilter';
import ProductGridCard from '@/components/product/ProductGridCard';
import RadioGroupButtons from '@/components/ui/RadioGroupButtons';
import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

const TerpeneProductsContainer = ({ categories, categoryProducts }) => {
  const t = useTranslations('TerpeneShop');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return categoryProducts;
    }
    return categoryProducts.filter((product) =>
      selectedCategories.some((category) => product.category_id === category._id),
    );
  }, [categoryProducts, selectedCategories]);

  const hasFilters = selectedCategories.length > 0;

  return (
    <div className="container pt-[100px]">
      <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
        <div className="w-full md:w-[20%]">
          <div className="mb-6 md:mb-12">
            <h5 className="text-umbra-100 font-sans text-[18px] leading-[130%] font-normal tracking-normal md:text-[22px]">
              {t('AllProducts')} <span className="text-umbra-40">({filteredProducts.length})</span>
            </h5>
          </div>
          <div className="block md:hidden">
            <ProductFilter categories={categories} onCategoryChange={setSelectedCategories} />
          </div>
          <div className="hidden md:block">
            <RadioGroupButtons categories={categories} onCategoryChange={setSelectedCategories} />
          </div>
        </div>
        <div className="w-full space-y-10 md:w-[75%]">
          {filteredProducts.length === 0 ? (
            <NoProductsFound hasFilters={hasFilters} />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 space-y-8 md:grid-cols-3 md:gap-5 md:space-y-16">
                {filteredProducts.map((product) => (
                  <ProductGridCard key={product._id} product={product} />
                ))}
              </div>
              <div className="border-1"></div>
              {/* <ProductPagination /> */}
            </>
          )}
        </div>
      </div>
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
          ? t('NoProductsInCategory') || 'No products in this category'
          : t('NoProductsAvailable') || 'No products available'}
      </h3>
      <p className="text-umbra-60 mb-6 max-w-md font-sans text-[16px] leading-[150%]">
        {hasFilters
          ? t('NoProductsInCategoryDescription') ||
            'Try selecting different categories or clear filters to see more products.'
          : t('NoProductsAvailableDescription') ||
            "We're currently updating our inventory. Please check back soon for new products."}
      </p>
    </div>
  );
};

export default TerpeneProductsContainer;
