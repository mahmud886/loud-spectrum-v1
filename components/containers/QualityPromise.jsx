import { useTranslations } from 'next-intl';
import Image from 'next/image';

const QualityPromise = () => {
  const t = useTranslations('Homepage');
  return (
    <div className="container">
      <div className="py-[80px]">
        <div className="relative z-0 flex min-h-[796px] items-center justify-center px-5 py-20 md:p-[80px] lg:p-[80px]">
          <div className="bg-stardust absolute inset-0 -z-10">
            <div className="absolute top-[-2px] left-0 z-20">
              <Image
                src="/assets/images/home-quality-top-mask.png"
                alt="Wave"
                width={1280}
                height={84}
                className="h-[25px] w-[375px] object-cover md:h-[84px] md:w-[1280px] lg:h-[84px] lg:w-[1280px]"
              />
            </div>
            <Image
              src="/assets/images/quality-promise-grid.png"
              alt="Background"
              width={1280}
              height={796}
              className="h-full w-[375px] object-cover md:w-[1280px] lg:w-[1280px]"
              priority
            />
          </div>
          <div className="absolute bottom-[-2px] left-0 z-20">
            <Image
              src="/assets/images/home-quality-bottom-mask.png"
              alt="Wave"
              width={1280}
              height={84}
              className="h-[25px] w-[375px] object-cover md:h-[84px] md:w-[1280px] lg:h-[84px] lg:w-[1280px]"
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-20 md:flex-row md:gap-[126px] lg:flex-row lg:gap-[126px]">
            <Image
              unoptimized={true}
              src="/assets/videos/our-quality-promise.gif"
              alt="quality"
              width={578}
              height={502}
              className="h-full w-full object-cover md:h-[359px] md:w-[414px] md:scale-125 lg:h-[359px] lg:w-[414px]"
            />
            <div className="flex max-w-full min-w-full flex-col space-y-6 md:max-w-[600px] md:min-w-[520px] lg:max-w-[600px] lg:min-w-[520px]">
              <h5 className="text-umbra-40 font-sans text-[16px] font-normal uppercase">{t('Our_Quality_Promise')}</h5>
              <h2 className="font-sans text-[32px] leading-[120%] font-normal md:text-[44px] lg:text-[44px]">
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
