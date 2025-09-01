import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const PickYourPace = () => {
  const t = useTranslations('PickYourPace');

  return (
    <div className="container">
      <div className="py-[140px]">
        <div className="space-y-4 pb-10 xl:space-y-10 xl:pb-0">
          <h5 className="text-umbra-100 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase xl:text-[16px]">
            {t('title')}
          </h5>
          <h6 className="w-full font-sans text-[44px] leading-[120%] font-normal tracking-normal xl:w-1/2">
            {t('subtitle')}
          </h6>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center gap-6 xl:flex-row">
          <div className="group relative">
            <div className="w-full overflow-hidden">
              <Image
                src="/assets/images/terpene-guide/active.jpg"
                alt={t('activeAlt')}
                width={414}
                height={408}
                className="block h-[450px] w-[450px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-[12%] w-full px-5 pb-5 xl:top-[5%] xl:right-[5%] xl:bottom-auto xl:w-auto xl:px-0 xl:pb-0">
              <Link
                href="/shop/active"
                className="outline-button-black inline-block w-full rounded-full px-6 py-2 text-center backdrop-blur-md transition-colors hover:bg-gray-700/80"
              >
                {t('shopActive')}
              </Link>
            </div>
            <h2 className="text-umbra-100 mt-5 cursor-pointer font-sans text-[32px] leading-[120%]">{t('active')}</h2>
          </div>

          <div className="group relative">
            <div className="overflow-hidden">
              <Image
                src="/assets/images/terpene-guide/relaxed.jpg"
                alt={t('relaxedAlt')}
                width={414}
                height={408}
                className="block h-[450px] w-[450px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-[12%] w-full px-5 pb-5 xl:top-[5%] xl:right-[5%] xl:bottom-auto xl:w-auto xl:px-0 xl:pb-0">
              <Link
                href="/shop/relax"
                className="outline-button-black inline-block w-full rounded-full px-6 py-2 text-center backdrop-blur-md transition-colors hover:bg-gray-700/80"
              >
                {t('shopRelaxed')}
              </Link>
            </div>
            <h2 className="text-umbra-100 mt-5 font-sans text-[32px] leading-[120%]">{t('relaxed')}</h2>
          </div>

          <div className="group relative">
            <div className="overflow-hidden">
              <Image
                src="/assets/images/terpene-guide/hybrid.jpg"
                alt={t('hybridAlt')}
                width={414}
                height={408}
                className="block h-[450px] w-[450px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-[12%] w-full px-5 pb-5 xl:top-[5%] xl:right-[5%] xl:bottom-auto xl:w-auto xl:px-0 xl:pb-0">
              <Link
                href="/shop/hybrid"
                className="outline-button-black inline-block w-full rounded-full px-6 py-2 text-center backdrop-blur-md transition-colors hover:bg-gray-700/80"
              >
                {t('shopHybrid')}
              </Link>
            </div>
            <h2 className="text-umbra-100 mt-5 font-sans text-[32px] leading-[120%]">{t('hybrid')}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickYourPace;
