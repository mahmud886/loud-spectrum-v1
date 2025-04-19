import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const BehindTheProccess = () => {
  const t = useTranslations('TheLab');
  return (
    <div className="bg-umbra-100 container px-[188px] py-20">
      <div className="space-y-6">
        <h5 className="text-white-40 font-sans text-[16px] leading-[100%] font-normal tracking-normal uppercase">
          {t('behindTheProcess.title')}
        </h5>
        <h6 className="text-white-100 w-1/2 font-sans text-[44px] leading-[120%] font-normal tracking-normal">
          {t('behindTheProcess.subtitle')}
        </h6>
      </div>
      <div className="flex items-center justify-between gap-[145px] py-20">
        <Image
          src="/assets/images/the-lab-advantage.png"
          alt="the-lab-advantage"
          width={522}
          height={474}
          className="h-[474px] w-[522px] object-cover"
        />
        <div className="max-w-[397px] space-y-10">
          <h5 className="text-white-100 pb-2 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
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

      <div className="flex items-center justify-between gap-[145px] py-20">
        <div className="max-w-[397px] space-y-10">
          <h5 className="text-white-100 pb-2 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
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
          src="/assets/images/the-lab-advantage.png"
          alt="the-lab-advantage"
          width={522}
          height={474}
          className="h-[474px] w-[522px] object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-[145px] py-20">
        <Image
          src="/assets/images/the-lab-advantage.png"
          alt="the-lab-advantage"
          width={522}
          height={474}
          className="h-[474px] w-[522px] object-cover"
        />
        <div className="max-w-[397px] space-y-10">
          <h5 className="text-white-100 pb-2 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
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
      <div className="space-y-10 py-20">
        <h5 className="text-white-100 pb-2 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
          {t('finalTesting.title')}
        </h5>
        <Image
          src="/assets/images/the-lab-advantage2.png"
          alt="the-lab-advantage"
          width={1064}
          height={525}
          className="h-[525px] w-[1064px] object-cover"
        />
        <div className="w-full">
          <div className="inline-flex items-center gap-[145px]">
            <p className="text-white-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
              {t('finalTesting.description1')}
            </p>
            <p className="text-white-100 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
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
        </div>
      </div>

      <div className="mt-20 space-y-10">
        <h2
          className="w-[90%] bg-clip-text pb-2 font-sans text-[70px] leading-[120%] font-normal tracking-normal text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(270.64deg, #101820 17.05%, #0077C8 40.67%, #B2A9F5 72.15%, #DDDAE8 107.01%)',
          }}
        >
          {t('fromSeed.title')}
        </h2>
        <p className="text-white-100 w-1/2 font-sans text-[16px] leading-[140%] font-normal tracking-normal">
          {t('fromSeed.description')}
        </p>
      </div>
    </div>
  );
};

export default BehindTheProccess;
