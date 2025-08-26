import { useTranslations } from 'next-intl';
import CategoryButton from './CategoryButton';
import MobileProductSelect from './MobileProductSelect';
import TerpeneCategoryProducts from './TerpeneCategoryProducts';

const TerpeneProductsContainer = ({ categories, categoryId, productTypes, isProductType }) => {
  const t = useTranslations('TerpeneShop');
  const totalCategoryProducts = categories?.reduce((acc, category) => acc + category.productCount, 0);

  return (
    <div className="container pt-[100px]">
      <div className="flex flex-col items-start justify-between gap-12 xl:flex-row">
        <div className="w-full xl:w-[20%]">
          <div className="mb-6 xl:mb-12">
            <h5 className="text-umbra-100 font-sans text-[18px] leading-[130%] font-normal tracking-normal xl:text-[22px]">
              {t('AllProducts')} <span className="text-umbra-40">({totalCategoryProducts || 0})</span>
            </h5>
          </div>
          <div className="block xl:hidden">
            <MobileProductSelect
              categories={categories}
              totalCategoryProducts={totalCategoryProducts}
              productTypes={productTypes || []}
            />
          </div>
          <div className="hidden xl:block">
            <CategoryButton
              categories={categories}
              totalCategoryProducts={totalCategoryProducts}
              productTypes={productTypes || []}
            />
          </div>
        </div>
        <TerpeneCategoryProducts
          categoryId={categoryId}
          productTypes={productTypes || []}
          isProductType={isProductType}
        />
      </div>
    </div>
  );
};

export default TerpeneProductsContainer;
