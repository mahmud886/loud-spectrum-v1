'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@/i18n/navigation';
import { selectCurrentUser } from '@/lib/store/slices/authSlice';
import { selectShippingAddress, setDefaultAddresses, updateShippingAddress } from '@/lib/store/slices/checkoutSlice';
import { getOrderAddress } from '@/services/get-order-address';
import { getCities, getCountries, getStates } from '@/services/location-services';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

const ShippingAddress = () => {
  const t = useTranslations('CheckoutPage.ShippingAndBillingAddress');
  const dispatch = useDispatch();
  const shippingAddress = useSelector(selectShippingAddress);
  const currentUser = useSelector(selectCurrentUser);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openProvince, setOpenProvince] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [hasSetDefaultAddress, setHasSetDefaultAddress] = useState(false);
  const [hasSetDefaultCountry, setHasSetDefaultCountry] = useState(false);

  // Check for default addresses when component mounts or user changes
  useEffect(() => {
    const setDefaultAddressFromUser = () => {
      if (currentUser && currentUser.addresss && Array.isArray(currentUser.addresss) && !hasSetDefaultAddress) {
        const defaultAddress = currentUser.addresss.find((addr) => addr.is_default);
        if (defaultAddress) {
          dispatch(setDefaultAddresses({ defaultAddress }));
          setHasSetDefaultAddress(true);
        }
      }
    };

    setDefaultAddressFromUser();
  }, [currentUser, dispatch, hasSetDefaultAddress]);

  // Legacy fallback: Fetch addresses from API if not available in Redux user state
  useEffect(() => {
    const fetchOrderAddress = async () => {
      // Only fetch if we don't have addresses in user state and haven't set default yet
      if (currentUser && (!currentUser.addresss || !Array.isArray(currentUser.addresss)) && !hasSetDefaultAddress) {
        try {
          const data = await getOrderAddress();
          const address = data?.data?.addresss;
          const defaultAddress = address?.find((defaultAddress) => defaultAddress.is_default);
          if (defaultAddress) {
            dispatch(setDefaultAddresses({ defaultAddress }));
            setHasSetDefaultAddress(true);
          }
        } catch (error) {
          console.error('Error fetching default address:', error);
        }
      }
    };

    fetchOrderAddress();
  }, [currentUser, dispatch, hasSetDefaultAddress]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        const countryOptions = data.map((country) => ({
          value: country.iso2,
          label: country.name,
        }));
        setCountries(countryOptions);

        // Set United States as default if no country is selected and we haven't set it before
        if (!shippingAddress.country && !hasSetDefaultCountry) {
          const usCountry = countryOptions.find(
            (country) => country.value === 'US' || country.label === 'United States',
          );
          if (usCountry) {
            dispatch(
              updateShippingAddress({
                ...shippingAddress,
                country: usCountry.value,
              }),
            );
            setHasSetDefaultCountry(true);
          }
        }
      } catch (error) {
        toast.error('Failed to load countries');
      }
    };
    fetchCountries();
  }, [shippingAddress, dispatch, hasSetDefaultCountry]);

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
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-umbra-100 font-sans text-[24px] font-normal">{t('headingShipping')}</h2>
        <div className="flex items-center gap-2">
          <Link
            href="/account/address-book"
            className="text-umbra-100 flex items-center gap-2 font-mono text-[10px] font-normal hover:underline"
          >
            <span className="text-umbra-100 font-mono text-[10px] font-normal">
              {t('AddressesAreSavedInYourAccount')}
            </span>
            <ArrowRight className="h-4 w-4" />
            <Badge variant="outline" className="bg-umbra-5 text-umbra-100">
              {t('ManageAddresses')}
            </Badge>
          </Link>
        </div>
      </div>

      {/* Street Address */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
      </div>

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

      {/* City, Province, Postal Code, Country */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
          <label className="input-label">{t('stateLabel')}</label>
          {provinces?.length > 0 ? (
            <Select
              value={shippingAddress?.province || ''}
              onValueChange={(value) => handleProvinceSelectChange('province', value)}
              required
            >
              <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
                <SelectValue placeholder={t('statePlaceholder')} />
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
              placeholder={t('statePlaceholder')}
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
    </form>
  );
};

export default ShippingAddress;
