import SpectrumAccordion from '@/components/containers/SpectrumAccordion';
import { getTranslations } from 'next-intl/server';

const FaqPage = async () => {
  const t = await getTranslations('FAQPage');
  const faqItems = await t.raw('items');
  return (
    <div className="mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[85%] text-center font-sans text-[35px] leading-[120%] font-normal xl:w-[35%] xl:text-[60px]">
          {t('title')}
        </h2>
      </div>
      <div className="pt-20">
        <SpectrumAccordion items={faqItems} />
      </div>
    </div>
  );
};

export default FaqPage;
