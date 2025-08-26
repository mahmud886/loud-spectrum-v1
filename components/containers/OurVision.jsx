import { useTranslations } from 'next-intl';
import Image from 'next/image';

const OurVision = () => {
  const t = useTranslations('OurVision');
  return (
    <div className="container">
      <div className="relative h-[720px] w-full overflow-hidden xl:h-[592px]">
        <div className="absolute inset-0 z-10 mx-auto h-full w-full">
          <Image src="/assets/images/about-us/our-vision.png" alt="Background" fill className="object-cover" priority />
        </div>
        <div className="relative z-20 flex h-full items-end px-5 pt-10 xl:items-center xl:px-[100px]">
          <div className="space-y-6 pb-10 text-white xl:max-w-[400px] xl:pb-0">
            <h6 className="heading-6">{t('subtitle')}</h6>
            <h2 className="font-sans text-[32px] leading-[120%] font-normal tracking-normal xl:text-[44px]">
              {t('title')}
            </h2>
            <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal">{t('description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
