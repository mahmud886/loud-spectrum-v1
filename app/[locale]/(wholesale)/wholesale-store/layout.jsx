// MOVED: Original file archived to _wholesale-store/layout.jsx
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
import { useTranslations } from 'next-intl';

const WholesaleStoreLayout = ({ children }) => {
  const t = useTranslations('WholesaleStore');
  return (
    <div className="container">
      <div className="mt-[120px] xl:mt-[140px]">
        <div className="mb-6 flex w-full flex-col items-start justify-between gap-4 xl:flex-row xl:items-center">
          <h1 className="text-umbra-100 font-sans text-[28px] leading-[120%] font-medium sm:text-[32px] md:text-[40px] xl:text-[48px]">
            {t('title')}
          </h1>
          <div className="w-full xl:w-auto">
            <DynamicBreadcrumb />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default WholesaleStoreLayout;
