import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ExperienceExtraordinary = () => {
  const t = useTranslations('Homepage');
  return (
    <>
      <div className="bg-umbra-100 container">
        <div className="px-[188px] pt-[100px]">
          <h2 className="bg-[linear-gradient(97.43deg,#101820_7.54%,#0077C8_45.72%,rgba(192,174,231,0.2)_83.43%,rgba(221,218,232,0)_100.19%)] bg-clip-text text-center text-[130px] leading-normal text-transparent">
            {t('Experience_Extraordinary')}
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/assets/images/extra-ordinary.png"
          width={1440}
          height={1230}
          className="h-[1230] w-[1440px] object-cover"
          alt="extra-odinary"
        />
      </div>
    </>
  );
};

export default ExperienceExtraordinary;
