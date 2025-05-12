import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const BehindTheProccess = () => {
  const t = useTranslations('TheLab');
  return (
    <>
      <div className="bg-umbra-100 container pt-20 pb-10 md:px-[188px] md:pb-20 2xl:px-[428px]">
        <div className="space-y-6">
          <h5 className="text-white-40 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase md:text-[16px]">
            {t('behindTheProcess.title')}
          </h5>
          <h6 className="text-white-100 w-full font-sans text-[32px] leading-[120%] font-normal tracking-normal md:w-1/2 md:text-[44px]">
            {t('behindTheProcess.subtitle')}
          </h6>
        </div>
        <div className="mt-2 flex flex-col items-center justify-between py-12 md:mt-0 md:flex-row md:gap-[145px] md:py-20">
          <Image
            src="/assets/images/the-lab/behind-the-process-1.png"
            alt="the-lab-advantage"
            width={522}
            height={474}
            className="h-full w-full object-cover md:h-[474px] md:w-[522px]"
          />
          <div className="w-full space-y-10 md:max-w-[397px]">
            <h5 className="text-white-100 pt-12 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal md:pt-0 md:text-[32px]">
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
        <div className="mt-2 flex flex-col items-center justify-between py-12 md:mt-0 md:flex-row md:gap-[145px] md:py-20">
          <Image
            src="/assets/images/the-lab/behind-the-process-2.png"
            alt="the-lab-advantage"
            width={522}
            height={474}
            className="h-full w-full object-cover md:hidden md:h-[474px] md:w-[522px]"
          />
          <div className="w-full space-y-10 md:max-w-[397px]">
            <h5 className="text-white-100 pt-12 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal md:pt-0 md:text-[32px]">
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
            className="hidden h-[474px] w-[522px] object-cover md:block"
          />
        </div>
        <div className="mt-2 flex flex-col items-center justify-between py-12 md:mt-0 md:flex-row md:gap-[145px] md:py-20">
          <Image
            src="/assets/images/the-lab/behind-the-process-3.png"
            alt="the-lab-advantage"
            width={522}
            height={474}
            className="h-full w-full object-cover md:h-[474px] md:w-[522px]"
          />
          <div className="w-full space-y-10 md:max-w-[397px]">
            <h5 className="text-white-100 pt-12 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal md:pt-0 md:text-[32px]">
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
        <div className="space-y-10 py-12 md:py-20">
          <h5 className="text-white-100 pb-2 font-sans text-[26px] leading-[120%] font-normal tracking-normal md:text-[32px]">
            {t('finalTesting.title')}
          </h5>
          <Image
            src="/assets/images/the-lab-advantage2.png"
            alt="the-lab-advantage"
            width={1064}
            height={525}
            className="h-full w-full object-cover md:h-[525px] md:w-[1064px]"
          />
          <div className="w-full">
            <div className="inline-flex flex-col items-center gap-0 md:flex-row md:gap-[145px]">
              <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                {t('finalTesting.description1')}
              </p>
              <p className="text-white-100 hidden font-sans text-[16px] leading-[140%] font-normal tracking-normal md:block">
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
            <p className="text-white-100 mt-6 block font-sans text-[16px] leading-[140%] font-normal tracking-normal md:hidden">
              {t('finalTesting.description2')}
            </p>
          </div>
        </div>
        <div className="mt-20 space-y-10">
          <h2
            className="w-full bg-clip-text pb-2 font-sans text-[50px] leading-[120%] font-normal tracking-normal text-transparent md:w-[90%] md:text-[70px]"
            style={{
              backgroundImage:
                'linear-gradient(270.64deg, #101820 2.05%, #0077C8 40.67%, #B2A9F5 72.15%, #DDDAE8 107%)',
            }}
          >
            {t('fromSeed.title')}
          </h2>
          <p className="text-white-100 w-full font-sans text-[16px] leading-[140%] font-normal tracking-normal md:w-1/2">
            {t('fromSeed.description')}
          </p>
        </div>
      </div>
      <div className="mx-auto w-full md:w-[1440px]">
        <Image
          src="/assets/images/the-lab-section-mask.svg"
          alt="section-mask"
          width={1440}
          height={195}
          className="h-full w-full"
        />
      </div>
      <div className="bg-white-100 container px-6 py-20 md:px-[188px] md:py-[180px] 2xl:px-[428px]">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          <div className="w-full space-y-4 md:w-[413px] md:space-y-6">
            <h5 className="text-umbra-40 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase md:text-[16px]">
              {t('ingredientsSection.label')}
            </h5>
            <h6 className="text-umbra-100 font-sans text-[26px] leading-[120%] font-normal tracking-normal md:text-[35px]">
              {t('ingredientsSection.title')}
            </h6>
            <div className="pt-6">
              <Link
                href={`/terpene-chart`}
                className="outline-button-white border-umbra-20 rounded-full border-1 px-6 py-2"
              >
                Explore Our Terpene Chart
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/assets/images/the-lab/ingredients.png"
              alt="section-mask"
              width={538}
              height={474}
              className="h-full w-full object-cover md:h-[474px] md:w-[538px]"
            />
          </div>
        </div>
      </div>
      <div className="bg-white-100 container md:px-[188px]">
        <div className="flex flex-col items-center justify-between gap-12">
          <div className="w-full space-y-4 text-center md:w-[848px] md:space-y-6">
            <h5 className="text-umbra-40 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase md:text-[16px]">
              {t('qualitySection.label')}
            </h5>
            <h6 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal tracking-normal md:text-[44px]">
              {t('qualitySection.title')}
            </h6>
            <p className="text-umbra-100 font-mono text-[20px] leading-[120%] font-normal tracking-normal">
              {t('qualitySection.description')}
            </p>
            <div className="pt-6 md:pt-0">
              <button className="main-button-black rounded-full px-6 py-2">{t('qualitySection.button')}</button>
            </div>
          </div>
          <div>
            <video
              src="/assets/videos/badge-animation.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              preload="auto"
            />
            {/* <Image
              src="/assets/images/the-lab-ingredient-footer.png"
              alt="section-mask"
              width={987}
              height={355}
              className="h-full w-full object-cover md:h-[355px] md:w-[987px]"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BehindTheProccess;
