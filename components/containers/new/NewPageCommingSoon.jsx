import React from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const NewPageCommingSoon = () => {
  const t = useTranslations('NewPage.commingSoon');
  return (
    <div className="container pb-[160px]">
      <div className="flex items-center justify-center">
        <div className="w-[65%] text-center">
          <h6 className="text-umbra-40 pb-5 font-sans text-[16px] leading-[100%] font-normal tracking-normal">
            {t('comingSoonLabel')}
          </h6>
          <h1 className="text-umbra-100 pb-5 font-sans text-[44px] leading-[120%] font-normal tracking-normal">
            {t('title')}
          </h1>
          <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal">{t('description')}</p>
          <div className="mt-12 inline-flex w-full justify-center gap-[15px]">
            <Link href={`/shop`} className="main-button-black cursor-grab rounded-full px-6 py-2">
              {t('button')}
            </Link>
          </div>
        </div>
      </div>
      <div className="px-20 pt-[140px]">
        <Image
          src="/assets/images/newpage-footer.png"
          alt="Background"
          width={1064}
          height={501}
          className="z-0 h-[501px] w-[1064px] object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default NewPageCommingSoon;
