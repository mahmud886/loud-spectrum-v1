'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

const BillingAddress = () => {
  const t = useTranslations('CheckoutPage.ShippingAndBillingAddress');

  return (
    <form className="mx-auto w-full space-y-6">
      <h2 className="text-umbra-100 font-sans text-[24px] font-normal">{t('headingBilling')}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('firstNameLabel')}</label>
          <input
            type="text"
            placeholder={t('firstNamePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('lastNameLabel')}</label>
          <input
            type="text"
            placeholder={t('lastNamePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('emailLabel')}</label>
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('phoneLabel')}</label>
          <input
            type="tel"
            placeholder={t('phonePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('countryLabel')}</label>
          <Select required>
            <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
              <SelectValue placeholder={t('countryPlaceholder')} />
            </SelectTrigger>
            <SelectContent className="text-umbra-100 font-mono text-[16px]">
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="india">India</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Province */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('provinceLabel')}</label>
          <input
            type="text"
            placeholder={t('provincePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('cityLabel')}</label>
          <input
            type="text"
            placeholder={t('cityPlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('postalCodeLabel')}</label>
          <input
            type="text"
            placeholder={t('postalCodePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>
      </div>

      {/* Street Address */}
      <div>
        <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('streetAddressLabel')}</label>
        <Textarea
          rows={3}
          placeholder={t('streetAddressPlaceholder')}
          className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
          required
        />
      </div>
    </form>
  );
};

export default BillingAddress;
