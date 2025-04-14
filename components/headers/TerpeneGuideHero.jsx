import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const TerpeneGuideHero = () => {
  const t = useTranslations('');
  return (
    <div className="bg-umbra-100 relative h-[689px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/terpene-guide-hero.jpeg"
        alt="Background"
        width={1440}
        height={689}
        className="absolute top-0 left-1/2 z-0 h-full w-[1440px] -translate-x-1/2 object-cover"
        priority
      />

      <div className="absolute inset-0 z-10 container h-[570px] w-full overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex h-full w-2/5 flex-col items-center justify-center gap-[40px]">
          <div>
            <h1 className="pb-5 font-sans text-[60px] leading-[120%] font-normal tracking-normal text-white">
              {t('Loud_Spectrum_Terpenes_Guide')}
            </h1>
          </div>
        </div>
      </div>

      {/* Wave Image Overlay at Bottom Center */}
      <div className="absolute bottom-0 left-1/2 z-20 w-[1440px] -translate-x-1/2">
        <Image
          src="/assets/images/terpene-guide-section-mask.png"
          alt={t('Loud_Spectrum_Terpenes_Guide')}
          width={1440}
          height={195}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default TerpeneGuideHero;
