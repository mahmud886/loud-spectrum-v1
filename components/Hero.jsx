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
          <>
            {/* Mobile Image */}
            <Image
              src="/assets/images/homepage-image.png"
              alt="Background"
              width={450}
              height={900}
              className="absolute top-0 left-1/2 z-0 h-[900px] w-[450px] -translate-x-1/2 md:hidden"
              priority
            />

            {/* Desktop Image */}
            <Image
              src="/assets/images/homepage-image.jpeg"
              alt="Background"
              width={1440}
              height={900}
              className="absolute top-0 left-1/2 z-0 hidden h-[900px] w-[1440px] -translate-x-1/2 object-cover md:block"
              priority
            />
          </>

          <div className="relative z-30 flex h-[900px] flex-col justify-end gap-6 md:w-3/6 md:items-center md:justify-center md:gap-[40px] lg:w-3/6">
            <div className="space-y-6 md:space-y-0">
              <h1 className="font-sans text-[35px] leading-[120%] font-normal tracking-normal text-white md:pb-5 md:text-[60px] lg:pb-5 lg:text-[60px]">
                {t('The_Premier_Terpene_Experience')}
              </h1>
              <p className="pb-6 font-mono text-[20px] leading-[140%] font-normal text-white md:pb-0">
                {t(
                  'Enhance_your_products_with_the_widest_range_of_premium_terpenes_scientifically_crafted_to_elevate_every_experience',
                )}{' '}
              </p>
            </div>
            <div className="mb-12 flex w-full flex-col gap-[15px] md:mb-0 md:flex-row md:self-start lg:mb-0 lg:self-start">
              <Link
                href={`/shop`}
                className="special-button inline-flex cursor-grab items-center justify-center rounded-full px-6 py-4 md:py-2 lg:py-2"
              >
                {t('Explore_the_shop')}
              </Link>
              <Link
                href={`/try-sample-pack`}
                className="outline-button-black inline-flex cursor-grab items-center justify-center rounded-full px-6 py-4 md:py-2 lg:py-2"
              >
                {t('Try_a_Sample_Pack')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-[375px] md:flex md:w-[1440px] lg:flex lg:w-[1440px]">
        <Image
          src="/assets/images/main-header-section-mask.png"
          alt="Shop Hero"
          width={1440}
          height={195}
          className="h-[50px] w-[375px] bg-black object-cover md:h-[195px] md:w-[1440px] lg:h-[195px] lg:w-[1440px]"
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
