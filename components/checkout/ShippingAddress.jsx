'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { selectShippingAddress, updateShippingAddress } from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';

const ShippingAddress = () => {
  const t = useTranslations('CheckoutPage.ShippingAndBillingAddress');
  const dispatch = useDispatch();
  const shippingAddress = useSelector(selectShippingAddress);

  console.log(shippingAddress);

  const handleShippingAddressChange = (e) => {
    dispatch(
      updateShippingAddress({
        ...shippingAddress,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleSelectChange = (name, value) => {
    dispatch(
      updateShippingAddress({
        ...shippingAddress,
        [name]: value,
      }),
    );
  };

  return (
    <form className="mx-auto w-full space-y-6">
      <h2 className="text-umbra-100 font-sans text-[24px] font-normal">{t('headingShipping')}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="input-label">{t('firstNameLabel')}</label>
          <input
            type="text"
            name="firstName"
            value={shippingAddress?.firstName || ''}
            onChange={handleShippingAddressChange}
            placeholder={t('firstNamePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="input-label">{t('lastNameLabel')}</label>
          <input
            type="text"
            name="lastName"
            value={shippingAddress?.lastName || ''}
            onChange={handleShippingAddressChange}
            placeholder={t('lastNamePlaceholder')}
            className="input-field"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="input-label">{t('emailLabel')}</label>
          <input
            type="email"
            name="email"
            value={shippingAddress?.email || ''}
            onChange={handleShippingAddressChange}
            placeholder={t('emailPlaceholder')}
            className="input-field"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="input-label">{t('phoneLabel')}</label>
          <input
            type="tel"
            name="phone"
            value={shippingAddress?.phone || ''}
            onChange={handleShippingAddressChange}
            placeholder={t('phonePlaceholder')}
            className="input-field"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="input-label">{t('countryLabel')}</label>
          <Select
            value={shippingAddress?.country || ''}
            onValueChange={(value) => handleSelectChange('country', value)}
            required
          >
            <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
              <SelectValue placeholder={t('countryPlaceholder')} />
            </SelectTrigger>
            <SelectContent className="text-umbra-100 font-mono text-[16px]">
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="india">India</SelectItem>
              {/* Add more as needed */}
            </SelectContent>
          </Select>
        </div>

        {/* Province */}
        <div>
          <label className="input-label">{t('provinceLabel')}</label>
          <input
            type="text"
            name="province"
            value={shippingAddress?.province || ''}
            onChange={handleShippingAddressChange}
            placeholder={t('provincePlaceholder')}
            className="input-field"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="input-label">{t('cityLabel')}</label>
          <input
            type="text"
            name="city"
            value={shippingAddress?.city || ''}
            onChange={handleShippingAddressChange}
            placeholder={t('cityPlaceholder')}
            className="input-field"
            required
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="input-label">{t('postalCodeLabel')}</label>
          <input
            type="text"
            name="postalCode"
            value={shippingAddress?.postalCode || ''}
            onChange={handleShippingAddressChange}
            placeholder={t('postalCodePlaceholder')}
            className="input-field"
            required
          />
        </div>
      </div>

      {/* Street Address */}
      <div>
        <label className="input-label">{t('streetAddressLabel')}</label>
        <Textarea
          rows={3}
          name="streetAddress"
          value={shippingAddress?.streetAddress || ''}
          onChange={handleShippingAddressChange}
          placeholder={t('streetAddressPlaceholder')}
          className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
          required
        />
      </div>
    </form>
  );
};

export default ShippingAddress;
