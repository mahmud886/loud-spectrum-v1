import { useTranslations } from 'next-intl';
import Image from 'next/image';

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
        src="/assets/images/wholesale/why-loud-spectrum.png"
        alt="the-lab-advantage"
        width={462}
        height={474}
        className="hidden h-full w-full object-cover md:block md:h-[474px] md:w-[462px]"
      />

      <div className="w-full space-y-10 md:min-w-[462px]">
        <h5 className="text-umbra-100 pb-2 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
          {t('WhyChooseTitle')}
        </h5>
        <p className="text-umbra-100 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
          {t('WhyChooseSubtitle')}
        </p>

        <Image
          src="/assets/images/wholesale/why-loud-spectrum.png"
          alt="the-lab-advantage"
          width={462}
          height={474}
          className="block h-full w-full object-cover md:hidden md:h-[474px] md:w-[462px]"
        />

        <ul className="text-umbra-100 mb-10 font-mono text-[14px] leading-[130%] font-normal tracking-normal md:mb-0">
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
