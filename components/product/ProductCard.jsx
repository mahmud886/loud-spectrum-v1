'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const ProductCard = () => {
  const t = useTranslations('TerpeneShop.ProductCard');

  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/(en|fr|de|es|jp|ru)/, '').replace(/\/$/, '');

  const isShopPage = cleanPath.startsWith('/shop') || cleanPath.startsWith('/try-sample-pack');

  return (
    <div className="group cursor-pointer">
      <div className="group-hover:border-umbra-100 relative flex h-[455px] w-full flex-col justify-around border border-transparent bg-[#F0F0F0] p-5 transition-colors duration-200 ease-in-out md:h-[384px] md:w-[305px]">
        {/* Image Section */}
        <div className="mt-5 flex items-center justify-center overflow-hidden">
          <Image
            className="transition-scale h-[320px] w-auto object-cover duration-200 ease-in-out group-hover:scale-110 md:h-[274px] md:w-[205px]"
            src="/assets/images/products/mother.png"
            alt="Product"
            width={411}
            height={548}
            priority={true}
          />
        </div>

        {/* Tag Button (Hidden on mobile) */}
        <div className="hidden md:block">
          <button className="border-umbra-100 rounded-[3px] border px-2 text-[12px] font-normal">{t('tag')}</button>
        </div>

        {/* Buy Now Button (Mobile - at the bottom) */}
        <div className="mt-auto md:hidden">
          <button className="main-button-black w-full rounded-full px-6 py-3 opacity-100 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
            {t('buyNow')}
          </button>
        </div>

        {/* Buy Now Button (Desktop - top-right) */}
        <div className="absolute top-5 right-5 hidden group-hover:opacity-100 md:flex md:justify-end">
          <button className="main-button-black w-auto rounded-full px-6 py-3 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
            {t('buyNow')}
          </button>
        </div>
      </div>

      {/* Product Title and Price */}
      <div className="mt-[15px]">
        <h2 className={clsx('text-[22px] font-normal', isShopPage ? 'text-black' : 'text-white-100')}>Mango OG</h2>
        <p className={clsx('text-[19px]', isShopPage ? 'text-umbra-40' : 'text-white-40')}>$10.00 – $2,999.00</p>
      </div>
    </div>
  );
};

export default ProductCard;
