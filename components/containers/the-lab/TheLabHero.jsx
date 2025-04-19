import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const TheLabHero = () => {
  const t = useTranslations('TheLab');
  return (
    <div className="container mt-[200px]">
      <div className="mb-6 flex items-center justify-center text-center">
        <h2 className="text-umbra-100 w-1/2 font-sans text-[60px] leading-[120%] font-normal">{t('heading')}</h2>
      </div>
      <div className="space-y-20 py-16">
        <div className="relative h-[631px] overflow-hidden bg-white">
          {/* Background Image */}
          <Image
            src="/assets/images/the-lab.png"
            alt="Background"
            width={1280}
            height={631}
            className="absolute top-0 left-1/2 z-0 h-full w-[1280px] -translate-x-1/2 object-cover"
            priority
          />
        </div>
        <div className="flex items-center justify-center pt-[100px]">
          <div className="flex min-w-[80%] items-start justify-center gap-20">
            <div className="w-[474px]">
              <h2 className="text-umbra-100 font-sans text-[44px] leading-[120%] font-normal">{t('subheading')}</h2>
            </div>
            <div className="w-[474px]">
              <div className="space-y-6">
                <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal tracking-normal">
                  {t('description1')}
                </p>
                <p className="text-umbra-100 font-mono text-[14px] leading-[140%] font-normal tracking-normal">
                  {t('description2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheLabHero;
