import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

const couriers = [
  {
    value: 'fedex',
    name: 'FedEx',
    description: 'Reliable delivery across 220+ countries',
    image: '/assets/images/courier-logos/fedex-logo.png',
  },
  {
    value: 'ups',
    name: 'UPS',
    description: 'Efficient domestic and global logistics',
    image: '/assets/images/courier-logos/ups-logo.png',
  },
];

const shippingTypes = [
  { value: 'standard', label: 'Standard Shipping (5-7 business days)' },
  { value: 'express', label: 'Express Shipping (2-3 business days)' },
  { value: 'overnight', label: 'Overnight Shipping (1 business day)' },
  { value: 'free', label: 'Free Shipping (10-15 business days)' },
];

const ChooseYourCourier = ({ value, onValueChange, selectedShippingType, onShippingTypeChange }) => {
  return (
    <div className="space-y-4">
      {/* Courier Selection */}
      <h4 className="text-umbra-100 text-lg font-semibold"></h4>
      <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Choose Your Courier*</label>

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
            {/* ✅ Green checkmark top-right */}
            <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-green-600 opacity-0 transition-opacity group-data-[state=checked]:opacity-100" />

            {/* Name and description */}
            <div className="flex flex-col items-start">
              <span className="text-umbra-100 text-left font-sans text-[20px] font-normal">{courier.name}</span>
              <p className="text-umbra-60 text-left text-[14px]">{courier.description}</p>
            </div>

            {/* Image aligned right */}
            <div className="relative ml-auto h-12 w-20">
              <Image src={courier.image} alt={courier.name} fill className="rounded-[10px] object-contain" />
            </div>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      {/* Shipping Type Dropdown */}
      <div className="mt-6">
        <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
          Choose Your Shipping Type*
        </label>
        <Select value={selectedShippingType} onValueChange={onShippingTypeChange}>
          <SelectTrigger className="bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal">
            <SelectValue placeholder="Select your shipping type" />
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
