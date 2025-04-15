import React from 'react';
import { useTranslations } from 'next-intl';

const WhatAreTerpenes = () => {
  const t = useTranslations('WhatAreTerpenes');

  return (
    <div className="container">
      <div className="py-[140px]">
        <div className="space-y-10">
          <h5 className="text-umbra-100 font-sans text-[16px] leading-[100%] font-normal tracking-normal uppercase">
            {t('heading')}
          </h5>
          <h6 className="font-sans text-[55px] leading-[130%] font-normal tracking-normal">{t('description')}</h6>
          <div className="inline-flex justify-end">
            <p className="text-umbra-100 w-[45%] font-sans text-[20px] leading-[140%] font-normal tracking-normal">
              {t('subText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatAreTerpenes;
