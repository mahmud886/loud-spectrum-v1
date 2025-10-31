'use client';

import { ComboBox } from '@/components/ui/combobox';
import { Textarea } from '@/components/ui/textarea';
import { selectBillingAddress, updateBillingAddress } from '@/lib/store/slices/checkoutSlice';
import { getCities, getCountries, getStates } from '@/services/location-services';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const BillingAddress = () => {
  const t = useTranslations('CheckoutPage.ShippingAndBillingAddress');
  const billingAddress = useSelector(selectBillingAddress);
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(
          data.map((country) => ({
            value: country.iso2,
            label: country.name,
          })),
        );
      } catch (error) {
        toast.error('Failed to load countries');
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (!billingAddress.country) {
        setProvinces([]);
        return;
      }
      try {
        const data = await getStates(billingAddress.country);
        setProvinces(
          data.map((state) => ({
            value: state.iso2,
            label: state.name,
          })),
        );
      } catch (error) {
        toast.error('Failed to load states');
      }
    };
    fetchStates();
  }, [billingAddress.country]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!billingAddress.country || !billingAddress.province) {
        setCities([]);
        return;
      }
      try {
        const data = await getCities(billingAddress.country, billingAddress.province);
        setCities(
          data.map((city) => ({
            value: city.name,
            label: city.name,
          })),
        );
      } catch (error) {
        toast.error('Failed to load cities');
      }
    };
    fetchCities();
  }, [billingAddress.country, billingAddress.province]);

  const handleBillingAddressChange = (e) => {
    dispatch(updateBillingAddress({ ...billingAddress, [e.target.name]: e.target.value }));
  };

  const handleCountrySelectChange = (name, value) => {
    dispatch(updateBillingAddress({ ...billingAddress, [name]: value, province: '', city: '' }));
  };

  const handleProvinceSelectChange = (name, value) => {
    dispatch(updateBillingAddress({ ...billingAddress, [name]: value, city: '' }));
  };

  const handleCitySelectChange = (name, value) => {
    dispatch(updateBillingAddress({ ...billingAddress, [name]: value }));
  };

  return (
    <form className="mx-auto w-full space-y-6">
      <h2 className="text-umbra-100 font-sans text-[24px] font-normal">{t('headingBilling')}</h2>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="input-label">{t('firstNameLabel')}</label>
          <input
            type="text"
            name="firstName"
            value={billingAddress?.firstName || ''}
            onChange={handleBillingAddressChange}
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
            value={billingAddress?.lastName || ''}
            onChange={handleBillingAddressChange}
            placeholder={t('lastNamePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="input-label">{t('emailLabel')}</label>
          <input
            type="email"
            name="email"
            value={billingAddress?.email || ''}
            onChange={handleBillingAddressChange}
            placeholder={t('emailPlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="input-label">{t('phoneLabel')}</label>
          <input
            type="tel"
            name="phone"
            value={billingAddress?.phone || ''}
            onChange={handleBillingAddressChange}
            placeholder={t('phonePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
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
          value={billingAddress?.streetAddress || ''}
          onChange={handleBillingAddressChange}
          placeholder={t('streetAddressPlaceholder')}
          className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Country */}
        <div>
          <label className="input-label">{t('countryLabel')}</label>
          <ComboBox
            name="country"
            options={countries}
            value={billingAddress?.country || ''}
            onValueChange={(value) => handleCountrySelectChange('country', value)}
            placeholder={t('countryPlaceholder')}
            searchable={true}
            required={true}
          />
        </div>

        {/* Province */}
        <div>
          <label className="input-label">{t('stateLabel')}</label>
          {provinces?.length > 0 ? (
            <ComboBox
              name="province"
              options={provinces}
              value={billingAddress?.province || ''}
              onValueChange={(value) => handleProvinceSelectChange('province', value)}
              placeholder={t('statePlaceholder')}
              searchable={true}
              required={true}
            />
          ) : (
            <input
              type="text"
              name="province"
              value={billingAddress?.province || ''}
              onChange={handleBillingAddressChange}
              placeholder={t('statePlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              required
            />
          )}
        </div>

        {/* City */}
        <div>
          <label className="input-label">{t('cityLabel')}</label>
          {cities?.length > 0 ? (
            <ComboBox
              name="city"
              options={cities}
              value={billingAddress?.city || ''}
              onValueChange={(value) => handleCitySelectChange('city', value)}
              placeholder={t('cityPlaceholder')}
              searchable={true}
              required={true}
            />
          ) : (
            <input
              type="text"
              name="city"
              value={billingAddress?.city || ''}
              onChange={handleBillingAddressChange}
              placeholder={t('cityPlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              required
            />
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label className="input-label">{t('postalCodeLabel')}</label>
          <input
            type="text"
            name="postalCode"
            value={billingAddress?.postalCode || ''}
            onChange={handleBillingAddressChange}
            placeholder={t('postalCodePlaceholder')}
            className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            required
          />
        </div>
      </div>
    </form>
  );
};

export default BillingAddress;
