import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

const ContactFormSection = () => {
  const t = useTranslations('ContactPage');

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

        <div className="px-6 md:px-0">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-umbra-100 font-sans text-[44px] leading-[120%] font-normal">
                {t('contactForm.title')}
              </h2>
              <p className="text-umbra-100 font-sans text-[16px] leading-[140%] font-normal">
                {t('contactForm.description')}
              </p>
            </div>

            <form className="space-y-4">
              <p className="text-umbra-100 mb-6 font-sans text-[16px] leading-[140%] font-normal">
                {t('contactForm.requiredNote')}
              </p>
              <div className="flex justify-between gap-4">
                <Input
                  type="text"
                  placeholder={t('contactForm.namePlaceholder')}
                  className="bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
                />
                <Input
                  type="email"
                  placeholder={t('contactForm.emailPlaceholder')}
                  className="bg-umbra-5 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
                />
              </div>
              <div>
                <Textarea
                  placeholder={t('contactForm.messagePlaceholder')}
                  className="bg-umbra-5 min-h-[173px] py-2 font-mono text-[16px] leading-[140%] font-normal"
                />
              </div>
              <div className="mt-12">
                <button type="submit" className="main-button-black rounded-full border-1 px-6 py-2">
                  {t('contactForm.submitButton')}
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
