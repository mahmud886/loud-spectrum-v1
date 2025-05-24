'use client';

import { selectOrderDetails } from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const t = useTranslations('CheckoutPage.OrderSummary');
  const { subtotal, shipping, discount, total } = useSelector(selectOrderDetails);
  const isFreeShipping = shipping === 0 || shipping === 'free';

  console.log(subtotal, shipping, discount, total);

  return (
    <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
      {/* Title */}
      <div className="border-umbra-10 border-b-1 pb-2">
        <h2 className="text-umbra-100 font-sans text-[20px] leading-[120%] font-normal">{t('title')}</h2>
      </div>

      {/* Summary Rows */}
      <div className="text-umbra-100 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span>{t('totalVolume')}</span>
          <span>10ml</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('subtotal')}</span>
          <span>${(subtotal || 0).toFixed(2)}</span>
        </div>
        {/* {discount > 0 && (

        )} */}
        <div className="flex items-center justify-between">
          <span>{t('discount')}</span>
          <span className="text-green-600">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('tax')}</span>
          <span>{t('taxFree')}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('shipping')}</span>
          <span>{isFreeShipping ? t('freeShipping') : `$${(shipping || 0).toFixed(2)}`}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-umbra-10 text-umbra-100 flex items-center justify-between border-t pt-4 text-base font-semibold">
        <span>{t('totalAmount')}</span>
        <span>${(total || 0).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
