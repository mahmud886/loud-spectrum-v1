import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const IngradientQualityPromise = () => {
  const t = useTranslations('TheLab');
  return (
    <>
      <div className="bg-white-100 container px-6 py-20 xl:px-[188px] xl:py-[180px]">
        <div className="flex flex-col items-center justify-between gap-12 xl:flex-row">
          <div className="w-full space-y-4 xl:w-[413px] xl:space-y-6">
            <h5 className="text-umbra-40 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase xl:text-[16px]">
              {t('ingredientsSection.label')}
            </h5>
            <h6 className="text-umbra-100 font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:text-[35px]">
              {t('ingredientsSection.title')}
            </h6>
            <div className="pt-6">
              <Link
                href={`/terpene-chart`}
                className="outline-button-white border-umbra-20 rounded-full border-1 px-6 py-2"
              >
                Explore Our Terpene Chart
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/assets/images/the-lab/ingredients.png"
              alt="section-mask"
              width={538}
              height={474}
              className="h-full w-full object-cover xl:h-[474px] xl:w-[538px]"
            />
          </div>
        </div>
      </div>
      <div className="bg-white-100 px-6 xl:px-[188px]">
        <div className="flex flex-col items-center justify-between gap-12">
          <div className="w-full space-y-4 text-center xl:w-[848px] xl:space-y-6">
            <h5 className="text-umbra-40 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase xl:text-[16px]">
              {t('qualitySection.label')}
            </h5>
            <h6 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal tracking-normal xl:text-[44px]">
              {t('qualitySection.title')}
            </h6>
            <p className="text-umbra-100 font-mono text-[20px] leading-[120%] font-normal tracking-normal">
              {t('qualitySection.description')}
            </p>
            <div className="pt-6 xl:pt-0">
              <button className="main-button-black rounded-full px-6 py-2">{t('qualitySection.button')}</button>
            </div>
          </div>
          <div>
            <video
              src="/assets/videos/badge-animation.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              preload="auto"
            />
            {/* <Image
              src="/assets/images/the-lab-ingredient-footer.png"
              alt="section-mask"
              width={987}
              height={355}
              className="h-full w-full object-cover xl:h-[355px] xl:w-[987px]"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default IngradientQualityPromise;
