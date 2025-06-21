'use client';

import {
  selectOrderSummary,
  selectSelectedCourier,
  selectShippingType,
  setSelectedCourier,
  setShippingType,
} from '@/lib/store/slices/checkoutSlice';
import { cn } from '@/lib/utils';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Shipping type constants based on volume
const PRODUCT_CONTAINS_ONLY_LESS_THAN_OR_EQUAL_TO_5ML = ['STANDARD_FLAT_RATE_9_95', 'FEDEX_2_DAY', 'UPS_GROUND'];
const PRODUCT_CONTAINS_MORE_THAN_5ML_LESS_THEN_50ML = ['FEDEX_2_DAY', 'UPS_GROUND'];
const PRODUCT_CONTAINS_MORE_THAN_50ML = ['FEDEX_AIR_HAZARDOUS_300', 'UPS_GROUND'];
const INTERNATIONAL_WHOLESALER = ['FEDEX_AIR_HAZARDOUS_SHIPPING_SHIP_MANAGER_350'];
const INTERNATIONAL_CUSTOMER = ['INTERNATIONAL_ECONOMY'];

const ChooseYourCourier = () => {
  const dispatch = useDispatch();
  const t = useTranslations('CheckoutPage.CourierSelection');

  // Redux selectors
  const selectedCourier = useSelector(selectSelectedCourier);
  const selectedShippingType = useSelector(selectShippingType);
  const orderSummary = useSelector(selectOrderSummary);

  // Get total volume from order summary
  const totalVolume = orderSummary.totalVolume;

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

  // Dynamic shipping types based on volume and courier
  const availableShippingTypes = useMemo(() => {
    let volumeBasedTypes = [];

    // Determine available shipping types based on volume
    if (totalVolume <= 5) {
      volumeBasedTypes = PRODUCT_CONTAINS_ONLY_LESS_THAN_OR_EQUAL_TO_5ML;
    } else if (totalVolume > 5 && totalVolume < 50) {
      volumeBasedTypes = PRODUCT_CONTAINS_MORE_THAN_5ML_LESS_THEN_50ML;
    } else if (totalVolume >= 50) {
      volumeBasedTypes = PRODUCT_CONTAINS_MORE_THAN_50ML;
    }

    // Filter shipping types based on selected courier
    const courierFilteredTypes = volumeBasedTypes.filter((type) => {
      if (selectedCourier === 'fedex') {
        return type.toLowerCase().includes('fedex') || type.includes('STANDARD_FLAT_RATE');
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
          label = t('ShippingType.fedex2Day') || 'FedEx 2 Day';
          cost = 15.99;
          break;
        case 'UPS_GROUND':
          displayValue = 'ups-ground';
          label = t('ShippingType.upsGround') || 'UPS Ground';
          cost = 12.99;
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
          label = t('ShippingType.internationalEconomy') || 'International Economy';
          cost = 25.99;
          break;
        default:
          displayValue = type.toLowerCase().replace(/_/g, '-');
          label = type.replace(/_/g, ' ').toLowerCase();
          cost = 0;
      }

      return { value: displayValue, label, cost, originalType: type };
    });
  }, [totalVolume, selectedCourier, t]);

  // Handle courier change
  const handleCourierChange = (value) => {
    dispatch(setSelectedCourier(value));
    // Reset shipping type when courier changes as available options may change
    dispatch(setShippingType(''));
  };

  // Handle shipping type change
  const handleShippingTypeChange = (value) => {
    dispatch(setShippingType(value));
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

      {/* Volume Information */}
      {totalVolume > 0 && (
        <div className="rounded-[10px] border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Total Volume:</span> {totalVolume}ml
            {totalVolume <= 5 && <span className="ml-2 text-xs">(≤5ml products)</span>}
            {totalVolume > 5 && totalVolume < 50 && <span className="ml-2 text-xs">(5-50ml products)</span>}
            {totalVolume >= 50 && <span className="ml-2 text-xs">(≥50ml products - Hazardous shipping required)</span>}
          </p>
        </div>
      )}

      {/* Shipping Type Dropdown */}
      <div className="mt-6">
        <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
          {t('ShippingType.label')}
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
                  {shippingType.cost > 0 && (
                    <span className="ml-2 text-xs text-gray-500">${shippingType.cost.toFixed(2)}</span>
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
          <p>Available types: {availableShippingTypes.map((t) => t.originalType).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ChooseYourCourier;
