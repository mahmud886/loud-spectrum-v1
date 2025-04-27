import React from 'react';
import ProductCard from '@/components/product/ProductCard';

const RelatedProducts = () => {
  return (
    <div className="container pt-20 pb-20 md:pb-[160px]">
      <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] tracking-normal">Related Products</h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default RelatedProducts;
