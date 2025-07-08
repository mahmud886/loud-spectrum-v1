'use client';

import {
  applyCoupon,
  removeCoupon,
  selectDiscountCoupon,
  selectOrderSummary,
  setCouponCode,
  setCouponError,
} from '@/lib/store/slices/checkoutSlice';
import { getVerifyDiscountCoupon } from '@/services/get-verify-discount-coupon';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const DiscountCoupon = () => {
  const dispatch = useDispatch();
  const t = useTranslations('CheckoutPage.DiscountCoupon');
  const [isApplying, setIsApplying] = useState(false);

  const discountCoupon = useSelector(selectDiscountCoupon);
  const orderSummary = useSelector(selectOrderSummary);

  const handleInputChange = (e) => {
    dispatch(setCouponCode(e.target.value));
  };

  const handleApplyCoupon = async () => {
    if (!discountCoupon.code.trim()) {
      dispatch(setCouponError('Please enter a coupon code'));
      return;
    }

    setIsApplying(true);
    dispatch(setCouponError(null));

    try {
      const response = await getVerifyDiscountCoupon(discountCoupon.code);

      if (response.error) {
        toast.error(response.message || 'Invalid coupon code');
        dispatch(setCouponError(response.message || 'Invalid coupon code'));
        return;
      }
      const couponData = response.data?.data;

      if (!couponData) {
        toast.error('Invalid coupon response');
        dispatch(setCouponError('Invalid coupon response'));
        return;
      }

      if (couponData.status !== 'Active') {
        toast.error('This coupon is not active');
        dispatch(setCouponError('This coupon is not active'));
        return;
      }

      let discountAmount = 0;
      const subtotal = orderSummary.subtotal;

      if (couponData.discount_type === 'Fixed') {
        discountAmount = couponData.discount_value;
      } else if (couponData.discount_type === 'Percentage') {
        discountAmount = (couponData.discount_value / 100) * subtotal;
      } else {
        toast.error('Unsupported discount type');
        dispatch(setCouponError('Unsupported discount type'));
        return;
      }

      discountAmount = Math.min(discountAmount, subtotal);

      toast.success(`Coupon applied! You saved $${discountAmount.toFixed(2)}`);
      dispatch(
        applyCoupon({
          discountAmount,
          couponType: couponData.discount_type,
          couponId: couponData._id,
          couponCode: couponData.code,
          originalDiscountValue: couponData.discount_value,
        }),
      );
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast.error('Failed to apply coupon. Please try again.');
      dispatch(setCouponError('Failed to apply coupon. Please try again.'));
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  const getDiscountDisplayText = () => {
    if (discountCoupon.applied) {
      if (discountCoupon.couponType === 'Percentage') {
        return `Coupon applied! You saved ${discountCoupon.originalDiscountValue}% ($${discountCoupon.discountAmount.toFixed(2)})`;
      } else {
        return `Coupon applied! You saved $${discountCoupon.discountAmount.toFixed(2)}`;
      }
    }
    return '';
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
      {discountCoupon.applied && <div className="text-sm font-medium text-green-600">{getDiscountDisplayText()}</div>}

      {/* Error message */}
      {discountCoupon.error && <div className="text-sm font-medium text-red-600">{discountCoupon.error}</div>}
    </div>
  );
};

export default DiscountCoupon;
