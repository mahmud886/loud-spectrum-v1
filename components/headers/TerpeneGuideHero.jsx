import { useTranslations } from 'next-intl';
import Image from 'next/image';

const TerpeneGuideHero = () => {
  const t = useTranslations('');
  return (
    <div className="bg-umbra-100 relative h-[374px] overflow-hidden md:h-[689px]">
      {/* Background Image */}
      <Image
        src="/assets/images/terpene-guide-hero.jpeg"
        alt="Background"
        width={1440}
        height={689}
        className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 object-cover md:h-[689px] md:w-[1440px]"
        priority
      />

      <div className="absolute inset-0 z-10 container h-[450px] w-full overflow-hidden md:h-[550px]">
        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-[40px] md:w-2/5">
          <div>
            <h1 className="pb-5 font-sans text-[35px] leading-[120%] font-normal tracking-normal text-white md:text-[60px]">
              {t('Loud_Spectrum_Terpenes_Guide')}
            </h1>
          </div>
        </div>
      </div>

      {/* Wave Image Overlay at Bottom Center */}
      <div className="absolute bottom-0 left-1/2 z-20 w-full -translate-x-1/2 md:w-[1440px]">
        <Image
          src="/assets/images/terpene-guide-section-mask.png"
          alt={t('Loud_Spectrum_Terpenes_Guide')}
          width={1440}
          height={195}
          className="h-[50px] w-full object-cover md:h-[195px] md:w-[1440px]"
        />
      </div>
    </div>
  );
};

export default TerpeneGuideHero;
