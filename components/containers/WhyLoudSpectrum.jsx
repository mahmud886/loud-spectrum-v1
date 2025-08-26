import { useTranslations } from 'next-intl';
import Image from 'next/image';

const WhyLoudSpectrum = () => {
  const t = useTranslations('WhyLoudSpectrum');

  return (
    <div className="container">
      <div className="xl:py-[160px py-12 xl:px-[100px]">
        <div className="flex flex-col items-center justify-between gap-12 xl:flex-row xl:gap-[100px]">
          <div className="mx-auto w-full xl:min-w-[552px]">
            <Image
              src="/assets/images/why-loud-spectrum.png"
              width={553}
              height={540}
              alt="why-loud-spectrum"
              className="h-full w-full object-cover xl:h-[540px] xl:w-[553px]"
            />
          </div>
          <div className="flex min-w-[411px] flex-col space-y-4 px-5 xl:px-0">
            <h5 className="text-umbra-100 pb-2 font-sans text-[35px] leading-[120%] xl:text-[44px]">{t('Title')}</h5>
            <p className="font-mono text-[16px] leading-[140%] font-normal tracking-normal">{t('Paragraph1')}</p>
            <p className="font-mono text-[16px] leading-[140%] font-normal tracking-normal">{t('Paragraph2')}</p>
            <p className="font-mono text-[16px] leading-[140%] font-normal tracking-normal">{t('Paragraph3')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyLoudSpectrum;
