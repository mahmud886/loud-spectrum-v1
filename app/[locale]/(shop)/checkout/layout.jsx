import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
import { useTranslations } from 'next-intl';

const CheckoutLayout = ({ children }) => {
  const t = useTranslations('CheckoutPage');
  return (
    <div className="container">
      <div className="mt-[150px] md:mt-[170px]">
        <div className="mb-6 flex w-full flex-col items-center justify-between md:flex-row">
          <h2 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal md:text-[60px]">
            {t('PageTitle')}
          </h2>
          <DynamicBreadcrumb />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CheckoutLayout;
