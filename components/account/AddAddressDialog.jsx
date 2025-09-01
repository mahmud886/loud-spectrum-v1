'use client';

import { addNewAddress, getAddresses, updateAddress } from '@/app/actions/user-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getCities, getCountries, getStates } from '@/services/location-services';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AddAddressDialog({ onSave, editMode = false, editAddress = null, trigger = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressData, setAddressData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    province: '',
    country: '',
    post_code: '',
    street_address: '',
    is_default: false,
  });
  const t = useTranslations('UserAddressBook');

  // Load countries on component mount
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
        toast.error(t('failedToLoadCountries'));
      }
    };
    fetchCountries();
  }, []);

  // Load provinces when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!addressData.country) {
        setProvinces([]);
        return;
      }
      try {
        const data = await getStates(addressData.country);
        setProvinces(
          data.map((state) => ({
            value: state.iso2,
            label: state.name,
          })),
        );
      } catch (error) {
        toast.error(t('failedToLoadProvinces'));
      }
    };
    fetchStates();
  }, [addressData.country]);

  // Load cities when province changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!addressData.country || !addressData.province) {
        setCities([]);
        return;
      }
      try {
        const data = await getCities(addressData.country, addressData.province);
        setCities(
          data.map((city) => ({
            value: city.name,
            label: city.name,
          })),
        );
      } catch (error) {
        toast.error(t('failedToLoadCities'));
      }
    };
    fetchCities();
  }, [addressData.country, addressData.province]);

  // Populate form when editing
  useEffect(() => {
    if (editMode && editAddress) {
      setAddressData({
        first_name: editAddress.first_name || '',
        last_name: editAddress.last_name || '',
        email: editAddress.email || '',
        phone: editAddress.phone || '',
        city: editAddress.city || '',
        province: editAddress.province || '',
        country: editAddress.country || '',
        post_code: editAddress.post_code || '',
        street_address: editAddress.street_address || '',
        is_default: editAddress.is_default || false,
      });
    } else {
      // Reset form for add mode
      setAddressData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        city: '',
        province: '',
        country: '',
        post_code: '',
        street_address: '',
        is_default: false,
      });
    }
  }, [editMode, editAddress, isOpen]);

  const handleInputChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setAddressData((prev) => {
      const newData = { ...prev, [name]: value };

      // Reset dependent fields when parent field changes
      if (name === 'country') {
        newData.province = '';
        newData.city = '';
      } else if (name === 'province') {
        newData.city = '';
      }

      return newData;
    });
  };

  const handleCheckboxChange = (checked) => {
    setAddressData({ ...addressData, is_default: checked });
  };

  const resetForm = () => {
    setAddressData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      city: '',
      province: '',
      country: '',
      post_code: '',
      street_address: '',
      is_default: false,
    });
  };

  const handleDefaultAddressLogic = async (addressId) => {
    try {
      // Get all current addresses
      const result = await getAddresses();
      if (!result.error) {
        const allAddresses = result.data?.addresss || [];

        // Find addresses that are currently default (excluding the one we're updating)
        const currentDefaultAddresses = allAddresses.filter((addr) => addr._id !== addressId && addr.is_default);

        // Update all current default addresses to not be default
        for (const addr of currentDefaultAddresses) {
          await updateAddress(addr._id, { is_default: false });
        }
      }
    } catch (error) {
      console.error('Error handling default address logic:', error);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let result;

      // If setting as default, handle removing default from other addresses first
      if (addressData.is_default) {
        if (editMode && editAddress) {
          await handleDefaultAddressLogic(editAddress._id);
        } else {
          // For new addresses, remove default from all existing addresses
          await handleDefaultAddressLogic(null);
        }
      }

      if (editMode && editAddress) {
        // Update existing address
        result = await updateAddress(editAddress._id, addressData);
      } else {
        // Add new address
        result = await addNewAddress(addressData);
      }

      if (result.success) {
        toast.success(editMode ? t('addressUpdatedSuccessfully') : t('addressAddedSuccessfully'));
        onSave(result.data);
        setIsOpen(false);
        if (!editMode) {
          resetForm();
        }
      } else {
        toast.error(result.message || (editMode ? t('failedToUpdateAddress') : t('failedToAddAddress')));
      }
    } catch (error) {
      toast.error(t(`anErrorOccurredWhile${editMode ? 'updating' : 'adding'}TheAddress`));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (!editMode) {
      resetForm();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      {trigger ? (
        <div onClick={() => setIsOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="main-button-black rounded-[10px] px-6 py-2">
          {editMode ? t('editAddress') : t('addNewAddress')}
        </button>
      )}

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-umbra-100 font-sans text-[24px] font-normal">
                {editMode ? t('editAddress') : t('addNewAddress')}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 transition-colors hover:text-gray-700"
                disabled={isLoading}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <Label className="input-label" htmlFor="first_name">
                    {t('addressFields.firstName')}
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={addressData.first_name}
                    onChange={handleInputChange}
                    placeholder={t('addressFields.pleaseEnterFirstName')}
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <Label className="input-label" htmlFor="last_name">
                    {t('addressFields.lastName')}
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={addressData.last_name}
                    onChange={handleInputChange}
                    placeholder={t('addressFields.pleaseEnterLastName')}
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>

                {/* Email */}
                <div>
                  <Label className="input-label" htmlFor="email">
                    {t('addressFields.email')}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={addressData.email}
                    onChange={handleInputChange}
                    placeholder={t('addressFields.pleaseEnterEmail')}
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label className="input-label" htmlFor="phone">
                    {t('addressFields.phone')}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={addressData.phone}
                    onChange={handleInputChange}
                    placeholder={t('addressFields.pleaseEnterPhone')}
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>

                {/* Country */}
                <div>
                  <Label className="input-label" htmlFor="country">
                    {t('addressFields.country')}
                  </Label>
                  <Select
                    value={addressData.country}
                    onValueChange={(value) => handleSelectChange('country', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
                      <SelectValue placeholder={t('addressFields.pleaseSelectCountry')} />
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
                  <Label className="input-label" htmlFor="province">
                    {t('addressFields.province')}
                  </Label>
                  {provinces?.length > 0 ? (
                    <Select
                      value={addressData.province}
                      onValueChange={(value) => handleSelectChange('province', value)}
                      disabled={isLoading || !addressData.country}
                    >
                      <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
                        <SelectValue placeholder={t('addressFields.pleaseSelectProvince')} />
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
                    <Input
                      id="province"
                      name="province"
                      value={addressData.province}
                      onChange={handleInputChange}
                      placeholder={t('addressFields.pleaseEnterProvince')}
                      className="input-field"
                      disabled={isLoading}
                    />
                  )}
                </div>

                {/* City */}
                <div>
                  <Label className="input-label" htmlFor="city">
                    {t('addressFields.city')}
                  </Label>
                  {cities?.length > 0 ? (
                    <Select
                      value={addressData.city}
                      onValueChange={(value) => handleSelectChange('city', value)}
                      disabled={isLoading || !addressData.province}
                    >
                      <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
                        <SelectValue placeholder={t('addressFields.pleaseSelectCity')} />
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
                    <Input
                      id="city"
                      name="city"
                      value={addressData.city}
                      onChange={handleInputChange}
                      placeholder={t('addressFields.pleaseEnterCity')}
                      className="input-field"
                      disabled={isLoading}
                    />
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <Label className="input-label" htmlFor="post_code">
                    {t('addressFields.postalCode')}
                  </Label>
                  <Input
                    id="post_code"
                    name="post_code"
                    value={addressData.post_code}
                    onChange={handleInputChange}
                    placeholder={t('addressFields.pleaseEnterPostalCode')}
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="mt-4">
                <Label className="input-label" htmlFor="street_address">
                  {t('addressFields.street')}
                </Label>
                <Textarea
                  id="street_address"
                  name="street_address"
                  rows={3}
                  value={addressData.street_address}
                  onChange={handleInputChange}
                  placeholder={t('addressFields.pleaseEnterStreetAddress')}
                  className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                  disabled={isLoading}
                />
              </div>

              {/* Default Address Checkbox */}
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox
                  id="is_default"
                  checked={addressData.is_default}
                  onCheckedChange={handleCheckboxChange}
                  disabled={isLoading}
                />
                <Label
                  htmlFor="is_default"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('addressFields.setAsDefaultAddress')}
                </Label>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4">
              <div className="flex justify-end gap-3">
                <button
                  className="rounded-[10px] border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  {t('cancel')}
                </button>
                <button
                  className="main-button-black inline-flex items-center justify-center rounded-[10px] px-6 py-2"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (editMode ? t('updating') : t('updating')) : editMode ? t('update') : t('update')}
                </button>
              </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="bg-opacity-80 absolute inset-0 flex items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#D00234]"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
