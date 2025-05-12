'use client';

import { Link } from '@/i18n/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

const Register = () => {
  const t = useTranslations('LoginPage.Registration');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <div className="mt-10 max-w-full">
      <form className="space-y-6">
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('fullNameLabel')}</label>
            <input
              type="text"
              placeholder={t('fullNamePlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              required
            />
          </div>
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('phoneLabel')}</label>
            <input
              type="tel"
              placeholder={t('phonePlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              required
            />
          </div>
        </div>

        {/* Email & Company */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('emailLabel')}</label>
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              required
            />
          </div>
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('companyLabel')}</label>
            <input
              type="text"
              placeholder={t('companyPlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('websiteLabel')}</label>
          <input
            type="url"
            placeholder={t('websitePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
          />
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('passwordLabel')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 pr-10 font-mono text-[16px] leading-[140%] font-normal"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
              {t('confirmPasswordLabel')}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('confirmPasswordPlaceholder')}
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 pr-10 font-mono text-[16px] leading-[140%] font-normal"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                aria-label={t('toggleConfirmPassword')}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox id="terms" checked={agree} onCheckedChange={(checked) => setAgree(!!checked)} required />
          <label htmlFor="terms" className="text-umbra-100 font-sans text-[14px] leading-[140%]">
            {t('agreeTerms')}
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="main-button-black w-full rounded-full border border-black bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            {t('registerButton')}
          </button>
          <Link
            href="/wholesaler-registration"
            type="button"
            className="main-button-white hover:bg-umbra-10 inline-flex w-full items-center justify-center rounded-full border border-black bg-transparent px-6 py-3 text-black transition"
          >
            {t('wholesalerButton')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
