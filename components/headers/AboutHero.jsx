import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutHero = () => {
  const t = useTranslations('AboutPage');
  return (
    <div className="bg-umbra-100 relative h-[771px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/about-hero.jpeg"
        alt="Background"
        width={1440}
        height={771}
        className="absolute top-0 left-1/2 z-0 h-full w-[1440px] -translate-x-1/2 object-cover"
        priority
      />

      <div className="absolute inset-0 z-10 container h-[771px] w-full overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex h-full w-2/5 flex-col items-center justify-center gap-[40px]">
          <div>
            <h1 className="pb-5 font-sans text-[60px] leading-[120%] font-normal tracking-normal text-white">
              {t('The_Best_in_the_Terpene_Business_Bar_None')}
            </h1>
          </div>
        </div>
      </div>

      {/* Wave Image Overlay at Bottom Center */}
      <div className="absolute bottom-0 left-1/2 z-20 w-[1440px] -translate-x-1/2">
        <Image
          src="/assets/images/about-section-mask.png"
          alt="Wave"
          width={1440}
          height={100}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AboutHero;
