import { AlertTriangle, RefreshCcw, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ShippingReturnsPage = () => {
  const t = useTranslations();

  const shippingReturnsSections = [
    {
      icon: <Truck className="text-umbra-100 mr-3 text-2xl" />, // Shipping Policy
      title: t('ShippingReturns.ShippingPolicy.title'),
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>{t('ShippingReturns.ShippingPolicy.globalShipping')}</li>
          <li>
            {t('ShippingReturns.ShippingPolicy.shippingOptionsTitle')}
            <ul className="list-disc pl-5">
              <li>{t('ShippingReturns.ShippingPolicy.under100')}</li>
              <li>{t('ShippingReturns.ShippingPolicy.over100')}</li>
              <li>{t('ShippingReturns.ShippingPolicy.expedited')}</li>
            </ul>
          </li>
          <li>{t('ShippingReturns.ShippingPolicy.processingTime')}</li>
        </ul>
      ),
    },
    {
      icon: <RefreshCcw className="text-umbra-100 mr-3 text-2xl" />, // Refunds & Returns
      title: t('ShippingReturns.RefundsReturns.title'),
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>{t('ShippingReturns.RefundsReturns.allSalesFinal')}</li>
          <li>
            {t('ShippingReturns.RefundsReturns.returnEligibilityTitle')}
            <ul className="list-disc pl-5">
              <li>{t('ShippingReturns.RefundsReturns.unopened')}</li>
              <li>{t('ShippingReturns.RefundsReturns.returnShippingCost')}</li>
              <li>{t('ShippingReturns.RefundsReturns.noOpenedReturns')}</li>
              <li>{t('ShippingReturns.RefundsReturns.noCustomRefund')}</li>
            </ul>
          </li>
          <li>{t('ShippingReturns.RefundsReturns.returnProcess')}</li>
        </ul>
      ),
    },
    {
      icon: <AlertTriangle className="text-umbra-100 mr-3 text-2xl" />, // Important Notes
      title: t('ShippingReturns.ImportantNotes.title'),
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li>{t('ShippingReturns.ImportantNotes.domesticOrders')}</li>
          <li>{t('ShippingReturns.ImportantNotes.damagedReport')}</li>
          <li>{t('ShippingReturns.ImportantNotes.questions')}</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="container mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[85%] text-center font-sans text-[35px] leading-[120%] font-normal xl:w-[55%] xl:text-[60px]">
          {t('Shipping_&_Returns')}
        </h2>
      </div>
      <div className="flex min-h-screen w-full items-center justify-center bg-white py-12">
        <div className="w-full rounded-2xl bg-white">
          <p className="text-umbra-40 mb-8 text-center">{t('Thank_you_for_choosing_Loud_Spectrum')}</p>
          <div className="space-y-8">
            {shippingReturnsSections.map((section, idx) => (
              <div key={section.title}>
                <div className="mb-2 flex items-center">
                  {section.icon}
                  <h2 className="text-umbra-100 text-2xl font-semibold">{section.title}</h2>
                </div>
                <div className="text-umbra-100 font-mono text-base leading-relaxed">{section.content}</div>
                {idx !== shippingReturnsSections.length - 1 && <div className="border-umbra-10 my-6 border-b" />}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-umbra-40 text-sm">
              {t('For_any_questions_or_support')}
              <a href="mailto:hi@loudspectrum.com" className="text-blue-600 underline">
                hi@loudspectrum.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
