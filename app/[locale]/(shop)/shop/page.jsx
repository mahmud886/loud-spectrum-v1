import React from 'react';
import ShopHero from '@/components/headers/ShopHero';
import ShopQualityPromise from '@/components/containers/shop/ShopQualityPromise';

const ShopPage = () => {
  return (
    <>
      <ShopHero />
      <div className="h-screen">
        <h2>Products</h2>
      </div>
      <div className="container pt-20 pb-[160px]">
        <ShopQualityPromise />
      </div>
    </>
  );
};

export default ShopPage;
