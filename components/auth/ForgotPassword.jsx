'use client';

import { validateForgotPassword } from '@/helpers/validations/forgot-password-validation';
import { Link, useRouter } from '@/i18n/navigation';
import { setError, setLoading } from '@/lib/store/slices/authSlice';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const ForgotPassword = ({ locale }) => {
  const t = useTranslations('ForgotPasswordPage.ForgotPassword');
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setErrors({});

    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      locale: locale,
    };

    // Client-side validation
    const validation = validateForgotPassword(data);

    if (!validation.success) {
      const newErrors = {};
      validation.error.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      dispatch(setLoading(false));
      return;
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(t('request_failed'));
        dispatch(setError(result.message || 'Failed to send reset email'));
        dispatch(setLoading(false));
        return;
      }

      toast.success(t('request_success'));

      // Check if response contains a reset token for immediate redirect
      if (result.data && result.data.token) {
        // If API returns a token, redirect to reset password page
        router.push(`/${locale}/reset-password/${result.data.token}`);
      } else {
        // Otherwise show the success message
        setIsSubmitted(true);
      }

      dispatch(setLoading(false));
    } catch (error) {
      toast.error(t('request_failed'));
      dispatch(setError('An unexpected error occurred'));
      dispatch(setLoading(false));
    }
  };

  if (isSubmitted) {
    return (
      <div className="mt-10 max-w-full">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-umbra-100 font-sans text-[20px] font-normal">{t('success_title')}</h3>
            <p className="text-umbra-60 font-sans text-[16px] font-normal">{t('success_description')}</p>
          </div>
          <Link
            href="/login"
            className="text-umbra-100 hover:text-umbra-60 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            {t('back_to_login')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-full">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="input-label">{t('emailLabel')}</label>
          <input
            type="email"
            name="email"
            placeholder={t('emailPlaceholder')}
            className={`input-field ${errors.email ? 'border border-red-500' : ''}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="mt-6 w-full">
          <button
            type="submit"
            disabled={loading}
            className="main-button-black w-full rounded-full border border-black bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{t('sending')}</span>
              </div>
            ) : (
              t('submitButton')
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-umbra-100 hover:text-umbra-60 inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={16} />
          {t('back_to_login')}
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
