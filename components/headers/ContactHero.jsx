import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ContactHero = () => {
  const t = useTranslations('ContactPage');
  return (
    <div>
      <div className="bg-umbra-100 h-[786px] overflow-hidden">
        <div className="z-10 container mt-[200px] w-full overflow-hidden">
          <div className="flex min-h-[580px] flex-col justify-between">
            <div className="w-[540px]">
              <h1 className="pb-5 font-sans text-[60px] leading-[120%] font-normal tracking-normal text-white">
                {t('contactHero.title')}
              </h1>
              <p className="font-mono text-[20px] leading-[140%] font-normal text-white">
                {t('contactHero.description')}
              </p>
            </div>

            <div className="w-full">
              <div className="mb-12 flex w-full items-end gap-4">
                <div className="flex flex-col space-y-2">
                  <span className="text-white-40 ml-4 font-mono text-[16px] leading-[140%] font-normal">
                    {t('contactHero.tollFreeLabel')}
                  </span>
                  <button className="outline-button-black rounded-full px-6 py-2 text-white">
                    866-51-83777 (TERPS)
                  </button>
                </div>

                <div className="flex flex-col space-y-2">
                  <span className="text-white-40 ml-4 font-mono text-[16px] leading-[140%] font-normal">
                    {t('contactHero.textCallLabel')}
                  </span>
                  <button className="outline-button-black rounded-full px-6 py-2 text-white">714-905-9681</button>
                </div>

                <div className="flex flex-col space-y-2">
                  <span className="text-white-40 ml-4 font-mono text-[16px] leading-[140%] font-normal">
                    {t('contactHero.emailLabel')}
                  </span>
                  <button className="outline-button-black rounded-full px-6 py-2 text-white">
                    info@medicalterpenes.com
                  </button>
                </div>

                <div className="text-white-40 ml-auto font-mono text-[16px] leading-[140%] font-normal">
                  {t('contactHero.hours')}
                </div>
              </div>
              <div className="border-white-20 border-t pt-12">
                <div className="flex flex-col">
                  <span className="text-white-40 font-mono text-[16px] leading-[140%] font-normal">
                    {t('contactHero.addressLabel')}
                  </span>
                  <p className="font-mono text-[16px] leading-[140%] font-normal text-white">
                    {t('contactHero.address1')}
                    <br />
                    {t('contactHero.address2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-[1440px]">
        <Image
          src="/assets/images/contact-section-mask.png"
          alt="Shop Hero"
          width={1440}
          height={195}
          className="bg-umbra-100 w-full object-cover"
        />
      </div>
    </div>
  );
};

export default ContactHero;
