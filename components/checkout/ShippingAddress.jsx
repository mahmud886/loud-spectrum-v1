'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { updateShippingAddress } from '@/lib/store/slices/checkoutSlice';

const ShippingAddress = () => {
  const t = useTranslations('CheckoutPage.ShippingAndBillingAddress');
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.checkout.shippingAddress);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateShippingAddress({ [name]: value }));
  };

  const handleCountryChange = (value) => {
    dispatch(updateShippingAddress({ country: value }));
  };

  return (
    <form className="mx-auto w-full space-y-6">
      <h2 className="text-umbra-100 font-sans text-[24px] font-normal">{t('headingShipping')}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('firstNameLabel')}</label>
          <input
            type="text"
            name="firstName"
            value={shippingAddress.firstName}
            onChange={handleInputChange}
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
            name="lastName"
            value={shippingAddress.lastName}
            onChange={handleInputChange}
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
            name="email"
            value={shippingAddress.email}
            onChange={handleInputChange}
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
            name="phone"
            value={shippingAddress.phone}
            onChange={handleInputChange}
            placeholder={t('phonePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('countryLabel')}</label>
          <Select value={shippingAddress.country} onValueChange={handleCountryChange} required>
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

        {/* Province/State */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('provinceLabel')}</label>
          <input
            type="text"
            name="state"
            value={shippingAddress.state}
            onChange={handleInputChange}
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
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
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
            name="zipCode"
            value={shippingAddress.zipCode}
            onChange={handleInputChange}
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
          name="address"
          value={shippingAddress.address}
          onChange={handleInputChange}
          rows={3}
          placeholder={t('streetAddressPlaceholder')}
          className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
          required
        />
      </div>
    </form>
  );
};

export default ShippingAddress;
