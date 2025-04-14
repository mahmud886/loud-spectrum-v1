import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const FlavorThatSetsYouApart = () => {
  const t = useTranslations('FlavorThatSetsYouApart');
  return (
    <div className="container">
      <div className="px-[100px] py-[160px]">
        <div className="flex items-center justify-between gap-[100px]">
          <div className="flex min-w-[411px] flex-col space-y-12">
            <h5 className="text-umbra-100 pb-2 font-sans text-[44px] leading-[120%]">{t('title')}</h5>
            <div>
              <Link href={`/shop`} className="main-button-black rounded-full px-6 py-2">
                {t('button')}
              </Link>
            </div>
          </div>
          <div className="min-w-[552px]">
            <Image src="/assets/images/Flavor-That-Sets-You-Apart .png" width={553} height={540} alt={t('title')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorThatSetsYouApart;
