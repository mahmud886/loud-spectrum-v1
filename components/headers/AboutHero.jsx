import { useTranslations } from 'next-intl';
import Image from 'next/image';

const AboutHero = () => {
  const t = useTranslations('AboutPage');
  return (
    <div className="bg-umbra-100 relative h-[416px] overflow-hidden xl:h-[771px]">
      {/* Background Image */}
      <Image
        src="/assets/images/about-us/about-hero.png"
        alt="Background"
        width={1440}
        height={771}
        className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 object-cover xl:h-full xl:w-[1920px]"
        priority
      />

      <div className="absolute top-[45%] z-10 container h-[316px] w-full overflow-hidden xl:inset-0 xl:h-[771px]">
        {/* Content */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-[40px] xl:h-full xl:w-2/5">
          <h1 className="pb-5 font-sans text-[35px] leading-[120%] font-normal tracking-normal text-white xl:text-[60px]">
            {t('The_Best_in_the_Terpene_Business_Bar_None')}
          </h1>
        </div>
      </div>

      {/* Wave Image Overlay at Bottom Center */}
      {/* <div className="absolute bottom-0 left-1/2 z-20 h-fit w-full -translate-x-1/2 xl:w-[1440px]">
        <Image
          src="/assets/images/about-section-mask.png"
          alt="Wave"
          width={1440}
          height={100}
          className="h-[50px] w-full object-cover xl:h-[100px] xl:w-[1440px]"
        />
      </div> */}
      <div className="absolute bottom-0 left-0 w-screen">
        <div className="w-full">
          <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
            <div className="w-[70%] bg-transparent"></div>
            <div className="bg-stardust w-[30%]"></div>
          </div>
          <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
            <div className="bg-stardust w-[15.5%]"></div>
            <div className="w-[34.5%] bg-transparent"></div>
            <div className="bg-stardust w-[50%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
