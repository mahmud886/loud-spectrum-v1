'use client';

import { authenticateUser } from '@/app/actions/auth';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from '@/i18n/navigation';
import { selectIsAuthenticated, setCredentials } from '@/lib/store/slices/authSlice';
import { clearCheckoutOnLogin } from '@/lib/store/slices/checkoutSlice';
import { getCountries } from '@/services/location-services';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { z } from 'zod';

const WholesaleRegistrationForm = ({ id }) => {
  const t = useTranslations('Wholesale');
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const wholesaleRegistrationSchema = z.object({
    name: z.string().min(1, t('wholesaleRegistrationForm.full_name_error')),
    email: z.string().email(t('wholesaleRegistrationForm.email_error')),
    phone_number: z.string().min(1, t('wholesaleRegistrationForm.phone_number_error')),
    username: z.string().min(3, t('wholesaleRegistrationForm.username_error')),
    company: z.string().optional(),
    website: z.string().url(t('wholesaleRegistrationForm.website_error')).optional().or(z.literal('')),
    country: z.string().min(1, t('wholesaleRegistrationForm.country_error')),
    password: z.string().min(6, t('wholesaleRegistrationForm.password_error')),
    terms: z.boolean().refine((val) => val === true, {
      message: t('wholesaleRegistrationForm.agree_terms_error'),
    }),
  });

  // Load countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        const countryOptions = data.map((country) => ({
          value: country.name,
          label: country.name,
        }));
        // Sort countries alphabetically
        countryOptions.sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryOptions);
      } catch (error) {
        toast.error('Failed to load countries');
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.target);
    const formValues = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone_number: formData.get('phone_number'),
      username: formData.get('username'),
      company: formData.get('company') || '',
      website: formData.get('website') || '',
      country: selectedCountry || formData.get('country') || '',
      password: formData.get('password'),
      terms: agree,
      role: 'wholesaler',
      status: 'Active',
    };

    try {
      const validatedData = wholesaleRegistrationSchema.parse(formValues);

      // Only send required fields to the API
      const apiPayload = {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
        phone_number: validatedData.phone_number,
        username: validatedData.username,
        role: 'wholesaler',
        status: 'Active',
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // if (isAuthenticated) {
      //   try {
      //     const response = await fetch('/api/auth/logout', {
      //       method: 'POST',
      //     });

      //     if (response.ok) {
      //       dispatch(logout());
      //       dispatch(clearCheckoutOnLogin());
      //       // Optionally, you can show a toast or not
      //       // toast.success(t('Navbar.logout_success'));
      //     }
      //   } catch (error) {
      //     // Optionally, you can show a toast or not
      //     // toast.error(t('Navbar.logout_failed'));
      //     console.error('Logout failed:', error);
      //   }
      // }
      // direct login after register
      await authenticateUser(formData);
      // registration suceesfull then clear the checkout state
      dispatch(clearCheckoutOnLogin());
      // set the user credentials

      dispatch(
        setCredentials({
          id: result?.data?.id || '',
          name: result?.data?.name || validatedData?.name,
          email: result?.data?.email || validatedData?.email,
          phone_number: result?.data?.phone_number || validatedData?.phone_number,
          role: result?.data?.role || 'wholesaler',
          status: result?.data?.status || '',
          token: result?.data?.token || '',
        }),
      );

      toast.success(result?.message || 'Registration successful!', {
        description: result?.data?.status,
      });

      router.push(`/wholesale-registration#wholesale-under-review`);

      await fetch('/api/emails/wholesale-registration/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationData: { ...formValues, id: result?.data?.id, status: 'Under Review' },
          recipient: validatedData.email,
        }),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0];
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);

        toast.error('Validation Error', {
          description: 'Please check the form for errors.',
        });
      } else {
        setErrors({ submit: error.message || 'Registration failed. Please try again.' });

        toast.error('Registration Failed', {
          description: error.message || 'Something went wrong. Please try again later.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-[80px]" id={id || 'wholesale-form'}>
      <div className="xl:px-0">
        <div className="space-y-12">
          <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal xl:text-[44px]">
            {t('wholesaleRegistrationForm.formTitle')}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <p className="text-umbra-100 mb-6 font-sans text-[16px] leading-[140%] font-normal">
              {t('wholesaleRegistrationForm.requiredFields')}
            </p>

            {/* Row 1: Full Name, Company */}
            <div className="flex flex-col justify-between gap-4 xl:flex-row">
              <div className="w-full">
                <input
                  name="name"
                  type="text"
                  placeholder={`${t('wholesaleRegistrationForm.fullName')} *`}
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="w-full">
                <input
                  name="company"
                  type="text"
                  placeholder={`${t('wholesaleRegistrationForm.company')} (${t('wholesaleRegistrationForm.optional')})`}
                  className={`input-field ${errors.company ? 'border-red-500' : ''}`}
                />
                {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
              </div>
            </div>

            {/* Row 2: Phone, Email */}
            <div className="flex flex-col justify-between gap-4 xl:flex-row">
              <div className="w-full">
                <input
                  name="phone_number"
                  type="tel"
                  placeholder={`${t('wholesaleRegistrationForm.phone')} *`}
                  className={`input-field ${errors.phone_number ? 'border-red-500' : ''}`}
                  required
                />
                {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
              </div>
              <div className="w-full">
                <input
                  name="email"
                  type="email"
                  placeholder={`${t('wholesaleRegistrationForm.email')} *`}
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* Row 3: Website, Country */}
            <div className="flex flex-col justify-between gap-4 xl:flex-row">
              <div className="w-full">
                <input
                  name="website"
                  type="url"
                  placeholder={`${t('wholesaleRegistrationForm.website')} (${t('wholesaleRegistrationForm.optional')})`}
                  className={`input-field ${errors.website ? 'border-red-500' : ''}`}
                />
                {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
              </div>
              <div className="w-full">
                <Select
                  name="country"
                  value={selectedCountry}
                  onValueChange={(value) => setSelectedCountry(value)}
                  required
                >
                  <SelectTrigger
                    className={`bg-umbra-5 hover:bg-umbra-10 text-umbra-100 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] font-normal ${
                      errors.country ? 'border-red-500' : ''
                    }`}
                  >
                    <SelectValue placeholder={`${t('wholesaleRegistrationForm.country')} *`} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Hidden input for form submission */}
                <input type="hidden" name="country" value={selectedCountry} />
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
            </div>

            {/* Row 4: Username, Password */}
            <div className="flex flex-col justify-between gap-4 xl:flex-row">
              <div className="w-full">
                <input
                  name="username"
                  type="text"
                  placeholder={`${t('wholesaleRegistrationForm.username')} *`}
                  className={`input-field ${errors.username ? 'border-red-500' : ''}`}
                  required
                />
                {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
              </div>
              <div className="relative w-full">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={`${t('wholesaleRegistrationForm.password')} *`}
                  className={`input-field pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Checkbox id="terms" checked={agree} onCheckedChange={(checked) => setAgree(!!checked)} />
              <label htmlFor="terms" className="text-umbra-100 font-sans text-[14px] leading-[140%]">
                {t('wholesaleRegistrationForm.agreeTerms')}
              </label>
            </div>
            {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}

            {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

            <div className="mt-12">
              <button
                type="submit"
                disabled={isSubmitting}
                className="main-button-black rounded-full border-1 px-6 py-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? t('wholesaleRegistrationForm.registering')
                  : t('wholesaleRegistrationForm.registerButton')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WholesaleRegistrationForm;
