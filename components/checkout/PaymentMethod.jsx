import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const paymentMethods = [
  {
    value: 'debit-credit-card',
    name: 'Debit/Credit Card',
    description: 'Pay securely using your credit or debit card',
  },
  {
    value: 'ach-wire-transfer',
    name: 'ACH/Wire Transfer',
    description: 'Pay via ACH or wire transfer',
  },
  {
    value: 'cash-on-delivery',
    name: 'Cash on Delivery',
    description: 'Pay in cash upon delivery',
  },
];

const PaymentMethod = ({ value, onValueChange }) => {
  return (
    <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
      <h4 className="text-umbra-100 font-sans text-[18px] font-normal">Payment Method</h4>

      <RadioGroup.Root value={value} onValueChange={onValueChange} className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {paymentMethods.map((method) => (
          <RadioGroup.Item
            key={method.value}
            value={method.value}
            className={cn(
              'group border-umbra-10 relative flex cursor-pointer items-center justify-between gap-4 rounded-[10px] border px-4 py-2 transition-all',
              'hover:border-umbra-40 data-[state=checked]:bg-stardust data-[state=checked]:border-transparent',
            )}
          >
            {/* ✅ Green checkmark top-right */}
            <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-green-600 opacity-0 transition-opacity group-data-[state=checked]:opacity-100" />

            {/* Name and description */}
            <div className="flex flex-col items-start">
              <span className="text-umbra-100 text-left font-sans text-[20px] font-normal">{method.name}</span>
              <p className="text-umbra-60 text-left text-[10px]">{method.description}</p>
            </div>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
};

export default PaymentMethod;
