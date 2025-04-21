import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const NewPageHero = () => {
  const t = useTranslations('NewPage.newPageHeroBanner');

  return (
    <div className="bg-umbra-100 relative h-[1079px] overflow-hidden">
      <Image
        src="/assets/images/new-mimosa.png"
        alt="Background"
        width={1440}
        height={797}
        className="absolute top-0 left-1/2 z-0 h-full w-[1440px] -translate-x-1/2 object-fill"
        priority
      />

      <div className="absolute inset-0 z-10 container h-[580px] w-full overflow-hidden">
        <div className="relative z-10 flex h-full w-full flex-row items-center justify-center gap-[40px]">
          <div className="w-[62%] text-center">
            <h1 className="pb-5 font-sans text-[60px] leading-[120%] font-normal tracking-normal text-white">
              {t('title')}
            </h1>
            <p className="font-mono text-[20px] leading-[120%] font-normal text-white">{t('description')}</p>
          </div>
        </div>
      </div>

      {/*<div className="absolute bottom-0 left-1/2 z-20 w-[1440px] -translate-x-1/2">
        <Image
          src="/assets/images/hero-section-mask.png"
          alt="Shop Hero"
          width={1440}
          height={195}
          className="w-full object-cover"
        />
      </div>*/}
    </div>
  );
};

export default NewPageHero;
