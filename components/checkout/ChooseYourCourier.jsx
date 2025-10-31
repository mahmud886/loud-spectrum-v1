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
  setShippingTypeFormatted,
  setTax,
} from '@/lib/store/slices/checkoutSlice';
import { cn } from '@/lib/utils';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import calculateShippingWeight from '@/helpers/calculate-shipping-weight';
import { getDimensionsByVolume } from '@/helpers/get-dimentions-by-volume';
import { getWeightByVolume } from '@/helpers/get-weight-by-volume';
import { selectCurrentUser } from '@/lib/store/slices/authSlice';
import { selectSimplifiedCartProducts } from '@/lib/store/slices/cartSlice';
import { getFedexInformations } from '@/services/getFedexInformations';
import { getUpsInformations } from '@/services/getUpsInformations';
import { toast } from 'sonner';

// Shipping type constants based on flowchart logic
const US_VOLUME_LESS_THAN_OR_EQUAL_TO_5ML = ['STANDARD_FLAT_RATE_7_99', 'FEDEX_2_DAY', 'UPS_GROUND'];
const US_VOLUME_MORE_THAN_5ML_LESS_THAN_50ML = ['STANDARD_FLAT_RATE_7_99', 'FEDEX_2_DAY', 'UPS_GROUND'];
const US_VOLUME_MORE_THAN_OR_EQUAL_TO_50ML = ['STANDARD_FLAT_RATE_7_99', 'FEDEX_AIR_HAZARDOUS_300', 'UPS_GROUND'];
const INTERNATIONAL_CUSTOMER = ['INTERNATIONAL_ECONOMY'];
const INTERNATIONAL_WHOLESALER = ['FEDEX_AIR_HAZARDOUS_SHIPPING_SHIP_MANAGER_350'];

const ChooseYourCourier = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const t = useTranslations('CheckoutPage.CourierSelection');

  // Redux selectors
  // Note: selectedCourier defaults to 'fedex' in store but resets to '' after order completion
  const selectedCourier = useSelector(selectSelectedCourier);
  const selectedShippingType = useSelector(selectShippingType);
  const orderSummary = useSelector(selectOrderSummary);
  const shippingCostLoading = useSelector(selectShippingCostLoading);
  const dynamicShippingCost = useSelector(selectDynamicShippingCost);
  const shippingAddress = useSelector(selectShippingAddress);
  const simplifiedCartProducts = useSelector(selectSimplifiedCartProducts);

  // Local state for DHL products
  const [dhlProducts, setDhlProducts] = useState([]);
  const [dhlLoading, setDhlLoading] = useState(false);

  // Get total volume from order summary
  const totalVolume = orderSummary.totalVolume;
  const totalWeightInPounds = useMemo(() => getWeightByVolume(totalVolume), [totalVolume]);
  const dimensions = useMemo(() => getDimensionsByVolume(totalVolume), [totalVolume]);
  const countryCode = shippingAddress?.country;
  const postalCode = shippingAddress?.postalCode;

  // Calculate shipping weight
  const { totalGrams, totalPounds, box, details, totalKgs, totalMiligrams, totalPrice, totalMilliliters } = useMemo(
    () => calculateShippingWeight(simplifiedCartProducts),
    [simplifiedCartProducts],
  );

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
  const calculateAndApplyTax = useCallback(() => {
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
  }, [shippingAddress?.country, shippingAddress?.province, orderSummary.subtotal, dispatch]);

  // Apply tax calculation when relevant factors change
  useEffect(() => {
    calculateAndApplyTax();
  }, [calculateAndApplyTax]);

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

  // Filter couriers based on shipping destination
  const couriers = useMemo(() => {
    const allCouriers = [
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
      {
        value: 'dhl',
        name: t('dhl.name'),
        description: t('dhl.description'),
        image: '/assets/images/courier-logos/dhl-logo.png',
      },
      {
        value: 'standard-flat-rate',
        name: t('standardFlatRate.name'),
        description: t('standardFlatRate.description'),
        // image: '/assets/images/courier-logos/fedex-logo.png', // Placeholder - can be updated with USPS/standard shipping logo
      },
    ];

    // DHL is only available for international customers
    // Standard Flat Rate is only available for US customers
    if (isInternational()) {
      return allCouriers.filter((courier) => courier.value !== 'standard-flat-rate');
    } else {
      return allCouriers.filter((courier) => courier.value !== 'dhl');
    }
  }, [t, shippingAddress?.country]);

  // Dynamic shipping types based on flowchart logic
  const availableShippingTypes = useMemo(() => {
    // Handle DHL separately with dynamic products
    if (selectedCourier === 'dhl') {
      if (dhlLoading) {
        return [{ value: 'loading', label: 'Loading DHL rates...', cost: 0, originalType: 'LOADING' }];
      }

      if (dhlProducts.length > 0) {
        // Filter DHL products to only show Express Worldwide and add $30 extra
        const expressWorldwideProducts = dhlProducts.filter(
          (product) => product.productName && product.productName.toLowerCase().includes('express worldwide'),
        );

        // Convert DHL products to shipping type format with $30 extra fee
        return expressWorldwideProducts.map((product, index) => {
          const basePrice = parseFloat(product.totalPrice[0].price);
          const priceWithExtra = basePrice + 30; // Add $30 extra

          return {
            value: `dhl-${product.productCode}-${index}`,
            label: `${product.productName} - $${priceWithExtra.toFixed(2)} ${product.totalPrice[0].priceCurrency}`,
            cost: priceWithExtra,
            originalType: product.productCode,
            dhlProduct: product,
            basePrice: basePrice, // Store original price for reference
          };
        });
      }

      // Show static DHL shipping options that will trigger API calls when selected
      return [{ value: 'no-rates', label: 'No DHL rates available', cost: 0, originalType: 'NO_RATES' }];
    }

    // Get shipping types based on user type, destination, and volume
    const logicBasedTypes = getAvailableShippingTypesByLogic();

    // Filter shipping types based on selected courier
    const courierFilteredTypes = logicBasedTypes.filter((type) => {
      if (selectedCourier === 'standard-flat-rate') {
        return type.includes('STANDARD_FLAT_RATE');
      } else if (selectedCourier === 'fedex') {
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
          displayValue = 'standard-flat-rate-9-95';
          label = t('ShippingType.standardFlatRate') || 'Standard Flat Rate ($9.95)';
          cost = 9.95;
          break;
        case 'STANDARD_FLAT_RATE_7_99':
          displayValue = 'standard-flat-rate-7-99';
          label = t('ShippingType.standardFlatRate799') || 'Standard Flat Rate ($7.99)';
          cost = 7.99;
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
  }, [
    totalVolume,
    selectedCourier,
    t,
    user?.role,
    shippingAddress?.country,
    shippingAddress?.province,
    dhlProducts,
    dhlLoading,
  ]);

  // Get display cost for shipping type (dynamic or default)
  // Shimmer component for loading state
  const Shimmer = () => (
    <span
      className="inline-block h-4 w-12 animate-pulse rounded bg-gray-200 align-middle"
      aria-label="Loading shipping cost"
    />
  );

  const getDisplayCost = (shippingType) => {
    // Handle DHL products - price is already included in label
    if (selectedCourier === 'dhl' && shippingType.value.startsWith('dhl-')) {
      return ''; // Price is already shown in the label
    }

    // Handle standard flat rate types - show cost directly
    if (shippingType.value === 'standard-flat-rate-7-99' || shippingType.value === 'standard-flat-rate-9-95') {
      return shippingType.cost > 0 ? `$${shippingType.cost.toFixed(2)}` : '';
    }

    const apiEnabledTypes = ['fedex-2-day', 'international-economy', 'ups-ground'];

    if (apiEnabledTypes.includes(shippingType.value) && selectedShippingType === shippingType.value) {
      if (shippingCostLoading) {
        return <Shimmer />;
      }
      if (dynamicShippingCost !== null) {
        return `$${dynamicShippingCost.toFixed(2)}`;
      }
    }

    // return shippingType.cost > 0 ? `$${shippingType.cost.toFixed(2)}` : '';
  };

  // Fetch DHL rates when DHL is selected
  const fetchDhlRates = useCallback(async () => {
    if (!shippingAddress?.country || !shippingAddress?.postalCode) {
      toast.error('Shipping address is required for DHL rates');
      return;
    }

    setDhlLoading(true);
    setDhlProducts([]);

    // Construct the payload like the test page
    const shippingData = {
      shipperDetails: {
        postalCode: '92706',
        cityName: 'Santa Ana',
        countryCode: 'US',
      },
      receiverDetails: {
        postalCode: shippingAddress.postalCode,
        cityName: shippingAddress.province || 'Destination City',
        countryCode: shippingAddress.country,
      },
      packageDetails: {
        weight: parseFloat(totalKgs) || 1, // Convert to kg
        length: parseFloat(box?.dimensions?.length) || 10, // Convert to cm
        width: parseFloat(box?.dimensions?.width) || 10, // Convert to cm
        height: parseFloat(box?.dimensions?.height) || 10, // Convert to cm
      },
    };

    try {
      const response = await fetch('/api/dhl/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shippingData),
      });
      const result = await response.json();
      if (!response.ok) {
        const errorMessage = result.details?.detail || result.error || 'Failed to fetch rates.';
        toast.error(errorMessage);
      }
      setDhlProducts(result.products || []);
    } catch (error) {
      console.error('Error fetching DHL rates:', error);
      let userFriendlyError = error.message;

      // Make DHL API errors more user-friendly
      if (error.message.includes('not available for the requested pickup date')) {
        userFriendlyError = 'DHL services are not available for the selected dates. Please try again later.';
      } else if (error.message.includes('user not authorized')) {
        userFriendlyError = 'DHL service temporarily unavailable. Please try a different courier.';
      } else if (error.message.includes('Failed to fetch rates')) {
        userFriendlyError = 'Unable to get DHL rates. Please check your address and try again.';
      }

      toast.error(userFriendlyError);
    } finally {
      setDhlLoading(false);
    }
  }, [
    dimensions,
    totalWeightInPounds,
    shippingAddress?.country,
    shippingAddress?.postalCode,
    shippingAddress?.province,
  ]);

  // Handle courier change
  const handleCourierChange = (value) => {
    dispatch(setSelectedCourier(value));
    // Reset shipping type when courier changes as available options may change
    dispatch(setShippingType(''));

    // Auto-select shipping type for standard-flat-rate courier
    if (value === 'standard-flat-rate') {
      // Auto-select STANDARD_FLAT_RATE_7_99 when standard-flat-rate courier is selected
      dispatch(setShippingType('standard-flat-rate-7-99'));
      dispatch(setShippingTypeFormatted('Standard Flat Rate ($7.99)'));
      dispatch(setDynamicShippingCost(7.99));
    } else if (value === 'dhl') {
      // Set initial DHL shipping type
      dispatch(setShippingType('dhl'));
      // Call DHL API only when user clicks DHL radio button
      fetchDhlRates();
    } else {
      // Clear DHL data when switching away from DHL
      setDhlProducts([]);
    }
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
        dimensions: box?.dimensions,
        totalWeightInPounds: totalPounds,
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
    // Handle DHL product selection
    if (selectedCourier === 'dhl' && value.startsWith('dhl-')) {
      // Find the selected DHL product from the filtered Express Worldwide products
      const expressWorldwideProducts = dhlProducts.filter(
        (product) => product.productName && product.productName.toLowerCase().includes('express worldwide'),
      );
      const selectedProduct = expressWorldwideProducts.find(
        (product, index) => `dhl-${product.productCode}-${index}` === value,
      );

      if (selectedProduct) {
        // Calculate price with $30 extra
        const basePrice = parseFloat(selectedProduct.totalPrice[0].price);
        const priceWithExtra = basePrice + 30;

        // Create the formatted shipping type for DHL
        const formattedShippingType = `dhl-${selectedProduct.productCode}-0 - ${selectedProduct.productName}`;
        dispatch(setShippingType(value));
        dispatch(setShippingTypeFormatted(formattedShippingType));
        dispatch(setDynamicShippingCost(priceWithExtra));
        return;
      }
    }

    // Handle standard flat rate shipping types
    if (value === 'standard-flat-rate-7-99') {
      dispatch(setShippingType(value));
      dispatch(setShippingTypeFormatted('Standard Flat Rate ($7.99)'));
      dispatch(setDynamicShippingCost(7.99));
      return;
    }

    if (value === 'standard-flat-rate-9-95') {
      dispatch(setShippingType(value));
      dispatch(setShippingTypeFormatted('Standard Flat Rate ($9.95)'));
      dispatch(setDynamicShippingCost(9.95));
      return;
    }

    // For non-DHL couriers, use the original value
    dispatch(setShippingType(value));

    // Call API for dynamic pricing for specific shipping types (FedEx/UPS)
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

  // Reset courier when total volume changes (but not when address changes)
  useEffect(() => {
    if (selectedCourier) {
      dispatch(setSelectedCourier(''));
      dispatch(setShippingType(''));
      // Clear DHL data when resetting
      setDhlProducts([]);
    }
  }, [totalVolume, dispatch]);

  // Reset courier and shipping type when address changes
  useEffect(() => {
    if (shippingAddress?.country || shippingAddress?.province || shippingAddress?.city || shippingAddress?.postalCode) {
      // If DHL was selected but destination is no longer international, reset courier
      if (selectedCourier === 'dhl' && !isInternational()) {
        dispatch(setSelectedCourier(''));
        dispatch(setShippingType(''));
        setDhlProducts([]);
      } else if (selectedCourier === 'standard-flat-rate' && isInternational()) {
        // If standard-flat-rate was selected but destination is now international, reset courier
        dispatch(setSelectedCourier(''));
        dispatch(setShippingType(''));
      } else {
        // For other couriers or when address changes, reset shipping type only
        dispatch(setShippingType(''));
        if (selectedCourier === 'dhl') {
          setDhlProducts([]);
        } else if (selectedCourier === 'standard-flat-rate') {
          // Re-auto-select STANDARD_FLAT_RATE_7_99 when address changes but still US
          if (!isInternational()) {
            dispatch(setShippingType('standard-flat-rate-7-99'));
            dispatch(setShippingTypeFormatted('Standard Flat Rate ($7.99)'));
            dispatch(setDynamicShippingCost(7.99));
          }
        }
      }
    }
  }, [
    shippingAddress?.country,
    shippingAddress?.province,
    shippingAddress?.city,
    shippingAddress?.postalCode,
    selectedCourier,
    dispatch,
  ]);

  // DHL API is only called when user clicks the DHL radio button
  // No automatic refetch on address changes

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
        className="grid gap-4 sm:grid-cols-1 xl:grid-cols-2"
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

            {courier.image && (
              <div className="relative ml-auto h-12 w-20">
                <Image src={courier.image} alt={courier.name} fill className="rounded-[10px] object-contain" />
              </div>
            )}
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
          {selectedCourier === 'dhl' && (
            <p>
              DHL: Loading: {dhlLoading ? 'Yes' : 'No'} | Total Products: {dhlProducts.length} | Express Worldwide:{' '}
              {
                dhlProducts.filter((p) => p.productName && p.productName.toLowerCase().includes('express worldwide'))
                  .length
              }
            </p>
          )}
          <p>
            Tax Info: Subtotal: ${orderSummary.subtotal} | Tax: ${orderSummary.tax} | Total: ${orderSummary.total}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChooseYourCourier;
