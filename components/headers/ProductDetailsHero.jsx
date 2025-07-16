import ProductDetailsLeftCard from '@/components/product/ProductDetailsLeftCard';
import ProductDetailsRightCard from '@/components/product/ProductDetailsRightCard';
import { getCategories } from '@/services/get-categories';
import Image from 'next/image';
import { Suspense } from 'react';

const ProductDetailsHero = async ({ product }) => {
  const categories = await getCategories();
  const exactCategory = categories?.data?.categories?.find((category) => category._id === product?.category._id);
  return (
    <>
      <div className="relative hidden h-[1082px] overflow-hidden bg-black md:block">
        <Image
          // src="/assets/images/products/product-page-hero.png"
          src={
            exactCategory?.image
              ? `${process.env.NEXT_PUBLIC_API_URL}/public${exactCategory?.image}`
              : '/assets/images/products/product-page-hero.png'
          }
          alt="Background"
          width={1440}
          height={797}
          className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 object-cover md:w-[1920px]"
          priority
        />

        <div className="absolute inset-0 z-10 container h-[987px] w-full overflow-hidden">
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-[40px]">
            <div className="flex w-full items-start justify-between gap-[40px]">
              <Suspense
                fallback={
                  <div className="bg-white-100 text-umbra-100 animate-pulse p-5 md:h-[587px] md:w-[413px]">
                    Loading...
                  </div>
                }
              >
                {product && <ProductDetailsLeftCard product={product} />}
              </Suspense>
              <ProductDetailsRightCard product={product} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 z-20 w-[1440px] -translate-x-1/2">
          <Image
            src="/assets/images/hero-section-mask.png"
            alt="Shop Hero"
            width={1440}
            height={195}
            className="w-full object-cover"
          />
        </div>
      </div>

      {/*  For Mobile */}
      <div className="relative block h-[619px] overflow-hidden bg-black md:hidden">
        <Image
          src={
            exactCategory?.image
              ? `${process.env.NEXT_PUBLIC_API_URL}/public${exactCategory?.image}`
              : '/assets/images/products/product-page-hero.png'
          }
          alt="Background"
          width={375}
          height={619}
          className="absolute top-0 left-1/2 z-0 h-[619px] w-full -translate-x-1/2 object-cover"
          priority
        />
      </div>

      <div className="flex justify-center py-8 md:hidden">
        <Suspense fallback={<div className="bg-white-100 text-umbra-100 animate-pulse p-5">Loading...</div>}>
          {product && <ProductDetailsLeftCard product={product} />}
        </Suspense>
      </div>
    </>
  );
};
export default ProductDetailsHero;
