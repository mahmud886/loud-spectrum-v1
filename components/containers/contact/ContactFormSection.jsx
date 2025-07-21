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

  const [form, setForm] = useState({ name: '', email: '', message: '', subscribe: false });
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

    // Client-side validation
    const validation = validateContact(form);
    let subscribeError = '';
    if (!form.subscribe) {
      subscribeError = 'You must agree to receive occasional updates and marketing emails.';
    }
    if (!validation.success || subscribeError) {
      const fieldErrors = {};
      if (!validation.success) {
        validation.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
      }
      if (subscribeError) {
        fieldErrors.subscribe = subscribeError;
      }
      setErrors(fieldErrors);
      toast.error('Validation Error', {
        description: 'Please check the form for errors.',
      });
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/emails/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          const fieldErrors = {};
          data.errors.forEach((err) => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(fieldErrors);
          toast.error('Validation Error', {
            description: 'Please check the form for errors.',
          });
        } else {
          setErrors({ general: data.message || 'Something went wrong.' });
          toast.error('Error', {
            description: data.message || 'Something went wrong.',
          });
        }
      } else {
        setSuccess(data.message || 'Message sent!');
        setForm({ name: '', email: '', message: '', subscribe: false });
        toast.success(data.message || 'Message sent!');
      }
    } catch (err) {
      setErrors({ general: 'Failed to send message.' });
      toast.error('Failed to send message.');
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
              {success && <div className="mb-2 text-sm text-green-600">{success}</div>}
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="flex-1">
                  <Input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('contactForm.namePlaceholder')}
                    className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
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
                    className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
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
                  className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[173px] py-2 font-mono text-[16px] leading-[140%] font-normal"
                />
                {errors.message && <div className="mt-1 text-xs text-red-600">{errors.message}</div>}
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs text-gray-700">
                  <input
                    type="checkbox"
                    name="subscribe"
                    checked={form.subscribe}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  {t('contactForm.checkboxMessage')}
                </label>
                {errors.subscribe && <div className="mt-1 text-xs text-red-600">{errors.subscribe}</div>}
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
