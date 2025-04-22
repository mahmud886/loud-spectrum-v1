import { useTranslations } from 'next-intl';

const OrderASample = () => {
  const t = useTranslations('Homepage');

  return (
    <div className="container">
      <div className="pt-[100px] pb-[100px] md:p-[120px] md:pt-0 md:pb-0 lg:p-[120px] lg:pt-0 lg:pb-0">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row lg:md:flex-row">
          <div className="flex min-w-full flex-col space-y-10 md:min-w-1/2 lg:md:min-w-1/2">
            <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal md:text-[44px] lg:text-[44px]">
              {t('OrderASample_Title')}
            </h2>
            <div className="block w-full md:hidden lg:hidden">
              <img
                src="/assets/images/order-sample.png"
                alt="order-sample"
                width={522}
                height={474}
                className="w-[335px] object-cover md:h-[582px] md:w-[522px] lg:h-[373px] lg:w-[522px]"
              />
            </div>
            <div className="flex flex-col space-y-2.5">
              <div className="flex flex-col space-y-4">
                <h5 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal md:text-[28px] lg:text-[28px]">
                  {t('Step_01_Title')}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('Step_01_Description')}
                </p>
                <div className="border-1"></div>
              </div>
              <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-4">
                <h5 className="text-umbra-100 ttext-[22px] font-sans leading-[130%] font-normal md:text-[28px] lg:text-[28px]">
                  {t('Step_02_Title')}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('Step_02_Description')}
                </p>
                <div className="border-1"></div>
              </div>
              <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-4">
                <h5 className="text-umbra-100 ttext-[22px] lg:text-[28px font-sans leading-[130%] font-normal md:text-[28px]">
                  {t('Step_03_Title')}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('Step_03_Description')}
                </p>
                <div className="border-1"></div>
              </div>
            </div>
          </div>
          <div className="hidden w-full md:block md:min-w-1/2 lg:block lg:min-w-1/2">
            <img
              src="/assets/images/order-sample.png"
              alt="order-sample"
              width={522}
              height={474}
              className="w-[335px] object-cover md:h-[582px] md:w-[522px] lg:h-[373px] lg:w-[522px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderASample;
