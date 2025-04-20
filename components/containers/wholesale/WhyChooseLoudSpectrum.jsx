import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const WhyChooseLoudSpectrum = () => {
  const t = useTranslations('Wholesale.WhyChooseLoudSpectrum');

  const featureKeys = [
    'FarmToBottle',
    'ExclusiveFlavors',
    'NaturalFoodGrade',
    'Turnaround24Hour',
    'BotanicalFlower',
    'DerivedTerpenes',
    'TerpeneIsolates',
    'MadeInUSA',
  ];

  return (
    <div className="flex flex-col items-center justify-between gap-10 pt-20 lg:flex-row">
      <Image
        src="/assets/images/the-lab-advantage.png"
        alt="the-lab-advantage"
        width={462}
        height={474}
        className="h-[474px] w-[462px] object-cover"
      />

      <div className="min-w-[462px] space-y-10">
        <h5 className="text-umbra-100 pb-2 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
          {t('WhyChooseTitle')}
        </h5>
        <p className="text-umbra-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
          {t('WhyChooseSubtitle')}
        </p>

        <ul className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal tracking-normal">
          {featureKeys.map((key, index) => (
            <li key={key} className={`border-umbra-40 ${index === 0 ? 'border-t' : ''} border-b py-2.5`}>
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhyChooseLoudSpectrum;
