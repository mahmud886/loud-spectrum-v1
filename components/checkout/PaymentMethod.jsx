'use client';

import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const paymentMethods = ['debit-credit-card', 'ach-wire-transfer', 'cash-on-delivery'];

const PaymentMethod = ({ value, onValueChange, isDisabled = false, getMissingFieldsMessage = () => [] }) => {
  const t = useTranslations('CheckoutPage.PaymentMethod');

  // Get loading state from Redux
  const isLoading = useSelector((state) => state.checkout.isProcessing);

  // Get shipping address to determine country
  const shippingAddress = useSelector((state) => state.checkout.shippingAddress);

  // Helper function to check if shipping address is in the US
  const isUSAddress = () => {
    const country = shippingAddress?.country?.toLowerCase();
    return country === 'us' || country === 'usa';
  };

  // Filter payment methods based on country
  const getAvailablePaymentMethods = () => {
    let availableMethods = [...paymentMethods];

    // Cash-on-delivery is only available for US addresses
    if (!isUSAddress()) {
      availableMethods = availableMethods.filter((method) => method !== 'cash-on-delivery');
    }

    return availableMethods;
  };

  const handleChange = (selectedValue) => {
    // If disabled and trying to select a new payment method, show missing fields message
    if (isDisabled && selectedValue && selectedValue !== value) {
      const missingFields = getMissingFieldsMessage();
      if (missingFields.length > 0) {
        toast.error('Complete Required Information First', {
          description: `Please fill in: ${missingFields.slice(0, 3).join(', ')}${missingFields.length > 3 ? '...' : ''}`,
          duration: 4000,
        });
        return;
      }
    }

    if (value === selectedValue) {
      onValueChange('');
      toast.info('Payment Method Deselected', {
        description: 'No payment method selected',
        duration: 2000,
      });
    } else {
      onValueChange(selectedValue);
      // Show success toast based on payment method
      const methodName = t(`methods.${selectedValue}.name`);
      toast.success('Payment Method Selected', {
        description: `${methodName} selected successfully`,
        duration: 2000,
        icon: '✅',
      });
    }
  };

  const handlePaymentMethod = (methodKey) => {
    handleChange(methodKey);
  };

  return (
    <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
      <h4 className="text-umbra-100 font-sans text-[18px] font-normal">{t('title')}</h4>

      {/* Show warning when payment methods are disabled */}
      {/* {isDisabled && !isLoading && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-start">
            <svg className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="mb-1 text-sm font-medium text-amber-800">
                Complete Required Information to Enable Payment Methods
              </p>
              <div className="text-sm text-amber-700">
                <p>Missing:</p>
                <ul className="mt-1 ml-2 list-inside list-disc">
                  {getMissingFieldsMessage()
                    .slice(0, 4)
                    .map((field, index) => (
                      <li key={index}>{field}</li>
                    ))}
                  {getMissingFieldsMessage().length > 4 && <li>and {getMissingFieldsMessage().length - 4} more...</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <div className="grid gap-4 sm:grid-cols-1 xl:grid-cols-2">
        {getAvailablePaymentMethods().map((methodKey) => {
          const isChecked = value === methodKey;
          // Only disable payment method selection if it's not already selected and required fields are missing
          const isMethodDisabled = isLoading || (isDisabled && !isChecked);

          return (
            <button
              key={methodKey}
              type="button"
              onClick={() => handlePaymentMethod(methodKey)}
              disabled={isMethodDisabled}
              className={cn(
                'group relative flex min-h-[80px] cursor-pointer items-center justify-between gap-4 rounded-[10px] border px-4 py-2 transition-all',
                !isMethodDisabled && 'hover:border-umbra-40',
                isChecked ? 'bg-stardust border-transparent' : 'border-umbra-10',
                isMethodDisabled && 'cursor-not-allowed opacity-50',
              )}
            >
              <CheckCircle2
                className={cn(
                  'absolute top-0 right-0 h-5 w-5 text-green-600 transition-opacity',
                  isChecked ? 'opacity-100' : 'opacity-0',
                )}
              />
              <div className="flex h-full w-full flex-col items-start justify-start">
                <span className="text-umbra-100 text-left font-sans text-[20px] font-normal">
                  {t(`methods.${methodKey}.name`)}
                </span>
                <p className="text-umbra-60 text-left text-[10px]">{t(`methods.${methodKey}.description`)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
