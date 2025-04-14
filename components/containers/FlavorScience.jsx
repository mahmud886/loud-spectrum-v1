import React from 'react';
import { useTranslations } from 'next-intl';

const FlavorScience = () => {
  const t = useTranslations('FlavorScience');
  return (
    <div className="container">
      <div className="px-[200px] pt-[100px] pb-[80px]">
        <div className="flex flex-col items-center justify-center space-y-12">
          <h5 className="text-umbra-100 text-center font-sans text-[35px] leading-[135%] font-normal">
            {' '}
            {t.rich('Title', {
              strong: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </h5>
          <div>
            <button className="main-button-black rounded-full p-2 px-6">{t('Button')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorScience;
