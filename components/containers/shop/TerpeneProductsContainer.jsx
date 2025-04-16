import React from 'react';
import ProductCard from '@/components/product/ProductCard';
import ProductPagination from '@/components/containers/shop/ProductPagination';

const TerpeneProductsContainer = () => {
  return (
    <div className="container pt-[100px]">
      <div className="flex items-start justify-center gap-12">
        <div className="border-umbra-100 min-h-screen min-w-[20%] border-1">
          <h2>Hello</h2>
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
