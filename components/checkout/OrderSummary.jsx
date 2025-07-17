'use client';

import {
  selectDiscountCoupon,
  selectOrderSummary,
  setSubtotal,
  setTotalVolume,
} from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const orderSummary = useSelector(selectOrderSummary);
  const discountCoupon = useSelector(selectDiscountCoupon);
  const t = useTranslations('CheckoutPage.OrderSummary');

  // Calculate cart totals from cart items
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const calculatedSubtotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      const calculatedVolume = cartItems.reduce((totalVolume, item) => {
        return totalVolume + (parseFloat(item.selectedVolume) || 0) * item.quantity;
      }, 0);

      // Update Redux state with calculated values
      dispatch(setSubtotal(calculatedSubtotal));
      dispatch(setTotalVolume(calculatedVolume));
    } else {
      // Reset values when cart is empty
      dispatch(setSubtotal(0));
      dispatch(setTotalVolume(0));
    }
  }, [cartItems, dispatch]);

  const isFreeShipping = orderSummary.shipping === 0 || orderSummary.shipping === 'free';
  const displayVolume = orderSummary.totalVolume > 0 ? `${orderSummary.totalVolume}ml` : '0ml';

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
          <span>{displayVolume}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('subtotal')}</span>
          <span>${orderSummary.subtotal.toFixed(2)}</span>
        </div>
        {orderSummary.discount > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span>
              {t('discount')}
              {discountCoupon.applied && discountCoupon.code && (
                <span className="ml-1 text-xs">({discountCoupon.code})</span>
              )}
            </span>
            <span>-${orderSummary.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>
            {t('tax')}
            {orderSummary.tax ? <span className="ml-2 text-[10px]">(CA - Sales Tax: 7.75%) </span> : ''}
          </span>
          <span>{orderSummary.tax > 0 ? `${orderSummary.tax.toFixed(2)}` : t('taxFree')}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('shipping')}</span>
          <span>
            {isFreeShipping ? (
              <span className="text-green-600">{t('freeShipping')}</span>
            ) : (
              `$${orderSummary.shipping.toFixed(2)}`
            )}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="border-umbra-10 text-umbra-100 flex items-center justify-between border-t pt-4 text-base font-semibold">
        <span>{t('totalAmount')}</span>
        <span>${orderSummary.total.toFixed(2)}</span>
      </div>

      {/* Order Items Count */}
      {cartItems && cartItems.length > 0 && (
        <div className="text-umbra-60 text-xs">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your order
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
