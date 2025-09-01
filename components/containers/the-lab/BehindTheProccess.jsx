import { useTranslations } from 'next-intl';
import Image from 'next/image';

const BehindTheProccess = () => {
  const t = useTranslations('TheLab');
  return (
    <div className="bg-umbra-100">
      <div className="container pt-20 pb-10 xl:px-[188px] xl:pb-20">
        <div className="space-y-6">
          <h5 className="text-white-40 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase xl:text-[16px]">
            {t('behindTheProcess.title')}
          </h5>
          <h6 className="text-white-100 w-full font-sans text-[32px] leading-[120%] font-normal tracking-normal xl:w-1/2 xl:text-[44px]">
            {t('behindTheProcess.subtitle')}
          </h6>
        </div>
        <div className="mt-2 flex flex-col items-center justify-between py-12 xl:mt-0 xl:flex-row xl:gap-[145px] xl:py-20">
          <Image
            src="/assets/images/the-lab/behind-the-process-1.png"
            alt="the-lab-advantage"
            width={522}
            height={474}
            className="h-full w-full object-cover xl:h-[474px] xl:w-[522px]"
          />
          <div className="w-full space-y-10 xl:max-w-[397px]">
            <h5 className="text-white-100 pt-12 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:pt-0 xl:text-[32px]">
              {t('premiumSourcing.title')}
            </h5>
            <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
              {t('premiumSourcing.intro')}
            </p>
            <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
              <li className="border-t border-b py-2.5">{t('premiumSourcing.item1')}</li>
              <li className="border-b py-2.5">{t('premiumSourcing.item2')}</li>
              <li className="border-b py-2.5">{t('premiumSourcing.item3')}</li>
            </ul>
            <p className="text-white-100 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
              {t('premiumSourcing.details')}
            </p>
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center justify-between py-12 xl:mt-0 xl:flex-row xl:gap-[145px] xl:py-20">
          <Image
            src="/assets/images/the-lab/behind-the-process-2.png"
            alt="the-lab-advantage"
            width={522}
            height={474}
            className="h-full w-full object-cover xl:hidden xl:h-[474px] xl:w-[522px]"
          />
          <div className="w-full space-y-10 xl:max-w-[397px]">
            <h5 className="text-white-100 pt-12 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:pt-0 xl:text-[32px]">
              {t('advancedExtraction.title')}
            </h5>
            <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
              {t('advancedExtraction.description')}
            </p>
            <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
              <li className="border-white-40 border-t border-b py-2.5">{t('advancedExtraction.item1')}</li>
              <li className="border-white-40 border-b py-2.5">{t('advancedExtraction.item2')}</li>
              <li className="border-white-40 border-b py-2.5">{t('advancedExtraction.item3')}</li>
            </ul>
          </div>
          <Image
            src="/assets/images/the-lab/behind-the-process-2.png"
            alt="the-lab-advantage"
            width={522}
            height={474}
            className="hidden h-[474px] w-[522px] object-cover xl:block"
          />
        </div>
        <div className="mt-2 flex flex-col items-center justify-between py-12 xl:mt-0 xl:flex-row xl:gap-[145px] xl:py-20">
          <Image
            src="/assets/images/the-lab/behind-the-process-3.png"
            alt="the-lab-advantage"
            width={522}
            height={474}
            className="h-full w-full object-cover xl:h-[474px] xl:w-[522px]"
          />
          <div className="w-full space-y-10 xl:max-w-[397px]">
            <h5 className="text-white-100 pt-12 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:pt-0 xl:text-[32px]">
              {t('expertFormulation.title')}
            </h5>
            <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
              {t('expertFormulation.description')}
            </p>
            <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
              <li className="border-white-40 border-t border-b py-2.5">{t('expertFormulation.item1')}</li>
              <li className="border-white-40 border-b py-2.5">{t('expertFormulation.item2')}</li>
              <li className="border-white-40 border-b py-2.5">{t('expertFormulation.item3')}</li>
            </ul>
            <p className="text-white-100 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
              {t('expertFormulation.footer')}
            </p>
          </div>
        </div>
        <div className="space-y-10 py-12 xl:py-20">
          <h5 className="text-white-100 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:text-[32px]">
            {t('finalTesting.title')}
          </h5>
          <Image
            src="/assets/images/the-lab-advantage2.png"
            alt="the-lab-advantage"
            width={1064}
            height={525}
            className="h-full w-full object-cover xl:h-[525px] xl:w-[1064px]"
          />
          <div className="w-full">
            <div className="inline-flex flex-col items-center gap-0 xl:flex-row xl:gap-[145px]">
              <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                {t('finalTesting.description1')}
              </p>
              <p className="text-white-100 hidden font-sans text-[16px] leading-[140%] font-normal tracking-normal xl:block">
                {t('finalTesting.description2')}
              </p>
            </div>
          </div>
          <div className="w-full">
            <ul className="text-white-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
              <li className="border-white-40 border-t border-b py-2.5">{t('finalTesting.item1')}</li>
              <li className="border-white-40 border-b py-2.5">{t('finalTesting.item2')}</li>
              <li className="border-white-40 border-b py-2.5">{t('finalTesting.item3')}</li>
            </ul>
            <p className="text-white-100 mt-6 block font-sans text-[16px] leading-[140%] font-normal tracking-normal xl:hidden">
              {t('finalTesting.description2')}
            </p>
          </div>
        </div>
        <div className="mt-20 space-y-10">
          <h2
            className="w-full bg-clip-text pb-2 font-sans text-[50px] leading-[120%] font-normal tracking-normal text-transparent xl:w-[90%] xl:text-[70px]"
            style={{
              backgroundImage:
                'linear-gradient(270.64deg, #101820 2.05%, #0077C8 40.67%, #B2A9F5 72.15%, #DDDAE8 107%)',
            }}
          >
            {t('fromSeed.title')}
          </h2>
          <p className="text-white-100 w-full font-sans text-[16px] leading-[140%] font-normal tracking-normal xl:w-1/2">
            {t('fromSeed.description')}
          </p>
        </div>
      </div>
      {/* <div className="mx-auto w-full xl:w-[1440px]">
        <Image
          src="/assets/images/the-lab-section-mask.svg"
          alt="section-mask"
          width={1440}
          height={195}
          className="h-full w-full"
        />
      </div> */}
      <div className="w-screen">
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
      </div>
    </div>
  );
};

export default BehindTheProccess;
