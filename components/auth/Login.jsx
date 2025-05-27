'use client';

import { validateLogin } from '@/helpers/validations/login-validation';
import { setCredentials, setError, setLoading } from '@/lib/store/slices/authSlice';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Login = () => {
  const t = useTranslations('LoginPage.Login');
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setErrors({});

    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    // Client-side validation
    const validation = validateLogin(data);

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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        dispatch(setError(result.message || 'Authentication failed'));
        return;
      }

      // Update Redux store with user data
      dispatch(setCredentials(result.data));

      // Redirect to the original requested page or home page
      const redirectTo = searchParams.get('from') || '/';
      router.push(redirectTo);
    } catch (error) {
      dispatch(setError('An unexpected error occurred'));
    }
  };

  return (
    <div className="mt-10 max-w-full">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('emailLabel')}</label>
          <input
            type="email"
            name="email"
            placeholder={t('emailPlaceholder')}
            className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal ${errors.email ? 'border border-red-500' : ''}`}
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('passwordLabel')}</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={t('passwordPlaceholder')}
              className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 pr-10 font-mono text-[16px] leading-[140%] font-normal ${errors.password ? 'border border-red-500' : ''}`}
              required
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

        <div className="mt-6 w-full">
          <button
            type="submit"
            className="main-button-black w-full rounded-full border border-black bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('loginButton')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
