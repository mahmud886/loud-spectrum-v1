import { useTranslations } from 'next-intl';
import Image from 'next/image';

const FluurProcess = () => {
  const t = useTranslations('FluurPage.process');
  return (
    <div className="bg-umbra-100 mt-[100px] xl:mt-[200px]">
      <div className="container pt-20 pb-10 xl:px-[188px] xl:pb-20">
        <div className="space-y-6">
          <h5 className="text-white-40 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase xl:text-[16px]">
            {t('label')}
          </h5>
          <h6 className="text-white-100 w-full font-sans text-[32px] leading-[120%] font-normal tracking-normal xl:w-1/2 xl:text-[44px]">
            {t('title')}
          </h6>
        </div>

        {/* Process Steps */}
        <div className="mt-12 space-y-12 xl:mt-20 xl:space-y-20">
          {/* Step 1: Fresh Harvest */}
          <div className="flex flex-col items-center justify-between gap-12 py-12 lg:flex-row lg:gap-10 xl:flex-row xl:gap-[145px] xl:py-20">
            <div className="w-full space-y-6 xl:max-w-[522px]">
              <div className="relative h-[300px] w-full overflow-hidden xl:h-[400px]">
                <Image
                  src="/assets/images/fluur/fluur.png"
                  alt="Fresh Harvest"
                  width={522}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="w-full space-y-6 xl:max-w-[474px]">
              <h5 className="text-white-100 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:text-[32px]">
                {t('step1.title')}
              </h5>
              <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                {t('step1.description')}
              </p>
              <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
                <li className="border-white-40 border-t border-b py-2.5">{t('step1.item1')}</li>
                <li className="border-white-40 border-b py-2.5">{t('step1.item2')}</li>
                <li className="border-white-40 border-b py-2.5">{t('step1.item3')}</li>
              </ul>
            </div>
          </div>

          {/* Step 2: Extraction */}
          <div className="flex flex-col items-center justify-between gap-12 py-12 lg:flex-row lg:gap-10 xl:flex-row xl:gap-[145px] xl:py-20">
            <div className="order-2 w-full space-y-6 xl:order-1 xl:max-w-[474px]">
              <h5 className="text-white-100 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:text-[32px]">
                {t('step2.title')}
              </h5>
              <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                {t('step2.description')}
              </p>
              <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
                <li className="border-white-40 border-t border-b py-2.5">{t('step2.item1')}</li>
                <li className="border-white-40 border-b py-2.5">{t('step2.item2')}</li>
                <li className="border-white-40 border-b py-2.5">{t('step2.item3')}</li>
              </ul>
            </div>
            <div className="order-1 w-full xl:order-2 xl:max-w-[522px]">
              <div className="relative h-[300px] w-full overflow-hidden xl:h-[400px]">
                <Image
                  src="/assets/images/fluur/Gums_Product_Packaging.png"
                  alt="Extraction Process"
                  width={522}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Premium Formulation */}
          <div className="flex flex-col items-center justify-between gap-12 py-12 lg:flex-row lg:gap-10 xl:flex-row xl:gap-[145px] xl:py-20">
            <div className="w-full space-y-6 xl:max-w-[522px]">
              <div className="relative h-[300px] w-full overflow-hidden xl:h-[400px]">
                <Image
                  src="/assets/images/fluur/Gum_Packaging.png"
                  alt="Premium Formulation"
                  width={522}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="w-full space-y-6 xl:max-w-[474px]">
              <h5 className="text-white-100 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:text-[32px]">
                {t('step3.title')}
              </h5>
              <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                {t('step3.description')}
              </p>
              <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
                <li className="border-white-40 border-t border-b py-2.5">{t('step3.item1')}</li>
                <li className="border-white-40 border-b py-2.5">{t('step3.item2')}</li>
                <li className="border-white-40 border-b py-2.5">{t('step3.item3')}</li>
              </ul>
            </div>
          </div>

          {/* Step 4: Sensory Experience */}
          <div className="flex flex-col items-center justify-between gap-12 py-12 lg:flex-row lg:gap-10 xl:flex-row xl:gap-[145px] xl:py-20">
            <div className="order-2 w-full space-y-6 xl:order-1 xl:max-w-[474px]">
              <h5 className="text-white-100 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:text-[32px]">
                {t('step4.title')}
              </h5>
              <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                {t('step4.description')}
              </p>
              <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
                <li className="border-white-40 border-t border-b py-2.5">{t('step4.item1')}</li>
                <li className="border-white-40 border-b py-2.5">{t('step4.item2')}</li>
                <li className="border-white-40 border-b py-2.5">{t('step4.item3')}</li>
              </ul>
            </div>
            <div className="order-1 w-full xl:order-2 xl:max-w-[522px]">
              <div className="relative h-[300px] w-full overflow-hidden xl:h-[400px]">
                <Image
                  src="/assets/images/fluur/Beads_Packaging.png"
                  alt="Sensory Experience"
                  width={522}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Transition mask */}
      {/* <div className="w-screen">
        <div className="w-full">
          <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
            <div className="w-[70%] bg-transparent"></div>
            <div className="w-[30%] bg-white"></div>
          </div>
          <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
            <div className="w-[16%] bg-white"></div>
            <div className="w-[34%] bg-transparent"></div>
            <div className="w-[50%] bg-white"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FluurProcess;
