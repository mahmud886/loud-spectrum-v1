import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ShopByMood = () => {
  const t = useTranslations('ShopByMood');
  return (
    <div className="bg-umbra-100 w-full pt-20 lg:pt-0 xl:pt-0">
      <div className="container">
        <div className="flex w-full flex-col items-center justify-between gap-12 text-white lg:flex-row lg:gap-20 lg:p-[80px] xl:flex-row xl:gap-20 xl:p-[80px]">
          <div className="flex w-full flex-col lg:min-w-[420px] xl:min-w-[420px]">
            <div className="space-y-6 text-center lg:text-left xl:text-left">
              <h5 className="text-white-100 font-sans text-[16px] font-normal uppercase">{t('Shop_by_Mood')}</h5>
              <h2 className="font-sans text-[44px] leading-[120%] font-normal text-white">
                {t('The_Right_Flavor_for_Every_Feeling')}
              </h2>
            </div>
            <div className="mt-6 hidden flex-wrap items-center justify-center gap-1 lg:justify-start lg:gap-4 xl:flex xl:justify-start xl:gap-4">
              <Link href="/shop/active" className="outline-button-black cursor-grab rounded-full px-6 py-2">
                {t('Active')}
              </Link>
              <Link href="/shop/relax" className="outline-button-black cursor-grab rounded-full px-6 py-2">
                {t('Relaxed')}
              </Link>
              <Link href="/shop/hybrid" className="outline-button-black cursor-grab rounded-full px-6 py-2">
                {t('Hybrid')}
              </Link>
            </div>
          </div>
          <div className="h-full w-full">
            <Image
              src="/assets/images/shop-by-mode.png"
              width={522}
              height={474}
              className="h-[474] w-[522px] object-cover"
              alt={t('Shop_by_Mood')}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 xl:hidden lg:xl:hidden">
            <Link href="/shop/active" className="outline-button-black cursor-grab rounded-full px-6 py-2">
              {t('Active')}
            </Link>
            <Link href="/shop/relax" className="outline-button-black cursor-grab rounded-full px-6 py-2">
              {t('Relaxed')}
            </Link>
            <Link href="/shop/hybrid" className="outline-button-black cursor-grab rounded-full px-6 py-2">
              {t('Hybrid')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByMood;
