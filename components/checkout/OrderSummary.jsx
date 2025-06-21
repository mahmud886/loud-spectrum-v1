'use client';

import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

const OrderSummary = ({ subtotal, shipping, discount }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const t = useTranslations('CheckoutPage.OrderSummary');
  const isFreeShipping = shipping === 0 || shipping === 'free';
  const total = subtotal + (isFreeShipping ? 0 : shipping) - discount;

  console.log(cartItems);

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
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('discount')}</span>
          <span>${discount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('tax')}</span>
          <span>{t('taxFree')}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('shipping')}</span>
          <span>{isFreeShipping ? t('freeShipping') : `$${shipping.toFixed(2)}`}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-umbra-10 text-umbra-100 flex items-center justify-between border-t pt-4 text-base font-semibold">
        <span>{t('totalAmount')}</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
