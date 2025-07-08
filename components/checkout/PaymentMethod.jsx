'use client';

import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const paymentMethods = ['debit-credit-card', 'ach-wire-transfer', 'cash-on-delivery'];

const PaymentMethod = ({ value, onValueChange }) => {
  const t = useTranslations('CheckoutPage.PaymentMethod');

  // Get loading state from Redux
  const isLoading = useSelector((state) => state.checkout.isProcessing);

  const handleChange = (selectedValue) => {
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

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {paymentMethods.map((methodKey) => {
          const isChecked = value === methodKey;

          return (
            <button
              key={methodKey}
              type="button"
              onClick={() => handlePaymentMethod(methodKey)}
              disabled={isLoading}
              className={cn(
                'group relative flex min-h-[80px] cursor-pointer items-center justify-between gap-4 rounded-[10px] border px-4 py-2 transition-all',
                'hover:border-umbra-40',
                isChecked ? 'bg-stardust border-transparent' : 'border-umbra-10',
                isLoading && 'cursor-not-allowed opacity-50',
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
