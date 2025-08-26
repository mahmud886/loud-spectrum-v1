import { useTranslations } from 'next-intl';
import Image from 'next/image';

const TheLabHero = () => {
  const t = useTranslations('TheLab');
  return (
    <div className="container mt-[200px]">
      <div className="mb-6 flex items-center justify-center text-center">
        <h2 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal xl:w-1/2 xl:text-[60px]">
          {t('heading')}
        </h2>
      </div>
      <div className="space-y-20 pt-16">
        <div className="relative h-[427px] overflow-hidden bg-white xl:h-[631px]">
          {/* Background Image */}
          <Image
            src="/assets/images/the-lab.png"
            alt="Background"
            width={1280}
            height={631}
            className="absolute top-0 left-1/2 z-0 h-[427px] w-full -translate-x-1/2 object-cover xl:h-full xl:w-[1280px]"
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-center pt-12 xl:flex-row xl:pt-[100px]">
          <div className="flex w-full flex-col items-start justify-center gap-12 xl:min-w-[80%] xl:flex-row xl:gap-20">
            <div className="w-full xl:w-[474px]">
              <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal xl:text-[44px]">
                {t('subheading')}
              </h2>
            </div>
            <div className="w-full xl:w-[474px]">
              <div className="space-y-6">
                <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal tracking-normal">
                  {t('description1')}
                </p>
                <p className="text-umbra-100 font-mono text-[14px] leading-[140%] font-normal tracking-normal">
                  {t('description2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheLabHero;
