import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LoginRegister from '@/components/auth';

const LoginPage = () => {
  const t = useTranslations('ContactPage');
  return (
    <div className="text-umbra-100 flex w-full items-center justify-center">
      <div className="bg-white py-24 md:py-40">
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="aspect-w-2 aspect-h-3 md:aspect-w-3 md:aspect-h-2">
            <div className="overflow-hidden">
              <Image
                src="/assets/images/contact-image.png"
                alt="contact-image"
                className="h-[850px] w-[600px] object-cover"
                width={600}
                height={850}
              />
            </div>
          </div>

          <div className="mt-4 min-h-[850px] md:mt-0 md:px-0">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal md:text-[44px]">
                  Welcome To Loud Spectrum
                </h2>
                <p className="text-umbra-100 font-sans text-[16px] leading-[140%] font-normal">
                  {t('contactForm.description')}
                </p>
              </div>
              <LoginRegister />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
