'use client';

import { authenticateUser } from '@/app/actions/auth';
import { registerSchema } from '@/helpers/validations/register-validation';
import { setCredentials } from '@/lib/store/slices/authSlice';
import { clearCheckoutOnLogin } from '@/lib/store/slices/checkoutSlice';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { z } from 'zod';
import { Checkbox } from '../ui/checkbox';
import HashLink from '../ui/hash-link';

const Register = () => {
  const t = useTranslations('LoginPage.Registration');
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.target);
    const formValues = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      phone_number: formData.get('phone_number'),
      company: formData.get('company'),
      website: formData.get('website'),
      terms: agree,
      role: 'customer',
      status: 'Active',
      is_deleted: false,
    };

    try {
      const validatedData = registerSchema.parse(formValues);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }
      // direct login after register
      await authenticateUser(formData);
      // registration suceesfull then clear the checkout state
      dispatch(clearCheckoutOnLogin());
      // set the user credentials
      dispatch(
        setCredentials({
          id: result?.data?._id || '',
          name: result?.data?.name || formData?.get('name') || '',
          email: result?.data?.email || formData?.get('email') || '',
          phone_number: result?.data?.phone_number || formData?.get('phone_number') || '',
          role: result?.data?.role || 'customer',
          status: result?.data?.status || 'Active',
          token: result?.data?.token || '',
        }),
      );

      // Show success toast
      toast.success('Registration successful!', {
        description: 'You can now log in to your account.',
      });

      // Redirect to login page after successful registration
      router.push('/account');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const formattedErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0];
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);

        // Show validation error toast
        toast.error('Validation Error', {
          description: 'Please check the form for errors.',
        });
      } else {
        setErrors({ submit: error.message || 'Registration failed. Please try again.' });

        // Show general error toast
        toast.error('Registration Failed', {
          description: error.message || 'Something went wrong. Please try again later.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 max-w-full">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('fullNameLabel')}</label>
            <input
              name="name"
              type="text"
              placeholder={t('fullNamePlaceholder')}
              className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] border px-4 py-2 font-mono text-[16px] leading-[140%] font-normal ${
                errors.name ? 'border-red-500' : 'border-transparent'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('phoneLabel')}</label>
            <input
              name="phone_number"
              type="tel"
              placeholder={t('phonePlaceholder')}
              className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] border px-4 py-2 font-mono text-[16px] leading-[140%] font-normal ${
                errors.phone_number ? 'border-red-500' : 'border-transparent'
              }`}
            />
            {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
          </div>
        </div>

        {/* Email & Company */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('emailLabel')}</label>
            <input
              name="email"
              type="email"
              placeholder={t('emailPlaceholder')}
              className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] border px-4 py-2 font-mono text-[16px] leading-[140%] font-normal ${
                errors.email ? 'border-red-500' : 'border-transparent'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('companyLabel')}</label>
            <input
              name="company"
              type="text"
              placeholder={t('companyPlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] border border-transparent px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('websiteLabel')}</label>
          <input
            name="website"
            type="url"
            placeholder={t('websitePlaceholder')}
            className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] border px-4 py-2 font-mono text-[16px] leading-[140%] font-normal ${
              errors.website ? 'border-red-500' : 'border-transparent'
            }`}
          />
          {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('passwordLabel')}</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] border px-4 py-2 pr-10 font-mono text-[16px] leading-[140%] font-normal ${
                  errors.password ? 'border-red-500' : 'border-transparent'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
              {t('confirmPasswordLabel')}
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('confirmPasswordPlaceholder')}
                className={`bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] border px-4 py-2 pr-10 font-mono text-[16px] leading-[140%] font-normal ${
                  errors.confirmPassword ? 'border-red-500' : 'border-transparent'
                }`}
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
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox id="terms" checked={agree} onCheckedChange={(checked) => setAgree(!!checked)} />
          <label htmlFor="terms" className="text-umbra-100 font-sans text-[14px] leading-[140%]">
            {t('agreeTerms')}
          </label>
        </div>
        {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}

        {/* Error message for submission */}
        {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="main-button-black w-full rounded-full border border-black bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : t('registerButton')}
          </button>
          <HashLink
            href="/wholesale-registration#wholesale-form"
            type="button"
            className="main-button-white hover:bg-umbra-10 inline-flex w-full items-center justify-center rounded-full border border-black bg-transparent px-6 py-3 text-black transition"
          >
            {t('wholesalerButton')}
          </HashLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
