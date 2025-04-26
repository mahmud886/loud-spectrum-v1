import { useTranslations } from 'next-intl';

const WhatAreTerpenes = () => {
  const t = useTranslations('WhatAreTerpenes');

  return (
    <div className="container">
      <div className="py-20 md:py-[140px]">
        <div className="space-y-6 md:space-y-10">
          <h5 className="text-umbra-40 font-sans text-[16px] leading-[100%] font-normal tracking-normal uppercase">
            {t('heading')}
          </h5>
          <h6 className="font-sans text-[38px] leading-[130%] font-normal tracking-normal md:text-[55px]">
            {t('description')}
          </h6>
          <div className="inline-flex md:justify-end">
            <p className="text-umbra-100 w-full font-sans text-[20px] leading-[140%] font-normal tracking-normal md:w-[45%]">
              {t('subText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatAreTerpenes;
