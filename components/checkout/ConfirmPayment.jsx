import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const ConfirmPayment = ({ onProcessPayment, isLoading = false, selectedPaymentMethod }) => {
  const router = useRouter();
  const t = useTranslations('CheckoutPage.ContinueToPayment');

  const handleContinuePayment = async () => {
    if (!selectedPaymentMethod) {
      toast.error('Payment Method Required', {
        description: 'Please select a payment method first',
        duration: 4000,
      });
      return;
    }

    if (selectedPaymentMethod === 'cash-on-delivery') {
      // Process cash on delivery payment
      if (onProcessPayment) {
        await onProcessPayment();
      }
    } else if (selectedPaymentMethod === 'debit-credit-card') {
      // Card dialog should handle Square payment processing
      toast.warning('Complete Card Information', {
        description: 'Please complete the card payment form',
        duration: 4000,
      });
    } else if (selectedPaymentMethod === 'ach-wire-transfer') {
      // Wire transfer dialog should handle wire transfer processing
      toast.warning('Complete Wire Transfer Information', {
        description: 'Please complete the wire transfer form',
        duration: 4000,
      });
    } else {
      // Fallback - navigate to payment page
      router.push('/payment');
    }
  };

  return (
    <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
      <div className="flex justify-center">
        <button
          onClick={handleContinuePayment}
          className={`main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-4 transition-colors ${
            isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-umbra-40'
          }`}
          disabled={isLoading || !selectedPaymentMethod}
        >
          {isLoading ? t('button.loading') : t('button.default')}
        </button>
      </div>
    </div>
  );
};

export default ConfirmPayment;
