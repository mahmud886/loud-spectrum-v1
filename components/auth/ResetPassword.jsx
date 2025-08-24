'use client';

import { validateResetPassword } from '@/helpers/validations/reset-password-validation';
import { Link } from '@/i18n/navigation';
import { setError, setLoading } from '@/lib/store/slices/authSlice';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const ResetPassword = ({ resetToken, locale }) => {
  const t = useTranslations('ResetPasswordPage.ResetPassword');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setErrors({});

    const formData = new FormData(e.target);
    const data = {
      new_password: formData.get('password'),
      confirm_password: formData.get('confirmPassword'),
      reset_link: resetToken,
    };

    const validation = validateResetPassword(data);

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
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: data.new_password,
          confirm_password: data.confirm_password,
          reset_link: data.reset_link,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(t('request_failed'));
        dispatch(setError(errorData.message || 'Failed to reset password'));
        dispatch(setLoading(false));
        return;
      }

      toast.success(t('request_success'));
      setIsSubmitted(true);
      dispatch(setLoading(false));
    } catch (error) {
      toast.error(t('request_failed'));
      dispatch(setError('An unexpected error occurred'));
      dispatch(setLoading(false));
    }
  };

  // Show error if no token is provided
  if (!resetToken) {
    return (
      <div className="mt-10 max-w-full">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-umbra-100 font-sans text-[20px] font-normal">{t('invalid_token_title')}</h3>
            <p className="text-umbra-60 font-sans text-[16px] font-normal">{t('invalid_token_description')}</p>
          </div>
          <Link
            href="/forgot-password"
            className="text-umbra-100 hover:text-umbra-60 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            {t('request_new_reset')}
          </Link>
        </div>
      </div>
    );
  }

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
          <label className="input-label">{t('passwordLabel')}</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={t('passwordPlaceholder')}
              className={`input-field ${errors.password ? 'border border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              aria-label={t('togglePassword')}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div>
          <label className="input-label">{t('confirmPasswordLabel')}</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder={t('confirmPasswordPlaceholder')}
              className={`input-field ${errors.confirmPassword ? 'border border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              aria-label={t('toggleConfirmPassword')}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          {errors.token && <p className="mt-1 text-sm text-red-500">{errors.token}</p>}
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
                <span>{t('resetting')}</span>
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

export default ResetPassword;
