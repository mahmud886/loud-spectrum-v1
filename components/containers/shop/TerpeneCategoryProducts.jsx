import ProductGridCard from '@/components/product/ProductGridCard';
import { getCategoryProducts } from '@/services/get-category-products';
import { getTypeWiseProducts } from '@/services/get-type-wise-products';
import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import TerpeneCategoryProductsLoading from './TerpeneCategoryProductsLoading';

// Component that fetches and displays products
async function TerpeneCategoryProductsContent({ categoryId, productTypes, isProductType }) {
  if (isProductType?.type) {
    const productDetails = await getTypeWiseProducts(isProductType?.name);
    if (productDetails?.data?.length === 0) {
      return <NoProductsFound hasFilters={false} />;
    }

    return (
      <div className="w-full space-y-10 md:w-[75%]">
        <div className="grid grid-cols-2 gap-3 space-y-8 md:grid-cols-3 md:gap-5 md:space-y-16">
          {productDetails?.data
            ?.filter((product) => product.status === 'Active' && product.is_deleted === false)
            .map((product) => (
              <ProductGridCard key={product._id} product={product} />
            ))}
        </div>
        <div className="border-1"></div>
        {/* <ProductPagination /> */}
      </div>
    );
  }

  if (categoryId) {
    const categoryProducts = await getCategoryProducts(categoryId);
    if (categoryProducts?.data?.length === 0) {
      return <NoProductsFound hasFilters={false} />;
    }

    return (
      <div className="w-full space-y-10 md:w-[75%]">
        <div className="grid grid-cols-2 gap-3 space-y-8 md:grid-cols-3 md:gap-5 md:space-y-16">
          {categoryProducts?.data
            ?.filter((product) => product.status === 'Active' && product.is_deleted === false)
            .map((product) => (
              <ProductGridCard key={product._id} product={product} />
            ))}
        </div>
        <div className="border-1"></div>
        {/* <ProductPagination /> */}
      </div>
    );
  }
}

// Main component with Suspense boundary
export default function TerpeneCategoryProducts({ categoryId, productTypes, isProductType }) {
  return (
    <Suspense fallback={<TerpeneCategoryProductsLoading />}>
      <TerpeneCategoryProductsContent
        categoryId={categoryId}
        productTypes={productTypes || []}
        isProductType={isProductType}
      />
    </Suspense>
  );
}

// No Products Found Component
const NoProductsFound = ({ hasFilters }) => {
  const t = useTranslations('TerpeneShop');

  return (
    <div className="w-full space-y-10 md:w-[75%]">
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
    </div>
  );
};
