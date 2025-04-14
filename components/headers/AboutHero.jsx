import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutHero = () => {
  const t = useTranslations('AboutPage');
  return (
    <div className="bg-umbra-100 h-[771px]">
      <div className="flex w-full items-center justify-center">
        {/* Background Image */}
        <Image
          src="/assets/images/about-hero.jpeg"
          alt="Background"
          width={1440}
          height={771}
          className="z-0 h-[771px] w-[1440px] object-cover"
          priority
        />
      </div>
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
    </div>
  );
};

export default AboutHero;
