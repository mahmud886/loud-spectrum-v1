import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const TerpeneChartHero = () => {
  const t = useTranslations('TerpeneChartHero');
  return (
    <div className="container mt-[150px] md:mt-[200px]">
      <div className="mb-6 flex w-full items-center justify-start md:w-1/2">
        <h2 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal md:text-[60px]">
          {t('heading')}
        </h2>
      </div>
      <div className="space-y-10 py-10 md:space-y-20 md:py-16">
        <div className="bg-umbra-100 relative h-[450px] overflow-hidden md:h-[631px]">
          <div className="absolute bottom-[-2px] left-[-2px] z-20 w-full md:w-[1280px]">
            <Image
              src="/assets/images/terpene-chart-section-mask-top-bottom.png"
              alt="Wave"
              width={1280}
              height={104}
              className="w-full object-cover md:h-[104px] md:w-[1280px]"
            />
          </div>
          {/* Background Image */}
          <Image
            src="/assets/images/terpene-chart-hero.png"
            alt="Background"
            width={1280}
            height={631}
            className="absolute top-0 left-1/2 z-0 h-[450px] w-full -translate-x-1/2 object-cover md:h-[631px] md:w-[1280px]"
            priority
          />
          {/* Wave Image Overlay at Bottom Center */}
          <div className="absolute top-[-2px] right-[-2px] z-20 w-full md:w-[1280px]">
            <Image
              src="/assets/images/terpene-chart-section-mask-top-right.png"
              alt="Wave"
              width={1280}
              height={104}
              className="w-full object-cover md:h-[104px] md:w-[1280px]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full space-y-4 text-left md:w-[55%] md:space-y-6 md:text-center">
            <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal md:text-[44px]">
              {t('subheading')}
            </h2>
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
