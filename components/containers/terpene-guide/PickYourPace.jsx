import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const PickYourPace = () => {
  const t = useTranslations('PickYourPace');

  return (
    <div className="container">
      <div className="py-[140px]">
        <div className="space-y-10">
          <h5 className="text-umbra-100 font-sans text-[16px] leading-[100%] font-normal tracking-normal uppercase">
            {t('title')}
          </h5>
          <h6 className="w-1/2 font-sans text-[44px] leading-[120%] font-normal tracking-normal">{t('subtitle')}</h6>
        </div>
        <div className="mt-12 flex space-x-5">
          <div className="group relative">
            <div className="">
              <div className="overflow-hidden transition-transform duration-500">
                <Image
                  src="/assets/images/what-are-terpenes-product.png"
                  alt={t('activeAlt')}
                  width={414}
                  height={408}
                  className="block h-auto w-[414px] object-cover group-hover:scale-110"
                />
              </div>
              <div className="absolute top-[5%] right-[5%]">
                <button className="outline-button-black rounded-full px-6 py-2">{t('shopActive')}</button>
              </div>
            </div>
            <h2 className="text-umbra-100 mt-5 font-sans text-[32px] leading-[120%]">{t('active')}</h2>
          </div>
          <div className="group relative">
            <div className="">
              <div className="overflow-hidden transition-transform duration-500">
                <Image
                  src="/assets/images/what-are-terpenes-product.png"
                  alt={t('relaxedAlt')}
                  width={414}
                  height={408}
                  className="block h-auto w-[414px] object-cover group-hover:scale-110"
                />
              </div>
              <div className="absolute top-[5%] right-[5%]">
                <button className="outline-button-black rounded-full px-6 py-2">{t('shopRelaxed')}</button>
              </div>
            </div>
            <h2 className="text-umbra-100 mt-5 font-sans text-[32px] leading-[120%]">{t('relaxed')}</h2>
          </div>
          <div className="group relative">
            <div className="">
              <div className="overflow-hidden transition-transform duration-500">
                <Image
                  src="/assets/images/what-are-terpenes-product.png"
                  alt={t('hybridAlt')}
                  width={414}
                  height={408}
                  className="block h-auto w-[414px] object-cover group-hover:scale-110"
                />
              </div>
              <div className="absolute top-[5%] right-[5%]">
                <button className="outline-button-black rounded-full px-6 py-2">{t('shopHybrid')}</button>
              </div>
            </div>
            <h2 className="text-umbra-100 mt-5 font-sans text-[32px] leading-[120%]">{t('hybrid')}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickYourPace;
