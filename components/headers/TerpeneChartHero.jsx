import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const TerpeneChartHero = () => {
  const t = useTranslations('TerpeneChartHero');
  return (
    <div className="container mt-[200px]">
      <div className="mb-6 flex w-1/2 items-center justify-start">
        <h2 className="text-umbra-100 font-sans text-[60px] leading-[120%] font-normal">{t('heading')}</h2>
      </div>
      <div className="space-y-20 py-16">
        <div className="bg-umbra-100 relative h-[631px] overflow-hidden">
          <div className="absolute bottom-[-2px] left-[-2px] z-20 w-[1280px]">
            <Image
              src="/assets/images/terpene-chart-section-mask-top-bottom.png"
              alt="Wave"
              width={1280}
              height={104}
              className="w-full object-cover"
            />
          </div>
          {/* Background Image */}
          <Image
            src="/assets/images/about-hero.jpeg"
            alt="Background"
            width={1280}
            height={631}
            className="absolute top-0 left-1/2 z-0 h-full w-[1280px] -translate-x-1/2 object-cover"
            priority
          />
          {/* Wave Image Overlay at Bottom Center */}
          <div className="absolute top-[-2px] right-[-2px] z-20 w-[1280px]">
            <Image
              src="/assets/images/terpene-chart-section-mask-top-right.png"
              alt="Wave"
              width={1280}
              height={104}
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-[55%] space-y-6 text-center">
            <h2 className="text-umbra-100 font-sans text-[44px] leading-[120%] font-normal">{t('subheading')}</h2>
            <p className="text-umbra-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerpeneChartHero;
