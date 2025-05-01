'use client';

import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ShippingAddress from '@/components/checkout/ShippingAddress';
import BillingAddress from '@/components/checkout/BillingAddress';
import ChooseYourCourier from '@/components/checkout/ChooseYourCourier';

const ShippingAndBillingAddress = () => {
  const [billingOption, setBillingOption] = useState('same');
  const [selectedCourier, setSelectedCourier] = useState('fedex');

  const [shippingType, setShippingType] = useState('standard');

  const handleCourierChange = (value) => {
    setSelectedCourier(value);
  };

  const handleShippingTypeChange = (value) => {
    setShippingType(value);
  };

  return (
    <div className="space-y-8 p-4">
      <ShippingAddress />
      <ChooseYourCourier
        value={selectedCourier}
        onValueChange={handleCourierChange}
        selectedShippingType={shippingType}
        onShippingTypeChange={handleShippingTypeChange}
      />

      <div className="mx-auto w-full">
        <h6 className="text-umbra-100 mb-4 font-sans text-[24px] font-normal">Billing Address</h6>

        {/* Responsive inline radio group */}
        <RadioGroup value={billingOption} onValueChange={setBillingOption} className="flex flex-col gap-3 md:flex-row">
          {/* Same as shipping */}
          <label
            htmlFor="same"
            className={`flex flex-1 cursor-pointer items-center space-x-3 rounded-[10px] border px-4 py-2.5 transition-colors ${
              billingOption === 'same' ? 'bg-stardust border-transparent' : 'border-umbra-10 hover:border-umbra-40'
            }`}
          >
            <RadioGroupItem id="same" value="same" className="peer sr-only" />
            <div className="border-umbra-40 flex h-5 w-5 items-center justify-center rounded-full border">
              {billingOption === 'same' && <div className="bg-umbra-100 h-2.5 w-2.5 rounded-full" />}
            </div>
            <span className="text-umbra-100 font-mono text-[16px]">Same as shipping address</span>
          </label>

          {/* Different billing */}
          <label
            htmlFor="different"
            className={`flex flex-1 cursor-pointer items-center space-x-3 rounded-[10px] border px-4 py-2.5 transition-colors ${
              billingOption === 'different' ? 'bg-stardust border-transparent' : 'border-umbra-10 hover:border-umbra-40'
            }`}
          >
            <RadioGroupItem id="different" value="different" className="peer sr-only" />
            <div className="border-umbra-40 flex h-5 w-5 items-center justify-center rounded-full border">
              {billingOption === 'different' && <div className="bg-umbra-100 h-2.5 w-2.5 rounded-full" />}
            </div>
            <span className="text-umbra-100 font-mono text-[16px]">Use a different billing address</span>
          </label>
        </RadioGroup>
      </div>
      {billingOption === 'different' && <BillingAddress />}
    </div>
  );
};

export default ShippingAndBillingAddress;
