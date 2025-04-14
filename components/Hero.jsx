import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const Hero = () => {
  const t = useTranslations('');
  return (
    <div className="bg-black">
      <div className="relative container h-screen w-full overflow-hidden">
        {/* Background Image */}
        <Image src="/assets/images/homepage-image.jpeg" alt="Background" fill className="z-0 object-cover" priority />

        {/* Content */}
        <div className="relative z-10 flex h-full w-3/6 flex-col items-center justify-center gap-[40px]">
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
            <Link href={`/shop`} className="special-button cursor-grab rounded-full px-6 py-2">
              {t('Explore_the_shop')}
            </Link>
            <Link href={`/try-sample-pack`} className="outline-button-black cursor-grab rounded-full px-6 py-2">
              {t('Try_a_Sample_Pack')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
