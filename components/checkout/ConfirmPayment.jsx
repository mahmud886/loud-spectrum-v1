import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const ContinueToPayment = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations('CheckoutPage.ContinueToPayment');

  const handleContinuePayment = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/payment');
    }, 1500);
  };

  return (
    <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
      <div className="flex justify-center">
        <button
          onClick={handleContinuePayment}
          className={`main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-4 transition-colors ${
            loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-umbra-40'
          }`}
          disabled={loading}
        >
          {loading ? t('button.loading') : t('button.default')}
        </button>
      </div>
    </div>
  );
};

export default ContinueToPayment;
