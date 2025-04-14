import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const OurVision = () => {
  const t = useTranslations('OurVision');
  return (
    <div className="container">
      <div className="relative h-[592px] w-full overflow-hidden">
        <Image src="/assets/images/our-vision.png" alt="Background" fill className="object-cover"
               priority />
        <div className="relative z-20 flex h-full items-center px-[100px]">
          <div className="max-w-[400px] space-y-6 text-white">
            <h6
              className="font-sans text-white-100 text-[16px] font-normal tracking-normal uppercase">{t('subtitle')}</h6>
            <h2
              className="font-sans text-[44px] leading-[120%] tracking-normal font-normal">{t('title')}</h2>
            <p className="font-mono text-[16px] text-white-100 leading-[140%] font-normal">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
