import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('');
  return (
    <>
      <div className="relative bg-black" style={{ zIndex: 1 }}>
        <div className="relative container h-[1100px] overflow-hidden">
          <>
            <div className="absolute top-0 left-1/2 z-0 h-[900px] w-[450px] -translate-x-1/2 transform overflow-hidden xl:hidden">
              <video
                src="/assets/homepage-hero-video-mobile.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                preload="auto"
              />
            </div>
            <div className="absolute top-0 left-1/2 z-0 hidden h-[1100px] w-[1440px] -translate-x-1/2 transform overflow-hidden xl:block">
              <video
                src="/assets/homepage-hero-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                preload="auto"
              />
            </div>
          </>

          <div className="relative z-30 flex h-[900px] flex-col justify-end gap-6 md:w-[70%] md:items-center md:justify-center md:gap-[40px] xl:w-3/6 xl:items-center xl:justify-center xl:gap-[40px]">
            <div className="space-y-6 xl:space-y-0">
              <h1 className="font-sans text-[35px] leading-[120%] font-normal tracking-normal text-white md:pb-5 md:text-[46px] xl:pb-5 xl:text-[60px]">
                {t('The_Premier_Terpene_Experience')}
              </h1>
              <p className="pb-6 font-mono text-[20px] leading-[140%] font-normal text-white md:text-[18px] xl:pb-0 xl:text-[20px]">
                {t(
                  'Enhance_your_products_with_the_widest_range_of_premium_terpenes_scientifically_crafted_to_elevate_every_experience',
                )}{' '}
              </p>
            </div>
            <div className="mb-12 flex w-full flex-col gap-[15px] md:mb-0 md:flex-row md:self-start xl:mb-0 xl:flex-row xl:self-start">
              <Link
                href={`/shop`}
                className="special-button inline-flex cursor-grab items-center justify-center rounded-full px-6 py-4 md:py-2 xl:py-2"
              >
                {t('Explore_the_shop')}
              </Link>
              <Link
                href={`/try-sample-pack`}
                className="outline-button-black inline-flex cursor-grab items-center justify-center rounded-full px-6 py-4 md:py-2 xl:py-2"
              >
                {t('Try_a_Sample_Pack')}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-screen">
          <div className="w-full">
            <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
              <div className="w-[30%] bg-white"></div>
              <div className="w-[70%] bg-transparent"></div>
            </div>
            <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
              <div className="w-[50%] bg-white"></div>
              <div className="w-[35%] bg-transparent"></div>
              <div className="w-[15%] bg-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mx-auto w-[375px] md:flex md:w-full xl:flex xl:w-[1440px]"> */}
      {/* <div className="mx-auto w-[375px] md:flex md:w-full xl:flex xl:w-full">
        <Image
          src="/assets/images/main-header-section-mask.png"
          alt="Shop Hero"
          width={1440}
          height={195}
          className="h-[50px] w-[375px] bg-black object-cover md:h-[195px] md:w-full xl:h-[195px] xl:w-full"
        />
      </div> */}
    </>
  );
};

export default Hero;
