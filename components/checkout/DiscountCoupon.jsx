'use client';

import { useTranslations } from 'next-intl';

const DiscountCoupon = () => {
  const t = useTranslations('CheckoutPage.DiscountCoupon');

  return (
    <div className="border-umbra-10 flex w-full items-center space-x-2 border-t border-b py-4">
      <input
        type="text"
        placeholder={t('placeholder')}
        className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-[65%] rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal md:w-[80%]"
      />
      <button
        type="button"
        className="main-button-black rounded-full px-6 py-3 text-sm font-medium text-white transition-colors"
      >
        {t('apply')}
      </button>
    </div>
  );
};

export default DiscountCoupon;
