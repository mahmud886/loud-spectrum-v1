'use client';

import { cn } from '@/lib/utils';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ChooseYourCourier = ({ value, onValueChange, selectedShippingType, onShippingTypeChange }) => {
  const t = useTranslations('CheckoutPage.CourierSelection');

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

  const shippingTypes = [
    { value: 'standard', label: t('ShippingType.standard') },
    { value: 'express', label: t('ShippingType.express') },
    { value: 'overnight', label: t('ShippingType.overnight') },
    { value: 'free', label: t('ShippingType.free') },
  ];

  return (
    <div className="border-umbra-10 my-4 space-y-4 rounded-[10px] border p-4">
      {/* Courier Selection */}
      <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('label')}</label>

      <RadioGroup.Root value={value} onValueChange={onValueChange} className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {couriers.map((courier) => (
          <RadioGroup.Item
            key={courier.value}
            value={courier.value}
            className={cn(
              'group border-umbra-10 relative flex cursor-pointer items-center justify-between gap-4 rounded-[10px] border px-4 py-2 transition-all',
              'hover:border-umbra-40 data-[state=checked]:bg-stardust data-[state=checked]:border-transparent',
            )}
          >
            <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-green-600 opacity-0 transition-opacity group-data-[state=checked]:opacity-100" />

            <div className="flex flex-col items-start">
              <span className="text-umbra-100 text-left font-sans text-[20px] font-normal">{courier.name}</span>
              <p className="text-umbra-60 text-left text-[14px]">{courier.description}</p>
            </div>

            <div className="relative ml-auto h-12 w-20">
              <Image src={courier.image} alt={courier.name} fill className="rounded-[10px] object-contain" />
            </div>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      {/* Shipping Type Dropdown */}
      <div className="mt-6">
        <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('ShippingType.label')}</label>
        <Select value={selectedShippingType} onValueChange={onShippingTypeChange}>
          <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
            <SelectValue placeholder={t('ShippingType.placeholder')} />
          </SelectTrigger>
          <SelectContent className="text-umbra-100 font-mono text-[16px]">
            {shippingTypes.map((shippingType) => (
              <SelectItem
                key={shippingType.value}
                value={shippingType.value}
                className="hover:bg-umbra-10 cursor-pointer px-4 py-2"
              >
                {shippingType.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChooseYourCourier;
