import React from 'react';
import ProductCard from '@/components/product/ProductCard';

const RelatedProducts = () => {
  return (
    <div className="container pt-20 pb-[160px]">
      <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] tracking-normal">Related Products</h2>
      <div className="mt-12 grid grid-cols-4 gap-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default RelatedProducts;
