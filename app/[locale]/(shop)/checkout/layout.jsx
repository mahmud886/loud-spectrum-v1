import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
import { useTranslations } from 'next-intl';

const metadataByLocale = {
  en: {
    title: 'Checkout | Loud Spectrum',
    description: 'Complete your purchase securely at Loud Spectrum',
  },
  es: {
    title: 'Pago | Loud Spectrum',
    description: 'Complete su compra de forma segura en Loud Spectrum',
  },
  fr: {
    title: 'Paiement | Loud Spectrum',
    description: 'Finalisez votre achat en toute sécurité sur Loud Spectrum',
  },
  ja: {
    title: 'チェックアウト | Loud Spectrum',
    description: 'Loud Spectrumで安全にお支払いを完了してください',
  },
  ru: {
    title: 'Оформление заказа | Loud Spectrum',
    description: 'Безопасно завершите покупку на Loud Spectrum',
  },
  de: {
    title: 'Kasse | Loud Spectrum',
    description: 'Schließen Sie Ihren Einkauf sicher bei Loud Spectrum ab',
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const metadata = metadataByLocale[locale] || metadataByLocale.en;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      locale: locale,
      url: 'https://loudspectrum.com',
      siteName: 'Loud Spectrum',
    },
  };
}

const CheckoutLayout = ({ children }) => {
  const t = useTranslations('CheckoutPage');
  return (
    <div className="container">
      <div className="mt-[150px] xl:mt-[170px]">
        <div className="mb-6 flex w-full flex-col items-center justify-between xl:flex-row">
          <h2 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal xl:text-[60px]">
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
