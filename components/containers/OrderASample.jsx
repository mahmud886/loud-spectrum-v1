import { useTranslations } from 'next-intl';

const OrderASample = () => {
  const t = useTranslations('Homepage');

  return (
    <div className="container">
      <div className="p-[120px]">
        <div className="flex items-center justify-between gap-5">
          <div className="flex min-w-1/2 flex-col space-y-10">
            <h2 className="text-umbra-100 font-sans text-[44px] leading-[120%] font-normal">
              {t('OrderASample_Title')}
            </h2>
            <div className="flex flex-col space-y-2.5">
              <div className="flex flex-col space-y-4">
                <h5 className="text-umbra-100 font-sans text-[28px] leading-[130%] font-normal">
                  {t('Step_01_Title')}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('Step_01_Description')}
                </p>
                <div className="border-1"></div>
              </div>
              <div className="flex flex-col space-y-4">
                <h5 className="text-umbra-100 font-sans text-[28px] leading-[130%] font-normal">
                  {t('Step_02_Title')}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('Step_02_Description')}
                </p>
                <div className="border-1"></div>
              </div>
              <div className="flex flex-col space-y-4">
                <h5 className="text-umbra-100 font-sans text-[28px] leading-[130%] font-normal">
                  {t('Step_03_Title')}
                </h5>
                <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  {t('Step_03_Description')}
                </p>
                <div className="border-1"></div>
              </div>
            </div>
          </div>
          <div className="min-w-1/2">
            <img
              src="/assets/images/order-sample.png"
              alt="order-sample"
              width={522}
              height={474}
              className="h-[582px] w-[522px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderASample;
