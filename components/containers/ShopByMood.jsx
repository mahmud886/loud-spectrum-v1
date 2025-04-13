import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ShopByMood = () => {
  const t = useTranslations('ShopByMood');
  return (
    <div className="container">
      <div className="bg-umbra-100 flex w-full items-center justify-between gap-20 p-[160px] text-white">
        <div className="flex min-w-[420px] flex-col space-y-6">
          <h5 className="text-white-100 font-sans text-[16px] font-normal uppercase">{t('Shop_by_Mood')}</h5>
          <h2 className="font-sans text-[44px] leading-[120%] font-normal text-white">
            {t('The_Right_Flavor_for_Every_Feeling')}
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-start gap-4">
            <button className="outline-button-black cursor-grab rounded-full px-6 py-2">{t('Active')}</button>
            <button className="outline-button-black cursor-grab rounded-full px-6 py-2">{t('Relaxed')}</button>
            <button className="outline-button-black cursor-grab rounded-full px-6 py-2">{t('Hybrid')}</button>
          </div>
        </div>
        <div className="h-full w-full">
          <Image
            src="/assets/images/shop-by-mood.png"
            width={522}
            height={474}
            className="h-[474] w-[522px] object-cover"
            alt={t('Shop_by_Mood')}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopByMood;
