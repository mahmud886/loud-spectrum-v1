'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ShopQualityPromise = () => {
  const t = useTranslations('TerpeneShop.ShopQualityPromise');

  return (
    <div className="bg-white-100 relative h-[797px] overflow-hidden">
      <div className="absolute top-[-2px] left-1/2 z-20 w-full -translate-x-1/2 md:w-[1280px]">
        <Image
          src="/assets/images/quality-promise-top-mask.png"
          alt="Shop Hero"
          width={1280}
          height={84}
          className="h-[25px] w-full object-cover md:h-[84px] md:w-[1280px]"
        />
      </div>

      <Image
        src="/assets/images/shop-bottom.png"
        alt="Background"
        width={1280}
        height={795}
        className="absolute top-0 left-1/2 z-0 h-[775px] w-full -translate-x-1/2 object-cover md:h-[795px] md:w-[1280px]"
        priority
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex w-[90%] flex-col items-center justify-center gap-[50px] text-center md:max-w-[600px]">
          <div>
            <h1 className="pb-5 font-sans text-[38px] leading-[120%] font-normal tracking-normal text-white md:text-[60px]">
              {t('title')}
            </h1>
            <p className="font-mono text-[20px] leading-[120%] font-normal text-white">{t('description')}</p>
          </div>
          <div>
            <Link
              href="/terpene-guide"
              className="outline-button-black !text-umbra-100 cursor-grab rounded-full !bg-white px-6 py-2"
            >
              {t('button')}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[2%] left-1/2 z-20 w-full -translate-x-1/2 md:bottom-[-2px] md:w-[1280px]">
        <Image
          src="/assets/images/quality-promise-bottom-mask.png"
          alt="Shop Hero"
          width={1280}
          height={84}
          className="h-[25px] w-full object-cover md:h-[84px] md:w-[1280px]"
        />
      </div>
    </div>
  );
};

export default ShopQualityPromise;
