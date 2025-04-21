'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

const WholesaleRegistrationForm = () => {
  const t = useTranslations('Wholesale');

  return (
    <div className="container py-[80px]">
      <div className="px-6 md:px-0">
        <div className="space-y-12">
          <h2 className="text-umbra-100 font-sans text-[44px] leading-[120%] font-normal">
            {t('wholesaleRegistrationForm.formTitle')}
          </h2>

          <form className="space-y-4">
            <p className="text-umbra-100 mb-6 font-sans text-[16px] leading-[140%] font-normal">
              {t('wholesaleRegistrationForm.requiredFields')}
            </p>

            <div className="flex justify-between gap-4">
              <Input
                type="text"
                placeholder={t('wholesaleRegistrationForm.fullName')}
                className="text-umbra-100 placeholder:text-umbra-100 bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
              <Input
                type="text"
                placeholder={t('wholesaleRegistrationForm.company')}
                className="text-umbra-100 placeholder:text-umbra-100 bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>

            <div className="flex justify-between gap-4">
              <Input
                type="phone"
                placeholder={t('wholesaleRegistrationForm.phone')}
                className="text-umbra-100 placeholder:text-umbra-100 bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
              <Input
                type="email"
                placeholder={t('wholesaleRegistrationForm.email')}
                className="text-umbra-100 placeholder:text-umbra-100 bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>

            <div className="flex justify-between gap-4">
              <Input
                type="text"
                placeholder={t('wholesaleRegistrationForm.website')}
                className="text-umbra-100 placeholder:text-umbra-100 bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
              <Input
                type="text"
                placeholder={t('wholesaleRegistrationForm.country')}
                className="text-umbra-100 placeholder:text-umbra-100 bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>

            <div className="flex justify-between gap-4">
              <Input
                type="text"
                placeholder={t('wholesaleRegistrationForm.username')}
                className="text-umbra-100 placeholder:text-umbra-100 bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
              <Input
                type="password"
                placeholder={t('wholesaleRegistrationForm.password')}
                className="text-umbra-100 placeholder:text-umbra-100 bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>

            <div className="mt-12">
              <button type="submit" className="main-button-black rounded-full border-1 px-6 py-2">
                {t('wholesaleRegistrationForm.registerButton')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WholesaleRegistrationForm;
