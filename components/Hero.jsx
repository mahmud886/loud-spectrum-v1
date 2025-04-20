import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import React from 'react';
import ProductDetailsLeftCard from '@/components/product/ProductDetailsLeftCard';
import ProductDetailsRightCard from '@/components/product/ProductDetailsRightCard';

const Hero = () => {
  const t = useTranslations('');
  return (
    <>
      <div className="bg-black" style={{ zIndex: 1 }}>
        <div className="relative container h-[900px] overflow-hidden">
          <Image
            src="/assets/images/homepage-image.jpeg"
            alt="Background"
            width={1440}
            height={900}
            className="absolute top-0 left-1/2 z-0 h-[900px] w-[1440px] -translate-x-1/2 object-cover"
            priority
          />

          <div className="relative z-30 flex h-[900px] w-3/6 flex-col items-center justify-center gap-[40px]">
            <div>
              <h1 className="pb-5 font-sans text-[60px] leading-[120%] font-normal tracking-normal text-white">
                {t('The_Premier_Terpene_Experience')}
              </h1>
              <p className="font-mono text-[20px] leading-[120%] font-normal text-white">
                {t(
                  'Enhance_your_products_with_the_widest_range_of_premium_terpenes_scientifically_crafted_to_elevate_every_experience',
                )}{' '}
              </p>
            </div>
            <div className="inline-flex w-full gap-[15px] self-start">
              <Link
                href={`/shop`}
                className="special-button inline-flex cursor-grab items-center justify-center rounded-full px-6 py-2"
              >
                {t('Explore_the_shop')}
              </Link>
              <Link href={`/try-sample-pack`} className="outline-button-black cursor-grab rounded-full px-6 py-2">
                {t('Try_a_Sample_Pack')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-[1440px]">
        <Image
          src="/assets/images/main-header-section-mask.png"
          alt="Shop Hero"
          width={1440}
          height={195}
          className="h-[195px] w-[1440px] bg-black object-cover"
        />
      </div>
    </>

    /*<div className="bg-black">
      <div className="relative container h-[900px] w-full overflow-hidden">
        {/!* Background Image *!/}
        <Image
          src="/assets/images/homepage-image.jpeg"
          alt="Background"
          className="h-[900px] w-[1440px] object-cover"
          width={1440}
          height={900}
        />
        <div className="absolute bottom-[-2px] left-0 z-20">
          <Image
            src="/assets/images/main-header-section-mask.png"
            alt="Wave"
            width={1440}
            height={185}
            className="h-[195px] w-[1440px] object-cover"
          />
        </div>

        {/!* Content *!/}
        <div className="relative z-30 flex h-full w-3/6 flex-col items-center justify-center gap-[40px]">
          <div>
            <h1 className="pb-5 font-sans text-[60px] leading-[120%] font-normal tracking-normal text-white">
              {t('The_Premier_Terpene_Experience')}
            </h1>
            <p className="font-mono text-[20px] leading-[120%] font-normal text-white">
              {t(
                'Enhance_your_products_with_the_widest_range_of_premium_terpenes_scientifically_crafted_to_elevate_every_experience',
              )}{' '}
            </p>
          </div>
          <div className="inline-flex w-full gap-[15px] self-start">
            <Link
              href={`/shop`}
              className="special-button inline-flex cursor-grab items-center justify-center rounded-full px-6 py-2"
            >
              {t('Explore_the_shop')}
            </Link>
            <Link href={`/try-sample-pack`} className="outline-button-black cursor-grab rounded-full px-6 py-2">
              {t('Try_a_Sample_Pack')}
            </Link>
          </div>
        </div>
      </div>
    </div>*/
  );
};

export default Hero;
