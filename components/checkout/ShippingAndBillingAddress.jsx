'use client';

import BillingAddress from '@/components/checkout/BillingAddress';
import GuestUserForm from '@/components/checkout/GuestUserForm';
import ShippingAddress from '@/components/checkout/ShippingAddress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { selectCurrentUser } from '@/lib/store/slices/authSlice';
import { selectBillingAddress, setSameAsShipping } from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';

const ShippingAndBillingAddress = () => {
  const billingAddress = useSelector(selectBillingAddress);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const t = useTranslations('CheckoutPage.ShippingAndBillingAddress');

  const billingOption = billingAddress.sameAsShipping ? 'same' : 'different';

  const handleBillingOptionChange = (value) => {
    dispatch(setSameAsShipping(value === 'same'));
  };

  return (
    <div className="space-y-8 p-4">
      {/* Show guest user form if not logged in */}
      {!currentUser?.id && <GuestUserForm />}

      <ShippingAddress />

      <div className="mx-auto w-full">
        {/* Responsive inline radio group */}
        <RadioGroup
          value={billingOption}
          onValueChange={handleBillingOptionChange}
          className="flex flex-col gap-3 xl:flex-row"
        >
          {/* Same as shipping */}
          <label
            htmlFor="same"
            className={`flex flex-1 cursor-pointer items-start space-x-3 rounded-[10px] border px-4 py-2.5 transition-colors ${
              billingOption === 'same' ? 'bg-stardust border-transparent' : 'border-umbra-10 hover:border-umbra-40'
            }`}
          >
            <RadioGroupItem id="same" value="same" className="peer sr-only" />
            <div className="border-umbra-40 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border">
              {billingOption === 'same' && <div className="bg-umbra-100 h-2.5 w-2.5 rounded-full" />}
            </div>
            <span className="text-umbra-100 font-mono text-[16px] leading-snug">{t('billingOptionSame')}</span>
          </label>

          {/* Different billing */}
          <label
            htmlFor="different"
            className={`flex flex-1 cursor-pointer items-start space-x-3 rounded-[10px] border px-4 py-2.5 transition-colors ${
              billingOption === 'different' ? 'bg-stardust border-transparent' : 'border-umbra-10 hover:border-umbra-40'
            }`}
          >
            <RadioGroupItem id="different" value="different" className="peer sr-only" />
            <div className="border-umbra-40 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border">
              {billingOption === 'different' && <div className="bg-umbra-100 h-2.5 w-2.5 rounded-full" />}
            </div>
            <span className="text-umbra-100 font-mono text-[16px] leading-snug">{t('billingOptionDifferent')}</span>
          </label>
        </RadioGroup>
      </div>
      {billingOption === 'different' && <BillingAddress />}
    </div>
  );
};

export default ShippingAndBillingAddress;
