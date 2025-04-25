'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const ProductCard = () => {
  const t = useTranslations('TerpeneShop.ProductCard');
  const pathname = usePathname();

  // Check if we're on the shop page
  const isShopPage = pathname === '/shop';

  return (
    <div className="group cursor-pointer">
      <div className="group-hover:border-umbra-100 h-[455px] w-full border border-transparent bg-[#F0F0F0] p-5 transition-colors duration-200 ease-in-out md:h-[384px] md:w-[305px]">
        <div className="flex justify-end">
          <button className="main-button-black rounded-full px-6 py-3 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
            {t('buyNow')}
          </button>
        </div>
        <div className="flex items-center justify-center overflow-hidden">
          <Image
            className="transition-scale h-[274px] w-[205px] object-cover duration-200 ease-in-out group-hover:scale-110"
            src="/assets/images/products/mother.png"
            alt="Product"
            width={411}
            height={548}
            priority={true}
          />
        </div>
        <button className="border-umbra-100 rounded-[3px] border px-2 text-[12px] font-normal">{t('tag')}</button>
      </div>
      <div className="mt-[15px]">
        <h2 className={clsx('text-[22px] font-normal', isShopPage ? 'text-black' : 'text-white-100')}>Mango OG</h2>
        <p className={clsx('text-[19px]', isShopPage ? 'text-umbra-40' : 'text-white-40')}>$10.00 – $2,999.00</p>
      </div>
    </div>
  );
};

export default ProductCard;
