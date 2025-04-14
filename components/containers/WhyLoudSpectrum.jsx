import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const WhyLoudSpectrum = () => {
  const t = useTranslations('WhyLoudSpectrum');

  return (
    <div className="container">
      <div className="px-[100px] py-[160px]">
        <div className="flex items-center justify-between gap-[100px]">
          <div className="min-w-[552px]">
            <Image src="/assets/images/why-loud-spectrum.png" width={553} height={540} alt="why-loud-spectrum" />
          </div>
          <div className="flex min-w-[411px] flex-col space-y-4">
            <h5 className="text-umbra-100 pb-2 font-sans text-[44px] leading-[120%]">{t('Title')}</h5>
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
