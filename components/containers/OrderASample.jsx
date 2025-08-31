import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const OrderASample = () => {
  const t = useTranslations('Homepage');

  return (
    <div className="container">
      <div className="py-20 lg:px-[120px] xl:py-[120px]">
        <div className="flex flex-col items-center justify-between gap-5 xl:flex-row lg:xl:flex-row">
          <div className="flex min-w-full flex-col space-y-10 xl:min-w-1/2 lg:xl:min-w-1/2">
            <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal lg:text-[44px] xl:text-[44px]">
              {t('OrderASample_Title')}
            </h2>
            <div className="block w-full lg:hidden xl:hidden">
              <img
                src="/assets/images/order-sample-stack.png"
                alt="order-sample"
                width={522}
                height={582}
                className="w-full object-cover xl:h-[582px] xl:w-[522px]"
              />
            </div>
            <div className="flex flex-col space-y-2.5">
              <div className="flex flex-col space-y-4">
                <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal lg:text-[28px] xl:text-[28px]">
                  {t('Step_01_Title')}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('Step_01_Description')}
                </p>
                <div className="border-1"></div>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-4 xl:space-y-4">
                <h5 className="text-umbra-100 ttext-[22px] font-sans leading-[130%] font-normal lg:text-[28px] xl:text-[28px]">
                  {t('Step_02_Title')}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('Step_02_Description')}
                </p>
                <div className="border-1"></div>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-4 xl:space-y-4">
                <h5 className="text-umbra-100 ttext-[22px] lg:text-[28px font-sans leading-[130%] font-normal xl:text-[28px]">
                  {t('Step_03_Title')}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('Step_03_Description')}
                </p>
                <div className="border-1"></div>
              </div>
              <div className="mt-10">
                <Link href={`/try-sample-pack`} className="main-button-black rounded-full px-6 py-2">
                  Try a Sample Pack
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden w-full lg:block lg:min-w-1/2 xl:block xl:min-w-1/2">
            <img
              src="/assets/images/order-sample-stack.png"
              alt="order-sample"
              width={522}
              height={582}
              className="h-[582px] w-[522px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderASample;
