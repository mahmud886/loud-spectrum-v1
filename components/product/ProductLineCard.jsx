'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ArrowRight from '@/components/svgs/arrow-right';
import { useTranslations } from 'next-intl';

const ProductLineCard = ({ productVariant = 'Default' }) => {
  const t = useTranslations();

  const variantClasses = {
    Alive: 'bg-alive border-alive',
    Sweet: 'bg-sweet border-sweet',
    Classic: 'bg-classic border-classic',
    Dank: 'bg-dank border-dank',
    Default: 'bg-gray-500 border-gray-500',
  };

  const bgClass = variantClasses[productVariant]?.split(' ')[0] || variantClasses.Default.split(' ')[0];
  const borderClass = variantClasses[productVariant]?.split(' ')[1] || variantClasses.Default.split(' ')[1];

  return (
    <div className="group cursor-pointer">
      <div
        className={cn(
          'border-umbra-10 relative h-[400px] w-full overflow-hidden border bg-[#F0F0F0] p-5 transition-colors duration-500 ease-in-out md:h-[408px] md:w-[305px] lg:h-[408px] lg:w-[305px]',
          'group-hover:border-transparent',
          `group-hover:${borderClass}`,
        )}
      >
        {/* Background Color Slide Up */}
        <div
          className={cn(
            'absolute inset-0 translate-y-full transform transition-transform duration-500 ease-in-out group-hover:translate-y-0',
            bgClass,
          )}
        />

        {/* Top Button */}
        <div className="relative z-10 flex justify-center md:justify-end lg:justify-end">
          <button className="outline-button-white border-umbra-10 group-hover:border-white-100 relative h-[44px] w-full cursor-pointer overflow-hidden rounded-full border px-6 py-3 opacity-100 transition-all duration-200 ease-in-out group-hover:text-white md:h-[37px] md:max-w-1/2 md:min-w-[150px] lg:h-[37px] lg:max-w-1/2 lg:min-w-[150px]">
            <span className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-200 ease-in-out group-hover:opacity-0">
              {t('buttons.shopTheLine')} <ArrowRight />
            </span>
            <span className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              {t('buttons.wholesale')} <ArrowRight />
            </span>
          </button>
        </div>

        {/* Product Image */}
        <div className="relative z-10 my-4 flex items-center justify-center overflow-hidden group-hover:hidden">
          <Image
            className="transition-scale h-[250px] w-[161px] object-cover duration-200 ease-in-out group-hover:scale-110 md:h-[282px] md:w-[211px] lg:h-[282px] lg:w-[211px]"
            src="/assets/images/products/product-line-1.png"
            alt="Product"
            width={422}
            height={565}
            priority={true}
          />
        </div>

        {/* Hover Description */}
        <div className="absolute bottom-[66px] left-5 w-[60%] translate-y-full transform opacity-0 transition-opacity transition-transform duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="mb-2 text-[14px] font-normal text-white">{t(`descriptions.${productVariant}.line1`)}</p>
          <p className="text-[14px] font-normal text-white">{t(`descriptions.${productVariant}.line2`)}</p>
        </div>

        {/* Rotated Variant Label */}
        <div className="absolute right-5 bottom-5 z-20 w-[70px] opacity-100 transition-opacity duration-200 ease-in-out">
          <p className="rotate-[-90deg] text-[70px] leading-none font-bold text-white">
            {t(`productVariants.${productVariant}`, { default: productVariant })}
          </p>
        </div>

        {/* Bottom Left Button */}
        <div className="absolute bottom-5 left-5 z-20 opacity-100 transition-opacity duration-200 ease-in-out">
          <button className="border-umbra-100 text-umbra-100 relative z-[100px] min-w-[114px] rounded-[3px] border px-2 py-[2px] text-[12px] font-normal transition-all duration-200 ease-in-out group-hover:border-white group-hover:text-white">
            {t('buttons.cannabisDerived')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductLineCard;
