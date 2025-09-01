import { useTranslations } from 'next-intl';
import Image from 'next/image';

const TerpeneGuideHero = () => {
  const t = useTranslations('');
  return (
    <div className="bg-umbra-100 relative h-[374px] overflow-hidden lg:h-[700px] xl:h-[700px]">
      {/* Background Image */}
      <Image
        src="/assets/images/terpene-guide-hero.jpeg"
        alt="Background"
        width={1440}
        height={689}
        className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 object-cover lg:h-[700px] xl:h-[689px] xl:w-[1920px]"
        priority
      />

      <div className="absolute inset-0 z-10 container h-[450px] w-full overflow-hidden lg:h-[700px] xl:h-[700px]">
        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-[40px] lg:h-[500px] xl:w-2/5">
          <div>
            <h1 className="pt-0 font-sans text-[35px] leading-[120%] font-normal tracking-normal text-white lg:pt-[100px] lg:text-[60px] xl:text-[60px]">
              {t('Loud_Spectrum_Terpenes_Guide')}
            </h1>
          </div>
        </div>
      </div>

      {/* Wave Image Overlay at Bottom Center */}
      {/* <div className="absolute bottom-0 left-1/2 z-20 w-full -translate-x-1/2 xl:w-[1440px]">
        <Image
          src="/assets/images/terpene-guide-section-mask.png"
          alt={t('Loud_Spectrum_Terpenes_Guide')}
          width={1440}
          height={195}
          className="h-[50px] w-full object-cover xl:h-[195px] xl:w-[1440px]"
        />
      </div> */}
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
  );
};

export default TerpeneGuideHero;
