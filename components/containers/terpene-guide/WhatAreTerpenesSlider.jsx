import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const WhatAreTerpenesSlider = () => {
  const t = useTranslations('WhatAreTerpenesSlider.classic');

  return (
    <div className="container">
      <div className="pb-[200px]">
        <section className="from-classic relative w-full bg-gradient-to-b to-black text-white">
          <div className="min-h-[644px] p-10">
            <div className="flex min-h-[564px] max-w-[550px] flex-col justify-between">
              <div className="flex flex-col space-y-10">
                <p className="text-white-100 font-mono text-[20px] leading-[140%] font-normal">{t('description')}</p>
                <div>
                  <p className="text-white-100 mb-2 font-mono text-[20px] leading-[140%] font-normal">
                    {t('quickFacts')}
                  </p>
                  <ul className="text-white-40 space-y-1 font-mono text-[16px] leading-[140%] font-normal">
                    {t.raw('facts').map((fact, index) => (
                      <li key={index}>{fact}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <Link href="/shop" className="outline-button-black mt-4 inline-block rounded-full px-6 py-2">
                  {t('shop')}
                </Link>
              </div>
            </div>

            <p className="absolute right-0 bottom-[18%] origin-bottom rotate-270 text-5xl text-white">{t('label')}</p>
            <div className="absolute right-[15%] bottom-[-25%]">
              <Image
                src="/assets/images/Alive_Bottle_Simple_BG copiar 3.png"
                alt={t('label')}
                width={525}
                height={656}
                className="h-[656px] w-[525px] object-contain"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhatAreTerpenesSlider;
