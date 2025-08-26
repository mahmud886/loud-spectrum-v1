import WhyChooseLoudSpectrum from '@/components/containers/wholesale/WhyChooseLoudSpectrum';
import { useTranslations } from 'next-intl';

const WholesaleRegistrationWorks = () => {
  const t = useTranslations('Wholesale.WholesaleRegistrationWorks');
  const points = [
    {
      number: t('Point_01_Number'),
      title: t('Point_01_Title'),
      description: t('Point_01_Description'),
    },
    {
      number: t('Point_02_Number'),
      title: t('Point_02_Title'),
      description: t('Point_02_Description'),
    },
    {
      number: t('Point_03_Number'),
      title: t('Point_03_Title'),
      description: t('Point_03_Description'),
    },
    {
      number: t('Point_04_Number'),
      title: t('Point_04_Title'),
      description: t('Point_04_Description'),
    },
    {
      number: t('Point_05_Number'),
      title: t('Point_05_Title'),
      description: t('Point_05_Description'),
    },
  ];
  return (
    <>
      <div className="mx-auto w-full xl:w-[1440px]">
        <img
          src="/assets/images/wholesale-registration-top-mask.png"
          width={1440}
          height={195}
          className="h-auto w-full xl:h-[195px] xl:w-[1440px]"
          alt="about-section-mask2.png"
        />
      </div>
      <div className="bg-stardust container">
        <div className="xl:p-[100px]">
          <h6 className="text-umbra-100 font-sans text-[32px] leading-[130%] font-normal xl:text-[35px]">
            {t('THowItWorks')}
          </h6>
          <div className="mt-[77px] flex flex-wrap justify-start gap-12">
            {points.map((point, index) => (
              <div key={index} className="flex w-full flex-col space-y-5 xl:w-[322px]">
                <h5 className="text-umbra-100 font-sans text-[26px] leading-[130%] font-normal xl:text-[35px]">
                  {point.number}
                </h5>
                <div className="border-umbra-40 border-1"></div>
                <h5 className="text-umbra-100 font-sans text-[18px] leading-[130%] font-normal xl:text-[22px]">
                  {point.title}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal">{point.description}</p>
              </div>
            ))}
          </div>
          <div>
            <WhyChooseLoudSpectrum />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full xl:w-[1440px]">
        <img
          src="/assets/images/wholesale-registration-bottom-mask.png"
          width={1440}
          height={195}
          className="h-full w-full xl:h-[195px] xl:w-[1440px]"
          alt="about-section-mask2.png"
        />
      </div>
    </>
  );
};

export default WholesaleRegistrationWorks;
