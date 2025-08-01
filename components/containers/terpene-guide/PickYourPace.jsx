import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const PickYourPace = () => {
  const t = useTranslations('PickYourPace');

  return (
    <div className="container">
      <div className="py-[140px]">
        <div className="space-y-4 pb-10 md:space-y-10 md:pb-0">
          <h5 className="text-umbra-100 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase md:text-[16px]">
            {t('title')}
          </h5>
          <h6 className="w-full font-sans text-[44px] leading-[120%] font-normal tracking-normal md:w-1/2">
            {t('subtitle')}
          </h6>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
          <div className="group relative">
            <div className="overflow-hidden">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <Image
                  src="/assets/images/terpene-guide/active.jpg"
                  alt={t('activeAlt')}
                  width={414}
                  height={408}
                  className="block h-[408px] w-[414px] object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-[12%] w-full px-5 pb-5 md:top-[5%] md:right-[5%] md:bottom-auto md:w-auto md:px-0 md:pb-0">
              <Link href="/shop/Active" className="outline-button-black w-full rounded-full px-6 py-2 md:w-auto">
                {t('shopActive')}
              </Link>
            </div>
            <h2 className="text-umbra-100 mt-5 cursor-pointer font-sans text-[32px] leading-[120%]">{t('active')}</h2>
          </div>

          <div className="group relative">
            <div className="overflow-hidden">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <Image
                  src="/assets/images/terpene-guide/relaxed.jpg"
                  alt={t('relaxedAlt')}
                  width={414}
                  height={408}
                  className="block h-[408px] w-[414px] object-cover group-hover:scale-110"
                />
              </div>

              <div className="absolute bottom-[12%] w-full px-5 pb-5 md:top-[5%] md:right-[5%] md:bottom-auto md:w-auto md:px-0 md:pb-0">
                <Link href="/shop/Relax" className="outline-button-black w-full rounded-full px-6 py-2 md:w-auto">
                  {t('shopRelaxed')}
                </Link>
              </div>
            </div>
            <h2 className="text-umbra-100 mt-5 font-sans text-[32px] leading-[120%]">{t('relaxed')}</h2>
          </div>
          <div className="group relative">
            <div className="overflow-hidden">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <Image
                  src="/assets/images/terpene-guide/hybrid.jpg"
                  alt={t('hybridAlt')}
                  width={414}
                  height={408}
                  className="block h-[408px] w-[414px] object-cover group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-[12%] w-full px-5 pb-5 md:top-[5%] md:right-[5%] md:bottom-auto md:w-auto md:px-0 md:pb-0">
                <Link href="/shop/Hybrid" className="outline-button-black w-full rounded-full px-6 py-2 md:w-auto">
                  {t('shopHybrid')}
                </Link>
              </div>
            </div>
            <h2 className="text-umbra-100 mt-5 font-sans text-[32px] leading-[120%]">{t('hybrid')}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickYourPace;
