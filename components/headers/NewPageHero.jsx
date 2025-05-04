import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ProductCarouselWithProgress from '@/components/carousels/ProductCarouselWithProgress';
import ProductCard from '@/components/product/ProductCard';

const NewPageHero = () => {
  const t = useTranslations('NewPage.newPageHeroBanner');

  return (
    <div className="bg-umbra-100 relative h-[1250px] overflow-hidden md:h-[1200px]">
      <Image
        src="/assets/images/new-mimosa.png"
        alt="Background"
        width={1440}
        height={797}
        className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 object-fill md:w-[1920px]"
        priority
      />

      <div className="absolute inset-0 z-10 container h-[580px] w-full overflow-hidden">
        <div className="relative z-10 flex h-full w-full flex-row items-center justify-center gap-[40px]">
          <div className="w-full text-center md:w-[62%]">
            <h1 className="pb-5 font-sans text-[35px] leading-[120%] font-normal tracking-normal text-white md:text-[60px]">
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
      <div className="absolute bottom-[0%] left-1/2 z-[100] container -translate-x-1/2 md:bottom-[0%]">
        <div className="bg-transparent">
          <div className="py-20">
            <h2 className="text-white-100 mb-3 font-sans text-[32px] leading-[120%] font-normal md:text-[42px]">
              Discover What's New
            </h2>
            <ProductCarouselWithProgress>
              <ProductCard />
            </ProductCarouselWithProgress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPageHero;
