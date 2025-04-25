import React from 'react';
import { useTranslations } from 'next-intl';
import DiscoverWhatsNewProductCarousel from '@/components/carousels/DiscoverWhatsNewProductCarousel';

const WhatsNewProductSlider = () => {
  const t = useTranslations('NewPage.WhatsNewProductSlider');
  return (
    <div>
      <div className="absolute bottom-0 left-1/2 z-[100] container -translate-x-1/2">
        <div className="bg-transparent">
          <div className="py-20">
            <h2 className="text-white-100 font-sans text-[42px] leading-[120%] font-normal">{t('DiscoverWhatsNew')}</h2>
            <DiscoverWhatsNewProductCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNewProductSlider;
