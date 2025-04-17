import React from 'react';
import ShopHero from '@/components/headers/ShopHero';
import ShopQualityPromise from '@/components/containers/shop/ShopQualityPromise';
import TerpeneProductsContainer from '@/components/containers/shop/TerpeneProductsContainer';

const ShopPage = () => {
  return (
    <>
      <ShopHero />
      <TerpeneProductsContainer />
      <div className="container pt-20 pb-[160px]">
        <ShopQualityPromise />
      </div>
    </>
  );
};

export default ShopPage;
