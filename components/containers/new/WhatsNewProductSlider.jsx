import React from 'react';
import { useTranslations } from 'next-intl';

const WhatsNewProductSlider = () => {
  const t = useTranslations('NewPage.WhatsNewProductSlider');
  return (
    <div>
      {/*<div className="absolute bottom-0 left-1/2 z-[100] container -translate-x-1/2">*/}
      <div className="bg-umbra-100 container">
        <div className="py-20">
          <h2 className="text-white-100 font-sans text-[42px] leading-[120%] font-normal">{t('DiscoverWhatsNew')}</h2>
          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="h-[451px] w-[305px] border-1"></div>
            <div className="h-[451px] w-[305px] border-1"></div>
            <div className="h-[451px] w-[305px] border-1"></div>
            <div className="h-[451px] w-[305px] border-1"></div>
          </div>
          <div className="mt-[60px]">
            <div className="h-[90px] w-full border-1 border-red-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNewProductSlider;
