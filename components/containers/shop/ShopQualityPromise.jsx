'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const ShopQualityPromise = () => {
  const t = useTranslations('TerpeneShop.ShopQualityPromise');

  return (
    <div className="bg-white-100 relative h-[797px] overflow-hidden">
      <div className="absolute top-[-2px] left-1/2 z-20 w-[1280px] -translate-x-1/2">
        <Image
          src="/assets/images/quality-promise-top-mask.png"
          alt="Shop Hero"
          width={1280}
          height={84}
          className="h-auto w-[1280px] object-cover"
        />
      </div>

      <Image
        src="/assets/images/quality-promise.png"
        alt="Background"
        width={1280}
        height={797}
        className="absolute top-0 left-1/2 z-0 h-full w-[1280px] -translate-x-1/2 object-cover"
        priority
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex max-w-[600px] flex-col items-center justify-center gap-[50px] text-center">
          <div>
            <h1 className="pb-5 font-sans text-[60px] leading-[120%] font-normal tracking-normal text-white">
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

      <div className="absolute bottom-[-2px] left-1/2 z-20 w-[1280px] -translate-x-1/2">
        <Image
          src="/assets/images/quality-promise-bottom-mask.png"
          alt="Shop Hero"
          width={1280}
          height={84}
          className="h-auto w-[1280px] object-cover"
        />
      </div>
    </div>
  );
};

export default ShopQualityPromise;
