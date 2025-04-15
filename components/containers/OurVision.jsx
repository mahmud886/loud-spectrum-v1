import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const OurVision = () => {
  const t = useTranslations('OurVision');
  return (
    <div className="container">
      <div className="relative h-[592px] w-full overflow-hidden">
        <Image src="/assets/images/our-vision.png" alt="Background" fill className="object-cover" priority />
        <div className="relative z-20 flex h-full items-center px-[100px]">
          <div className="max-w-[400px] space-y-6 text-white">
            <h6 className="heading-6">{t('subtitle')}</h6>
            <h2 className="font-sans text-[44px] leading-[120%] font-normal tracking-normal">{t('title')}</h2>
            <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal">{t('description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
