'use client';

import {
  resetDynamicShippingCost,
  selectDynamicShippingCost,
  selectOrderSummary,
  selectSelectedCourier,
  selectShippingAddress,
  selectShippingCostLoading,
  selectShippingType,
  setDynamicShippingCost,
  setSelectedCourier,
  setShippingCostLoading,
  setShippingType,
  setTax,
} from '@/lib/store/slices/checkoutSlice';
import { cn } from '@/lib/utils';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDimensionsByVolume } from '@/helpers/get-dimentions-by-volume';
import { getWeightByVolume } from '@/helpers/get-weight-by-volume';
import { selectCurrentUser } from '@/lib/store/slices/authSlice';
import { getFedexInformations } from '@/services/getFedexInformations';
import { getUpsInformations } from '@/services/getUpsInformations';

// Shipping type constants based on flowchart logic
const US_VOLUME_LESS_THAN_OR_EQUAL_TO_5ML = ['STANDARD_FLAT_RATE_9_95', 'FEDEX_2_DAY', 'UPS_GROUND'];
const US_VOLUME_MORE_THAN_5ML_LESS_THAN_50ML = ['FEDEX_2_DAY', 'UPS_GROUND'];
const US_VOLUME_MORE_THAN_OR_EQUAL_TO_50ML = ['FEDEX_AIR_HAZARDOUS_300', 'UPS_GROUND'];
const INTERNATIONAL_CUSTOMER = ['INTERNATIONAL_ECONOMY'];
const INTERNATIONAL_WHOLESALER = ['FEDEX_AIR_HAZARDOUS_SHIPPING_SHIP_MANAGER_350'];

const ChooseYourCourier = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const t = useTranslations('CheckoutPage.CourierSelection');

  // Redux selectors

  const selectedCourier = useSelector(selectSelectedCourier);
  const selectedShippingType = useSelector(selectShippingType);
  const orderSummary = useSelector(selectOrderSummary);
  const shippingCostLoading = useSelector(selectShippingCostLoading);
  const dynamicShippingCost = useSelector(selectDynamicShippingCost);
  const shippingAddress = useSelector(selectShippingAddress);

  // Get total volume from order summary
  const totalVolume = orderSummary.totalVolume;
  const totalWeightInPounds = getWeightByVolume(totalVolume);
  const dimensions = getDimensionsByVolume(totalVolume);
  const countryCode = shippingAddress?.country;
  const postalCode = shippingAddress?.postalCode;

  // Helper functions based on flowchart logic
  const isWholesaler = () => user?.role === 'wholesaler';
  const isCustomer = () => user?.role === 'customer' || !user?.role;
  const isInternational = () => {
    const country = shippingAddress?.country?.toLowerCase();
    return country && country !== 'us' && country !== 'usa';
  };
  const isCaliforniaUS = () => {
    const country = shippingAddress?.country?.toLowerCase();
    const province = shippingAddress?.province?.toLowerCase();

    // Handle multiple possible US country codes
    const isUS = country === 'us' || country === 'usa';
    // Handle multiple possible California state codes
    const isCA = province === 'ca' || province === 'california';

    return isUS && isCA;
  };

  // Calculate and apply tax based on flowchart logic
  const calculateAndApplyTax = () => {
    if (!shippingAddress?.country) {
      return;
    }

    const country = shippingAddress?.country?.toLowerCase();
    const province = shippingAddress?.province?.toLowerCase();
    const isUS = country === 'us' || country === 'usa';
    const isCA = province === 'ca' || province === 'california';
    const isCaliforniaUSResult = isUS && isCA;
    const subtotal = orderSummary.subtotal;

    if (isCaliforniaUSResult && subtotal > 0) {
      // Apply 7.75% sales tax for California
      const taxAmount = subtotal * 0.0775;
      dispatch(setTax(taxAmount));
    } else {
      dispatch(setTax(0));
    }
  };

  // Apply tax calculation when relevant factors change
  useEffect(() => {
    calculateAndApplyTax();
  }, [orderSummary.subtotal, shippingAddress?.country, shippingAddress?.province, dispatch]);

  // Initial tax calculation on component mount
  useEffect(() => {
    calculateAndApplyTax();
  }, []);

  // Determine available shipping types based on flowchart logic
  const getAvailableShippingTypesByLogic = () => {
    // International shipping
    if (isInternational()) {
      if (isWholesaler()) {
        return INTERNATIONAL_WHOLESALER; // FedEx Air Haz (ShipMgr): $350
      } else {
        return INTERNATIONAL_CUSTOMER; // FedEx Intl Economy: $30
      }
    }

    // US shipping - volume based
    if (totalVolume <= 5) {
      return US_VOLUME_LESS_THAN_OR_EQUAL_TO_5ML; // USPS: $9.95, FedEx 2-Day: API, UPS Ground: API
    } else if (totalVolume > 5 && totalVolume < 50) {
      return US_VOLUME_MORE_THAN_5ML_LESS_THAN_50ML; // FedEx 2-Day: API, UPS Ground: API
    } else {
      return US_VOLUME_MORE_THAN_OR_EQUAL_TO_50ML; // FedEx Air Haz: $300, UPS Ground: API
    }
  };

  const couriers = [
    {
      value: 'fedex',
      name: t('fedex.name'),
      description: t('fedex.description'),
      image: '/assets/images/courier-logos/fedex-logo.png',
    },
    {
      value: 'ups',
      name: t('ups.name'),
      description: t('ups.description'),
      image: '/assets/images/courier-logos/ups-logo.png',
    },
  ];

  // Dynamic shipping types based on flowchart logic
  const availableShippingTypes = useMemo(() => {
    // Get shipping types based on user type, destination, and volume
    const logicBasedTypes = getAvailableShippingTypesByLogic();

    // Filter shipping types based on selected courier
    const courierFilteredTypes = logicBasedTypes.filter((type) => {
      if (selectedCourier === 'fedex') {
        return (
          type.toLowerCase().includes('fedex') ||
          type.includes('STANDARD_FLAT_RATE') ||
          type.includes('INTERNATIONAL_ECONOMY')
        );
      } else if (selectedCourier === 'ups') {
        return type.toLowerCase().includes('ups');
      }
      return true;
    });

    // Map to display format with translations
    return courierFilteredTypes.map((type) => {
      let displayValue, label, cost;

      switch (type) {
        case 'STANDARD_FLAT_RATE_9_95':
          displayValue = 'standard-flat-rate';
          label = t('ShippingType.standardFlatRate') || 'Standard Flat Rate ($9.95)';
          cost = 9.95;
          break;
        case 'FEDEX_2_DAY':
          displayValue = 'fedex-2-day';
          label = t('ShippingType.fedex2Day') || 'FedEx 2 Day (API Pricing)';
          cost = 29.99; // Default fallback cost
          break;
        case 'UPS_GROUND':
          displayValue = 'ups-ground';
          label = t('ShippingType.upsGround') || 'UPS Ground (API Pricing)';
          cost = 29.99; // Default fallback cost
          break;
        case 'FEDEX_AIR_HAZARDOUS_300':
          displayValue = 'fedex-air-hazardous';
          label = t('ShippingType.fedexAirHazardous') || 'FedEx Air Hazardous ($300)';
          cost = 300;
          break;
        case 'FEDEX_AIR_HAZARDOUS_SHIPPING_SHIP_MANAGER_350':
          displayValue = 'fedex-air-hazardous-international';
          label = t('ShippingType.fedexAirHazardousIntl') || 'FedEx Air Hazardous International ($350)';
          cost = 350;
          break;
        case 'INTERNATIONAL_ECONOMY':
          displayValue = 'international-economy';
          label = t('ShippingType.internationalEconomy') || 'FedEx International Economy ($30)';
          cost = 30; // Fixed price as per flowchart
          break;
        default:
          displayValue = type.toLowerCase().replace(/_/g, '-');
          label = type.replace(/_/g, ' ').toLowerCase();
          cost = 0;
      }

      return { value: displayValue, label, cost, originalType: type };
    });
  }, [totalVolume, selectedCourier, t, user?.role, shippingAddress?.country, shippingAddress?.province]);

  // Get display cost for shipping type (dynamic or default)
  const getDisplayCost = (shippingType) => {
    const apiEnabledTypes = ['fedex-2-day', 'international-economy', 'ups-ground'];

    if (apiEnabledTypes.includes(shippingType.value) && selectedShippingType === shippingType.value) {
      if (shippingCostLoading) {
        return 'Loading...';
      }
      if (dynamicShippingCost !== null) {
        return `$${dynamicShippingCost.toFixed(2)}`;
      }
    }

    return shippingType.cost > 0 ? `$${shippingType.cost.toFixed(2)}` : '';
  };

  // Handle courier change
  const handleCourierChange = (value) => {
    dispatch(setSelectedCourier(value));
    // Reset shipping type when courier changes as available options may change
    dispatch(setShippingType(''));
  };

  // API call functions
  const callShippingAPI = async (shippingTypeValue) => {
    const shippingTypeMap = {
      'fedex-2-day': 'FEDEX_2_DAY',
      'international-economy': 'INTERNATIONAL_ECONOMY',
      'ups-ground': 'UPS_GROUND',
    };

    const originalType = shippingTypeMap[shippingTypeValue];
    if (!originalType) return;

    dispatch(setShippingCostLoading(true));

    try {
      let response;
      // Prepare shipping payload
      let shippingPayload = {
        dimensions,
        totalWeightInPounds,
        originalType: originalType,
        countryCode,
        postalCode,
      };
      // Call appropriate API based on shipping type
      if (originalType === 'UPS_GROUND') {
        response = await getUpsInformations(shippingPayload);
      } else if (originalType === 'FEDEX_2_DAY' || originalType === 'INTERNATIONAL_ECONOMY') {
        response = await getFedexInformations(shippingPayload);
      }

      if (response && !response.error && response.data) {
        // Extract cost from API response
        // You may need to adjust this based on the actual API response structure
        const apiCost = extractCostFromAPIResponse(response?.data, originalType);
        if (apiCost !== null) {
          dispatch(setDynamicShippingCost(apiCost));
        } else {
          // If no cost found in response, fallback to default
          dispatch(resetDynamicShippingCost());
        }
      } else {
        // API error, fallback to default cost
        console.warn('Shipping API error, using default cost:', response?.message);
        dispatch(resetDynamicShippingCost());
      }
    } catch (error) {
      // Network or other error, fallback to default cost
      console.error('Error calling shipping API:', error);
      dispatch(resetDynamicShippingCost());
    }
  };

  // Extract cost from API response (adjust based on actual API response structure)
  const extractCostFromAPIResponse = (apiData, shippingType) => {
    try {
      if (shippingType === 'UPS_GROUND') {
        // UPS API response structure
        const upsCost = apiData?.data?.RateResponse?.RatedShipment?.[0]?.TotalCharges?.MonetaryValue;
        return upsCost ? parseFloat(upsCost) : null;
      } else {
        // FedEx API response structure
        const fedexCost = apiData?.data?.output?.rateReplyDetails?.[0]?.ratedShipmentDetails?.[0]?.totalNetCharge;
        return fedexCost ? parseFloat(fedexCost) : null;
      }
    } catch (error) {
      console.error('Error extracting cost from API response:', error);
      return null;
    }
  };

  // Handle shipping type change
  const handleShippingTypeChange = (value) => {
    dispatch(setShippingType(value));

    // Call API for dynamic pricing for specific shipping types
    // Note: international-economy for customers has fixed pricing ($30), so no API call needed
    const apiEnabledTypes = ['fedex-2-day', 'ups-ground'];

    // Only call API for international-economy if it's for wholesaler (which uses different endpoint)
    if (value === 'international-economy' && isWholesaler()) {
      // This would be for FEDEX_AIR_HAZARDOUS_SHIPPING_SHIP_MANAGER_350 case
      callShippingAPI(value);
    } else if (apiEnabledTypes.includes(value)) {
      callShippingAPI(value);
    }
  };

  // Reset shipping type if current selection is not available for new volume/courier
  useEffect(() => {
    if (selectedShippingType && availableShippingTypes.length > 0) {
      const isCurrentTypeAvailable = availableShippingTypes.some((type) => type.value === selectedShippingType);

      if (!isCurrentTypeAvailable) {
        dispatch(setShippingType(''));
      }
    }
  }, [availableShippingTypes, selectedShippingType, dispatch]);

  return (
    <div className="border-umbra-10 my-4 space-y-4 rounded-[10px] border p-4">
      {/* Courier Selection */}
      <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('label')}</label>

      <RadioGroup.Root
        value={selectedCourier}
        onValueChange={handleCourierChange}
        className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
      >
        {couriers.map((courier) => (
          <RadioGroup.Item
            key={courier.value}
            value={courier.value}
            className={cn(
              'group border-umbra-10 relative flex cursor-pointer items-center justify-between gap-4 rounded-[10px] border px-4 py-2 transition-all',
              'hover:border-umbra-40 data-[state=checked]:bg-stardust data-[state=checked]:border-transparent',
            )}
          >
            <CheckCircle2 className="absolute top-0 right-0 h-5 w-5 text-green-600 opacity-0 transition-opacity group-data-[state=checked]:opacity-100" />

            <div className="flex flex-col items-start">
              <span className="text-umbra-100 text-left font-sans text-[20px] font-normal">{courier.name}</span>
              <p className="text-umbra-60 text-left text-[12px]">{courier.description}</p>
            </div>

            <div className="relative ml-auto h-12 w-20">
              <Image src={courier.image} alt={courier.name} fill className="rounded-[10px] object-contain" />
            </div>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      {/* Shipping Logic Information */}
      {process.env.NODE_ENV === 'development' && (
        <div className="space-y-2">
          {/* User Type and Destination */}
          <div className="rounded-[10px] border border-purple-200 bg-purple-50 p-3">
            <p className="text-sm text-purple-800">
              <span className="font-medium">User Type:</span> {isWholesaler() ? 'Wholesaler' : 'Customer'} |
              <span className="ml-2 font-medium">Destination:</span> {isInternational() ? 'International' : 'USA'}
              {isCaliforniaUS() && <span className="ml-2 text-xs">(CA - Sales Tax: 7.75%)</span>}
              {!shippingAddress?.country && (
                <span className="ml-2 text-xs text-red-500">(Address not set - initializing...)</span>
              )}
            </p>
          </div>

          {/* Volume Information */}
          {totalVolume > 0 && (
            <div className="rounded-[10px] border border-blue-200 bg-blue-50 p-3">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Total Volume:</span> {totalVolume}ml
                {totalVolume <= 5 && <span className="ml-2 text-xs">(≤5ml products)</span>}
                {totalVolume > 5 && totalVolume < 50 && <span className="ml-2 text-xs">(5-50ml products)</span>}
                {totalVolume >= 50 && (
                  <span className="ml-2 text-xs">(≥50ml products - Hazardous shipping required)</span>
                )}
              </p>
            </div>
          )}

          {/* Tax Information */}
          {orderSummary.subtotal > 0 && (
            <div className="rounded-[10px] border border-green-200 bg-green-50 p-3">
              <p className="text-sm text-green-800">
                <span className="font-medium">Subtotal:</span> ${orderSummary.subtotal.toFixed(2)} |
                <span className="ml-2 font-medium">Tax:</span> ${orderSummary.tax.toFixed(2)}
                {isCaliforniaUS() && <span className="ml-2 text-xs">(CA Sales Tax: 7.75%)</span>}
                {!isCaliforniaUS() && <span className="ml-2 text-xs">(No tax applied)</span>}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Shipping Type Dropdown */}
      <div className="mt-6">
        <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
          {t('ShippingType.label')}
          {shippingCostLoading && <span className="ml-2 text-sm text-blue-500">(Calculating shipping cost...)</span>}
          {availableShippingTypes.length === 0 && (
            <span className="ml-2 text-sm text-red-500">
              ({t('ShippingType.noOptionsAvailable') || 'No shipping options available'})
            </span>
          )}
        </label>
        <Select
          value={selectedShippingType}
          onValueChange={handleShippingTypeChange}
          disabled={availableShippingTypes.length === 0 || !selectedCourier}
        >
          <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal disabled:opacity-50">
            <SelectValue
              placeholder={
                !selectedCourier
                  ? t('ShippingType.selectCourierFirst') || 'Select courier first'
                  : availableShippingTypes.length === 0
                    ? t('ShippingType.noOptionsAvailable') || 'No options available'
                    : t('ShippingType.placeholder') || 'Select shipping type'
              }
            />
          </SelectTrigger>
          <SelectContent className="text-umbra-100 font-mono text-[16px]">
            {availableShippingTypes.map((shippingType) => (
              <SelectItem
                key={shippingType.value}
                value={shippingType.value}
                className="hover:bg-umbra-10 cursor-pointer px-4 py-2"
              >
                <div className="flex w-full items-center justify-between">
                  <span>{shippingType.label}</span>
                  {getDisplayCost(shippingType) && (
                    <span
                      className={cn(
                        'ml-2 text-xs',
                        shippingCostLoading && selectedShippingType === shippingType.value
                          ? 'text-blue-500'
                          : 'text-gray-500',
                      )}
                    >
                      {getDisplayCost(shippingType)}
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 rounded bg-gray-100 p-2 text-xs">
          <p>
            Debug: Volume: {totalVolume}ml | Courier: {selectedCourier} | Shipping: {selectedShippingType}
          </p>
          <p>
            User: {user?.role || 'guest'} | Country: {shippingAddress?.country || 'not set'} | Province:{' '}
            {shippingAddress?.province || 'not set'} | Postal Code: {shippingAddress?.postalCode || 'not set'}
          </p>
          <p>
            International: {isInternational() ? 'Yes' : 'No'} | California: {isCaliforniaUS() ? 'Yes' : 'No'}
          </p>
          <p>Available types: {availableShippingTypes.map((t) => t.originalType).join(', ')}</p>
          <p>
            Loading: {shippingCostLoading ? 'Yes' : 'No'} | Dynamic Cost:{' '}
            {dynamicShippingCost !== null ? `$${dynamicShippingCost}` : 'None'}
          </p>
          <p>
            Tax Info: Subtotal: ${orderSummary.subtotal} | Tax: ${orderSummary.tax} | Total: ${orderSummary.total}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChooseYourCourier;
