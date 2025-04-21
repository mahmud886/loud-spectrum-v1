import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const WholesaleRegistrationHero = () => {
  const t = useTranslations('Wholesale');
  return (
    <div className="container mt-[200px]">
      <div className="mb-6 flex items-center justify-center">
        <div className="w-[1/2] space-y-10 text-center">
          <h2 className="text-umbra-100 font-sans text-[60px] leading-[120%] font-normal">
            {t('wholesaleRegistrationHero.title')}
          </h2>
          <button className="main-button-black rounded-full px-6 py-2">
            {t('wholesaleRegistrationHero.registerButton')}
          </button>
        </div>
      </div>
      <div className="space-y-20 py-16">
        <div className="bg-umbra-100 relative h-[631px] overflow-hidden">
          <div className="absolute bottom-[-2px] left-[-2px] z-20">
            <Image
              src="/assets/images/wholesale-section-mask.png"
              alt="Wave"
              width={625}
              height={104}
              className="h-[105] w-[625px] object-cover"
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
          <div className="absolute top-[-2px] right-[-2px] w-[1280px]">
            <Image
              src="/assets/images/terpene-chart-section-mask-top-right.png"
              alt="Wave"
              width={1280}
              height={104}
              className="w-full object-cover"
            />
          </div>
          <div className="absolute top-0 right-1 w-[1280px]">
            <Image
              src="/assets/images/terpene-chart-section-mask-top-bottom.png"
              alt="Wave"
              width={1280}
              height={105}
              className="h-[105px] w-[1280px] object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="w-[550px] space-y-6">
            <h2 className="text-umbra-40 font-sans text-[16px] leading-[120%] font-normal uppercase">
              {t('wholesaleRegistrationHero.whyWholesaleTitle')}
            </h2>
            <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal tracking-normal">
              {t('wholesaleRegistrationHero.para1')}
            </p>
            <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal tracking-normal">
              {t('wholesaleRegistrationHero.para2')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesaleRegistrationHero;
