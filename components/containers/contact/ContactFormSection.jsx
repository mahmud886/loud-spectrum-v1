'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { validateContact } from '@/helpers/validations/contact-validation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

const ContactFormSection = () => {
  const t = useTranslations('ContactPage');

  const [form, setForm] = useState({ name: '', email: '', message: '', is_subscriber: false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({ ...errors, [name]: undefined });
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setSuccess('');

    // Client-side validation with i18n support
    const validation = validateContact(form, (key) => t(`contactForm.${key}`));
    if (!validation.success) {
      const fieldErrors = {};
      validation.errors.forEach((err) => {
        fieldErrors[err.field] = err.message;
      });
      setErrors(fieldErrors);
      toast.error(t('contactForm.toast.validationError.title'), {
        description: t('contactForm.toast.validationError.description'),
      });
      setSubmitting(false);
      return;
    }

    try {
      // Execute both API calls in parallel for better performance
      const [contactResponse, emailResponse] = await Promise.allSettled([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-us`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }),
        fetch('/api/emails/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }),
      ]);

      // Handle contact API response
      let contactSuccess = false;
      let contactData = null;
      if (contactResponse.status === 'fulfilled') {
        contactData = await contactResponse.value.json();
        contactSuccess = contactResponse.value.ok;
      }

      // Handle email API response
      let emailSuccess = false;
      let emailData = null;
      if (emailResponse.status === 'fulfilled') {
        emailData = await emailResponse.value.json();
        emailSuccess = emailResponse.value.ok;
      }

      // Process results - prioritize contact API for validation errors
      if (!contactSuccess && contactData?.errors) {
        const fieldErrors = {};
        contactData.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
        toast.error(t('contactForm.toast.validationError.title'), {
          description: t('contactForm.toast.validationError.description'),
        });
      } else if (!contactSuccess && contactData?.message) {
        setErrors({ general: contactData.message || t('contactForm.toast.contactError.description') });
        toast.error(t('contactForm.toast.contactError.title'), {
          description: contactData.message || t('contactForm.toast.contactError.description'),
        });
      } else if (!emailSuccess && emailData?.message) {
        // Contact succeeded but email failed - still show success but warn about email
        setSuccess(t('contactForm.toast.partialSuccess.description'));
        setForm({ name: '', email: '', message: '', is_subscriber: false });
        toast.warning(t('contactForm.toast.partialSuccess.title'), {
          description: t('contactForm.toast.partialSuccess.description'),
        });
      } else if (contactSuccess) {
        // Contact API succeeded - show success message
        const successMessage = contactData?.message || emailData?.message || t('contactForm.toast.success.description');
        setSuccess(t('contactForm.toast.partialSuccess.description'));
        setForm({ name: '', email: '', message: '', is_subscriber: false });
        toast.success(t('contactForm.toast.success.title'), {
          description: successMessage,
        });
      } else {
        // Both failed
        setErrors({ general: t('contactForm.toast.submissionFailed.description') });
        toast.error(t('contactForm.toast.submissionFailed.title'), {
          description: t('contactForm.toast.submissionFailed.description'),
        });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrors({ general: t('contactForm.toast.networkError.description') });
      toast.error(t('contactForm.toast.networkError.title'), {
        description: t('contactForm.toast.networkError.description'),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-24 md:py-40">
      <div className="container mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="aspect-w-2 aspect-h-3 md:aspect-w-3 md:aspect-h-2">
          <div className="overflow-hidden">
            <Image
              src="/assets/images/contact-image.png"
              alt="contact-image"
              className="h-[540px] w-[600px] object-cover"
              width={600}
              height={540}
            />
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:px-0">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal md:text-[44px]">
                {t('contactForm.title')}
              </h2>
              <p className="text-umbra-100 font-sans text-[16px] leading-[140%] font-normal">
                {t('contactForm.description')}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <p className="text-umbra-100 mb-6 font-sans text-[16px] leading-[140%] font-normal">
                {t('contactForm.requiredNote')}
              </p>
              {errors.general && <div className="mb-2 text-sm text-red-600">{errors.general}</div>}
              {/* {success && <div className="mb-2 text-sm text-green-600">{success}</div>} */}
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="flex-1">
                  <Input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('contactForm.namePlaceholder')}
                    className={`${errors.name ? 'border-red-600' : 'border-umbra-100'} bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal`}
                  />
                  {errors.name && <div className="mt-1 text-xs text-red-600">{errors.name}</div>}
                </div>
                <div className="flex-1">
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('contactForm.emailPlaceholder')}
                    className={`${errors.email ? 'border-red-600' : 'border-umbra-100'} bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal`}
                  />
                  {errors.email && <div className="mt-1 text-xs text-red-600">{errors.email}</div>}
                </div>
              </div>
              <div>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('contactForm.messagePlaceholder')}
                  className={`${errors.message ? 'border-red-600' : 'border-umbra-100'} bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal`}
                />
                {errors.message && <div className="mt-1 text-xs text-red-600">{errors.message}</div>}
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs text-gray-700">
                  <input
                    type="checkbox"
                    name="is_subscriber"
                    checked={form.is_subscriber}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  {t('contactForm.checkboxMessage')}
                </label>
              </div>
              <div className="mt-12">
                <button
                  type="submit"
                  className="main-button-black rounded-full border-1 px-6 py-2"
                  disabled={submitting}
                >
                  {submitting ? t('contactForm.submittingButton') : t('contactForm.submitButton')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
