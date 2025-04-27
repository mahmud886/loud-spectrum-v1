import React from 'react';
import ProductCard from '@/components/product/ProductCard';
import ProductPagination from '@/components/containers/shop/ProductPagination';
import RadioGroupButtons from '@/components/ui/RadioGroupButtons';
import { useTranslations } from 'next-intl';
import ProductFilter from '@/components/containers/ProductFilter';
import ProductGridCard from '@/components/product/ProductGridCard';

const TerpeneProductsContainer = () => {
  const t = useTranslations('TerpeneShop');
  return (
    <div className="container pt-[100px]">
      <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
        <div className="w-full md:w-[20%]">
          <div className="mb-6 md:mb-12">
            <h5 className="text-umbra-100 font-sans text-[18px] leading-[130%] font-normal tracking-normal md:text-[22px]">
              {t('AllProducts')} <span className="text-umbra-40">(62)</span>
            </h5>
          </div>
          <div className="block md:hidden">
            <ProductFilter />
          </div>
          <div className="hidden md:block">
            <RadioGroupButtons />
          </div>
        </div>
        <div className="flex flex-col space-y-20">
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:min-w-[77%] md:grid-cols-3 md:gap-x-5 md:gap-y-20">
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
            <ProductGridCard />
          </div>
          <div className="border-1"></div>
          <ProductPagination />
        </div>
      </div>
    </div>
  );
};

export default TerpeneProductsContainer;
