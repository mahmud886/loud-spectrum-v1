import { useTranslations } from 'next-intl';
import Image from 'next/image';

const FluurProductShowcase = () => {
  const t = useTranslations('FluurPage.productShowcase');
  return (
    <div className="bg-white-100">
      <div className="container pt-20 pb-10 xl:px-[188px] xl:pb-20">
        <div className="space-y-6">
          <h5 className="text-umbra-40 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase xl:text-[16px]">
            {t('label')}
          </h5>
          <h6 className="text-umbra-100 w-full font-sans text-[32px] leading-[120%] font-normal tracking-normal xl:w-1/2 xl:text-[44px]">
            {t('title')}
          </h6>
          <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal tracking-normal xl:w-[65%]">
            {t('description')}
          </p>
        </div>

        {/* Combined Product Image */}
        <div className="mt-12 flex justify-center xl:mt-20">
          <Image
            src="/assets/images/fluur/Gum&Beads_Packaging.png"
            alt="FLUUR Gum and Beads"
            width={1064}
            height={525}
            className="h-full w-full object-cover xl:h-[525px] xl:w-[1064px]"
            priority
          />
        </div>

        {/* Individual Products */}
        <div className="mt-12 flex flex-col items-center justify-between gap-12 py-12 lg:flex-row lg:gap-10 xl:mt-0 xl:flex-row xl:gap-[145px] xl:py-20">
          {/* FLUUR Gum */}
          <Image
            src="/assets/images/fluur/Gum_Packaging.png"
            alt="FLUUR Gum"
            width={522}
            height={474}
            className="h-full w-full object-cover xl:h-[474px] xl:w-[522px]"
          />
          <div className="w-full space-y-10 xl:max-w-[474px]">
            <h5 className="text-umbra-100 pt-12 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:pt-0 xl:text-[32px]">
              {t('gum.title')}
            </h5>
            <p className="text-umbra-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
              {t('gum.description')}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-col items-center justify-between py-12 lg:flex-row lg:gap-10 xl:mt-0 xl:flex-row xl:gap-[145px] xl:py-20">
          <div className="order-2 w-full space-y-10 xl:order-1 xl:max-w-[474px]">
            <h5 className="text-umbra-100 pt-12 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:pt-0 xl:text-[32px]">
              {t('beads.title')}
            </h5>
            <p className="text-umbra-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
              {t('beads.description')}
            </p>
          </div>
          <div className="order-1 w-full xl:order-2 xl:max-w-[522px]">
            <Image
              src="/assets/images/fluur/Beads_Packaging.png"
              alt="FLUUR Beads"
              width={522}
              height={474}
              className="h-full w-full object-cover xl:h-[474px] xl:w-[522px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FluurProductShowcase;
