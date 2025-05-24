'use client';

import {
  applyCoupon,
  removeCoupon,
  selectCouponDetails,
  selectDiscount,
  selectIsCouponApplied,
  selectOrderTotal,
} from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DiscountCoupon = () => {
  const t = useTranslations('CheckoutPage.DiscountCoupon');
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  const isCouponApplied = useSelector(selectIsCouponApplied);
  const couponDetails = useSelector(selectCouponDetails);
  const total = useSelector(selectOrderTotal) || 0;
  const discount = useSelector(selectDiscount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError(t('error.empty'));
      return;
    }

    try {
      // TODO: Replace with your actual API call
      // const response = await fetch('/api/validate-coupon', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ code: couponCode }),
      // });

      // const data = await response.json();

      const data = {
        valid: true,
        type: 'percentage',
        value: 20,
      };

      if (data.valid) {
        dispatch(
          applyCoupon({
            code: couponCode,
            type: data.type,
            value: data.value,
          }),
        );
        setError('');
      } else {
        setError(t('error.invalid'));
      }
    } catch (err) {
      setError(t('error.server'));
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponCode('');
    setError('');
  };

  return (
    <div className="border-umbra-10 flex w-full flex-col space-y-2 border-t border-b py-4">
      <div className="flex w-full items-center space-x-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder={t('placeholder')}
          className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-[65%] rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal md:w-[80%]"
          disabled={isCouponApplied}
        />
        {!isCouponApplied ? (
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="main-button-black rounded-full px-6 py-3 text-sm font-medium text-white transition-colors"
          >
            {t('apply')}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="main-button-black rounded-full px-6 py-3 text-sm font-medium text-white transition-colors"
          >
            {t('remove')}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {isCouponApplied && couponDetails && (
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-green-600">
            {t('applied', {
              type: couponDetails.type === 'percentage' ? '%' : '$',
              value: couponDetails.value,
            })}
          </div>
          {/* <div className="text-sm">
            <span className="text-umbra-100">{t('discount')}: </span>
            <span className="text-green-600">-${discount.toFixed(2)}</span>
          </div>
          <div className="text-sm font-medium">
            <span className="text-umbra-100">{t('total')}: </span>
            <span>${total.toFixed(2)}</span>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DiscountCoupon;
