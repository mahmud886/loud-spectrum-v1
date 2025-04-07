import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('');
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image src="/assets/images/homepage-image.jpeg" alt="Background" fill className="z-0 object-cover" priority />

      {/* Content */}
      <div className="relative z-10 flex h-full w-3/6 flex-col items-center justify-center gap-[40px] px-[80px]">
        <div>
          <h1 className="font-sans text-[60px] leading-[120%] tracking-normal text-white pb-5">
            {t('The_Premier_Terpene_Experience')}
          </h1>
          <p className="font-mono text-[20px] leading-[120%] text-white">
            {t(
              'Enhance_your_products_with_the_widest_range_of_premium_terpenes_scientifically_crafted_to_elevate_every_experience',
            )}{' '}
          </p>
        </div>
        <div className="inline-flex gap-[15px] self-start">
          <button className="special-button h-[42px] w-[177px] cursor-grab rounded-full">
            {t('Explore_the_shop')}
          </button>
          <button className="outline-button-black h-[42px] w-[177px] cursor-grab rounded-full">
            {t('Try_a_Sample_Pack')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
