'use client';

import {
  applyCoupon,
  removeCoupon,
  selectDiscountCoupon,
  setCouponCode,
  setCouponError,
} from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DiscountCoupon = () => {
  const dispatch = useDispatch();
  const t = useTranslations('CheckoutPage.DiscountCoupon');
  const [isApplying, setIsApplying] = useState(false);

  const discountCoupon = useSelector(selectDiscountCoupon);

  const handleInputChange = (e) => {
    dispatch(setCouponCode(e.target.value));
  };

  const handleApplyCoupon = async () => {
    if (!discountCoupon.code.trim()) {
      dispatch(setCouponError('Please enter a coupon code'));
      return;
    }

    setIsApplying(true);

    try {
      // Simulate API call for coupon validation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock coupon validation logic
      const validCoupons = {
        SAVE10: { discountAmount: 10, type: 'fixed' },
        SAVE20: { discountAmount: 20, type: 'fixed' },
        PERCENT15: { discountAmount: 0.15, type: 'percentage' },
      };

      const coupon = validCoupons[discountCoupon.code.toUpperCase()];

      if (coupon) {
        let discountAmount;
        if (coupon.type === 'percentage') {
          // For percentage discounts, you'd calculate based on subtotal
          // This is a simplified example
          discountAmount = 100 * coupon.discountAmount; // Assuming $100 subtotal
        } else {
          discountAmount = coupon.discountAmount;
        }

        dispatch(applyCoupon({ discountAmount }));
      } else {
        dispatch(setCouponError('Invalid coupon code'));
      }
    } catch (error) {
      dispatch(setCouponError('Failed to apply coupon. Please try again.'));
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  return (
    <div className="border-umbra-10 flex w-full flex-col space-y-2 border-t border-b py-4">
      <div className="flex w-full items-center space-x-2">
        <input
          type="text"
          value={discountCoupon.code}
          onChange={handleInputChange}
          placeholder={t('placeholder')}
          disabled={discountCoupon.applied}
          className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-[65%] rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal disabled:opacity-50 md:w-[80%]"
        />
        {!discountCoupon.applied ? (
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={isApplying || !discountCoupon.code.trim()}
            className="main-button-black rounded-full px-6 py-3 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isApplying ? 'Applying...' : t('apply')}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            {t('remove') || 'Remove'}
          </button>
        )}
      </div>

      {/* Success message */}
      {discountCoupon.applied && (
        <div className="text-sm font-medium text-green-600">
          Coupon applied! You saved ${discountCoupon.discountAmount.toFixed(2)}
        </div>
      )}

      {/* Error message */}
      {discountCoupon.error && <div className="text-sm font-medium text-red-600">{discountCoupon.error}</div>}
    </div>
  );
};

export default DiscountCoupon;
