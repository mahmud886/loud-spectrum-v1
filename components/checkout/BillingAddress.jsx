'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

        {/* Country */}
        <div>
          <label className="input-label">{t('countryLabel')}</label>
          <Select
            value={billingAddress?.country || ''}
            onValueChange={(value) => handleCountrySelectChange('country', value)}
            required
          >
            <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
              <SelectValue placeholder={t('countryPlaceholder')} />
            </SelectTrigger>
            <SelectContent className="text-umbra-100 font-mono text-[16px]">
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Province */}
        <div>
          <label className="input-label">{t('provinceLabel')}</label>
          {provinces?.length > 0 ? (
            <Select
              value={billingAddress?.province || ''}
              onValueChange={(value) => handleProvinceSelectChange('province', value)}
              required
            >
              <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
                <SelectValue placeholder={t('provincePlaceholder')} />
              </SelectTrigger>
              <SelectContent className="text-umbra-100 font-mono text-[16px]">
                {provinces.map((province) => (
                  <SelectItem key={province.value} value={province.value}>
                    {province.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <input
              type="text"
              name="province"
              value={billingAddress?.province || ''}
              onChange={handleBillingAddressChange}
              placeholder={t('provincePlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              required
            />
          )}
        </div>

        {/* City */}
        <div>
          <label className="input-label">{t('cityLabel')}</label>
          {cities?.length > 0 ? (
            <Select
              value={billingAddress?.city || ''}
              onValueChange={(value) => handleCitySelectChange('city', value)}
              required
            >
              <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
                <SelectValue placeholder={t('cityPlaceholder')} />
              </SelectTrigger>
              <SelectContent className="text-umbra-100 font-mono text-[16px]">
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
    </form>
  );
};

export default BillingAddress;
