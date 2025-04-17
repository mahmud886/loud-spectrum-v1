import React from 'react';
import ProductCard from '@/components/product/ProductCard';
import ProductPagination from '@/components/containers/shop/ProductPagination';
import RadioGroupButtons from '@/components/ui/RadioGroupButtons';
import { useTranslations } from 'next-intl';

const TerpeneProductsContainer = () => {
  const t = useTranslations('TerpeneShop');
  return (
    <div className="container pt-[100px]">
      <div className="flex items-start justify-between gap-12">
        <div className="min-w-[20%]">
          <div className="mb-12">
            <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
              {t('AllProducts')} <span className="text-umbra-40">(62)</span>
            </h5>
          </div>
          <RadioGroupButtons />
        </div>
        <div className="flex flex-col space-y-20">
          <div className="grid min-w-[77%] grid-cols-3 gap-x-5 gap-y-20">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="border-1"></div>
          <ProductPagination />
        </div>
      </div>
    </div>
  );
};

export default TerpeneProductsContainer;
