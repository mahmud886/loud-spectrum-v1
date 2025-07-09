'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { selectShippingAddress, updateShippingAddress } from '@/lib/store/slices/checkoutSlice';
import { getOrderAddress } from '@/services/get-order-address';
import { getCities, getCountries, getStates } from '@/services/location-services';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const ShippingAddress = () => {
  const t = useTranslations('CheckoutPage.ShippingAndBillingAddress');
  const dispatch = useDispatch();
  const shippingAddress = useSelector(selectShippingAddress);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openProvince, setOpenProvince] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [isCustomCity, setIsCustomCity] = useState(false);

  useEffect(() => {
    const fetchOrderAddress = async () => {
      const data = await getOrderAddress();
      const address = data?.data?.addresss;
      const defaultAddress = address?.find((defaultAddress) => defaultAddress.is_default);
      if (defaultAddress) {
        dispatch(
          updateShippingAddress({
            firstName: defaultAddress.first_name,
            lastName: defaultAddress.last_name,
            email: defaultAddress.email,
            phone: defaultAddress.phone,
            country: defaultAddress.country,
            province: defaultAddress.state,
            city: defaultAddress.city,
            postalCode: defaultAddress.postal_code,
            streetAddress: defaultAddress.street_address,
          }),
        );
      }
    };
    fetchOrderAddress();
  }, []);

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
      if (!shippingAddress.country) {
        setProvinces([]);
        return;
      }
      try {
        const data = await getStates(shippingAddress.country);
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
  }, [shippingAddress.country]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!shippingAddress.country || !shippingAddress.province) {
        setCities([]);
        return;
      }
      try {
        const data = await getCities(shippingAddress.country, shippingAddress.province);
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
  }, [shippingAddress.country, shippingAddress.province]);

  const handleShippingAddressChange = (e) => {
    dispatch(
      updateShippingAddress({
        ...shippingAddress,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleCountrySelectChange = (name, value) => {
    dispatch(
      updateShippingAddress({
        ...shippingAddress,
        [name]: value,
      }),
    );
  };

  const handleProvinceSelectChange = (name, value) => {
    dispatch(
      updateShippingAddress({
        ...shippingAddress,
        [name]: value,
      }),
    );
    setOpenCity(false);
    setIsCustomCity(false);
  };

  const handleCitySelectChange = (name, value) => {
    dispatch(
      updateShippingAddress({
        ...shippingAddress,
        [name]: value,
      }),
    );
    setOpenCity(false);
    setIsCustomCity(false);
  };

  const handleCustomCityInputChange = (name, value) => {
    dispatch({
      ...shippingAddress,
      [name]: value,
    });
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
              value={shippingAddress?.province || ''}
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
              value={shippingAddress?.province || ''}
              onChange={handleShippingAddressChange}
              placeholder={t('provincePlaceholder')}
              className="input-field"
              required
            />
          )}
        </div>

        {/* City */}
        <div>
          <label className="input-label">{t('cityLabel')}</label>
          {cities?.length > 0 ? (
            <Select
              value={shippingAddress?.city || ''}
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
              value={shippingAddress?.city || ''}
              onChange={handleShippingAddressChange}
              placeholder={t('cityPlaceholder')}
              className="input-field"
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
