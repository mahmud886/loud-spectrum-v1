import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ArrowRight from '@/components/svgs/arrow-right';

const ProductLineCard = ({ productVariant }) => {
  const variantClasses = {
    Alive: 'bg-alive border-alive',
    Sweet: 'bg-sweet border-sweet',
    Classic: 'bg-classic border-classic',
    Dank: 'bg-dank border-dank',
    Default: 'bg-gray-500 border-gray-500',
  };

  return (
    <div className="group cursor-pointer">
      <div
        className={cn(
          'border-umbra-10 relative h-[408px] w-[305px] overflow-hidden border bg-[#F0F0F0] p-5 transition-colors duration-500 ease-in-out',
          'group-hover:border-transparent',
          `group-hover:${variantClasses[productVariant]?.split(' ')[1] || variantClasses.Default.split(' ')[1]}`,
        )}
      >
        <div
          className={cn(
            'absolute inset-0 translate-y-full transform transition-transform duration-500 ease-in-out group-hover:translate-y-0',
            variantClasses[productVariant]?.split(' ')[0] || variantClasses.Default.split(' ')[0],
          )}
        ></div>

        <div className="relative z-10 flex justify-end">
          <button className="outline-button-white border-umbra-10 group-hover:border-white-100 relative h-[37px] w-[147px] cursor-pointer overflow-hidden rounded-full border opacity-100 transition-all duration-200 ease-in-out group-hover:text-white">
            <span className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-200 ease-in-out group-hover:opacity-0">
              Shop the Line <ArrowRight />
            </span>
            <span className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              Wholesale <ArrowRight />
            </span>
          </button>
        </div>

        <div className="relative z-10 my-4 flex items-center justify-center overflow-hidden group-hover:hidden">
          <Image
            className="transition-scale h-[282px] w-[211px] object-cover duration-200 ease-in-out group-hover:scale-110"
            src="/assets/images/products/product-line-1.png"
            alt="Product"
            width={422}
            height={565}
            priority={true}
          />
        </div>

        {/* Product Description on Hover */}
        <div className="absolute bottom-[66px] left-5 w-[60%] translate-y-full transform opacity-0 transition-opacity transition-transform duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="mb-2 text-[14px] font-normal text-white">
            For the uncompromising connoisseur, Alive comes out swinging with its pure, aromatic, and potent properties.
          </p>
          <p className="text-[14px] font-normal text-white">
            This formula is a level above Live Resin and extracted directly from the finest flower through a specialized
            process in our cGMP Certified Facility.
          </p>
        </div>

        {/* Rotated Product Variant Text */}
        <div className="absolute right-5 bottom-5 z-20 w-[70px] opacity-100 transition-opacity duration-200 ease-in-out">
          <p className="rotate-[-90deg] text-[70px] leading-none font-bold text-white">{productVariant}</p>
        </div>

        {/* Cannabis Derived Button */}
        <div className="absolute bottom-5 left-5 z-20 opacity-100 transition-opacity duration-200 ease-in-out">
          <button className="border-umbra-100 text-umbra-100 relative z-[100px] h-[22px] w-[114px] rounded-[3px] border text-[12px] font-normal transition-all duration-200 ease-in-out group-hover:border-white group-hover:text-white">
            Cannabis Derived
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductLineCard;
