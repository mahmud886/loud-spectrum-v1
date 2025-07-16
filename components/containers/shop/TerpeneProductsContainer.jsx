import { useTranslations } from 'next-intl';
import CategoryButton from './CategoryButton';
import MobileProductSelect from './MobileProductSelect';
import TerpeneCategoryProducts from './TerpeneCategoryProducts';

const TerpeneProductsContainer = ({ categories, categoryId }) => {
  const t = useTranslations('TerpeneShop');
  const totalCategoryProducts = categories?.reduce((acc, category) => acc + category.productCount, 0);

  return (
    <div className="container pt-[100px]">
      <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
        <div className="w-full md:w-[20%]">
          <div className="mb-6 md:mb-12">
            <h5 className="text-umbra-100 font-sans text-[18px] leading-[130%] font-normal tracking-normal md:text-[22px]">
              {t('AllProducts')} <span className="text-umbra-40">({totalCategoryProducts || 0})</span>
            </h5>
          </div>
          <div className="block md:hidden">
            <MobileProductSelect categories={categories} totalCategoryProducts={totalCategoryProducts} />
          </div>
          <div className="hidden md:block">
            <CategoryButton categories={categories} totalCategoryProducts={totalCategoryProducts} />
          </div>
        </div>
        <TerpeneCategoryProducts categoryId={categoryId} />
      </div>
    </div>
  );
};

export default TerpeneProductsContainer;
