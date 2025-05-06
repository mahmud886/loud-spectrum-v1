import React from 'react';
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
  const handleChange = (selectedValue) => {
    // Toggle logic: unselect if same value is clicked
    if (value === selectedValue) {
      onValueChange(''); // unselect
    } else {
      onValueChange(selectedValue); // select new one
    }
  };

  return (
    <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
      <h4 className="text-umbra-100 font-sans text-[18px] font-normal">Payment Method</h4>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {paymentMethods.map((method) => {
          const isChecked = value === method.value;

          return (
            <button
              key={method.value}
              type="button"
              onClick={() => handleChange(method.value)}
              className={cn(
                'group relative flex cursor-pointer items-center justify-between gap-4 rounded-[10px] border px-4 py-2 transition-all',
                'hover:border-umbra-40',
                isChecked ? 'bg-stardust border-transparent' : 'border-umbra-10',
              )}
            >
              <CheckCircle2
                className={cn(
                  'absolute top-2 right-2 h-5 w-5 text-green-600 transition-opacity',
                  isChecked ? 'opacity-100' : 'opacity-0',
                )}
              />
              <div className="flex flex-col items-start">
                <span className="text-umbra-100 text-left font-sans text-[20px] font-normal">{method.name}</span>
                <p className="text-umbra-60 text-left text-[10px]">{method.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
