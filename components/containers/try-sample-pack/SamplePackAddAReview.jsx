import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

const SamplePackAddAReview = () => {
  const t = useTranslations('ContactPage');
  return (
    <div className={'container py-[80px]'}>
      <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal md:text-[44px]">Add a Review</h2>
      <div className="mt-6 w-full md:w-[60%]">
        <form className="space-y-4">
          <div className="mb-6 space-y-4">
            <p className="text-umbra-100 font-sans text-[16px] leading-[140%] font-normal">
              {t('contactForm.requiredNote')}
            </p>
            <p className="text-umbra-40 font-sans text-[16px] leading-[140%] font-normal">
              Your email address will not be published.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <Input
              type="text"
              placeholder={t('contactForm.namePlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
            />
            <Input
              type="email"
              placeholder={t('contactForm.emailPlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 min-h-[48px] py-2 font-mono text-[16px] leading-[140%] font-normal"
            />
          </div>
          <div>
            <Textarea
              placeholder={t('contactForm.messagePlaceholder')}
              className="bg-umbra-5 placeholder:text-umbra-100 min-h-[173px] py-2 font-mono text-[16px] leading-[140%] font-normal"
            />
          </div>
          <div className="flex items-center justify-start gap-4">
            <p>Select Rating: </p> <img src="/assets/svgs/Rating.svg" alt="Rating" />
          </div>
          <div className="mt-12">
            <button type="submit" className="main-button-black rounded-full border-1 px-6 py-2">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SamplePackAddAReview;
