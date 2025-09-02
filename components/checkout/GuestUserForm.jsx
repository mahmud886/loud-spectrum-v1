'use client';

import { Link } from '@/i18n/navigation';
import { selectCurrentUser } from '@/lib/store/slices/authSlice';
import { selectGuestUser, setGuestUserField, setIsGuest } from '@/lib/store/slices/checkoutSlice';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GuestUserForm = () => {
  const t = useTranslations('CheckoutPage.GuestUser');
  const dispatch = useDispatch();
  const guestUser = useSelector(selectGuestUser);
  const currentUser = useSelector(selectCurrentUser);
  const [showPassword, setShowPassword] = useState(false);

  // If user is logged in, don't show guest form
  if (currentUser && currentUser.id) {
    return null;
  }

  const handleGuestFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch(setGuestUserField({ name, value }));

    // Auto-set guest mode when email is entered
    if (name === 'customerEmail' && value && !guestUser?.isGuest) {
      dispatch(setIsGuest(true));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="border-umbra-10 bg-umbra-5 space-y-6 rounded-[10px] border p-4">
      <div>
        <h3 className="text-umbra-100 mb-2 font-sans text-[20px] font-normal">{t('title')}</h3>
        <p className="text-umbra-80 inline-flex flex-wrap items-center gap-2 font-mono text-[11px] whitespace-nowrap">
          {t('description')}{' '}
          <Link href="/login" className="inline-flex items-center gap-1 font-normal underline">
            <ArrowRight size={14} /> {t('createAnAccount')}
          </Link>
        </p>
      </div>

      <div className="space-y-4">
        {/* Customer Email */}
        <div>
          <label className="input-label">{t('customerEmailLabel')}</label>
          <input
            type="email"
            name="customerEmail"
            value={guestUser?.customerEmail || ''}
            onChange={handleGuestFieldChange}
            placeholder={t('customerEmailPlaceholder')}
            className="input-field"
            required
          />
          <p className="text-umbra-60 mt-1 font-mono text-[12px]">{t('customerEmailHelp')}</p>
        </div>

        {/* Customer Password (Optional) */}
        {/* <div>
          <label className="input-label">{t('customerPasswordLabel')}</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="customerPassword"
              value={guestUser?.customerPassword || ''}
              onChange={handleGuestFieldChange}
              placeholder={t('customerPasswordPlaceholder')}
              className="input-field pr-12"
            />
            {guestUser?.customerPassword && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-umbra-60 hover:text-umbra-80 absolute top-1/2 right-3 -translate-y-1/2 transform"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            )}
          </div>
          <p className="text-umbra-60 mt-1 font-mono text-[12px]">
            {guestUser?.customerPassword
              ? t('customerPasswordHelpWithPassword')
              : t('customerPasswordHelpWithoutPassword')}
          </p>
        </div> */}
      </div>

      {/* {guestUser?.customerEmail && (
        <div className="rounded-[10px] border border-blue-200 bg-blue-50 p-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="mt-0.5 h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">{t('guestCheckoutActiveTitle')}</h4>
              <p className="mt-1 text-sm text-blue-700">
                {guestUser?.customerPassword
                  ? t('guestCheckoutActiveWithAccount', { email: guestUser?.customerEmail })
                  : t('guestCheckoutActiveWithoutAccount', { email: guestUser?.customerEmail })}
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default GuestUserForm;
