import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const QualityPromise = () => {
  const t = useTranslations('Homepage');
  return (
    <div className="container">
      <div className="py-[80px]">
        <div className="relative z-0 flex min-h-[796px] items-center justify-center p-[80px]">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/assets/images/quality-promise/grid-texture.png"
              alt="Background"
              width={1280}
              height={796}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="flex items-center justify-between gap-[126px]">
            <img src="/assets/images/quality-promise/video.png" alt="quality" className="h-auto max-w-[100%]" />
            <div className="flex max-w-[600px] min-w-[520px] flex-col space-y-6">
              <h5 className="text-umbra-40 font-sans text-[16px] font-normal uppercase">{t('Our_Quality_Promise')}</h5>
              <h2 className="font-sans text-[44px] leading-[120%] font-normal">
                {t('The_Quality_Your_Business_Deserves')}
              </h2>
              <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal tracking-normal">
                {t(
                  'Quality_is_at_our_core_From_seed_to_bottle_we_meticulously_select_the_finest_ingredients_and_uphold_the_highest_standards_to_ensure_every_terpene_delivers_unmatched_consistency_purity_and_excellence',
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityPromise;
