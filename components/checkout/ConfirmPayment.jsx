import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const ConfirmPayment = ({
  onProcessPayment,
  isLoading = false,
  selectedPaymentMethod,
  isDisabled = false,
  getMissingFieldsMessage = () => [],
}) => {
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

    // Show missing fields if button is disabled
    if (isDisabled) {
      const missingFields = getMissingFieldsMessage();
      if (missingFields.length > 0) {
        toast.error('Complete Required Information', {
          description: `Please fill in: ${missingFields.slice(0, 3).join(', ')}${missingFields.length > 3 ? '...' : ''}`,
          duration: 4000,
        });
        return;
      }
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

  // Get button text based on state
  const getButtonText = () => {
    if (isLoading) return t('button.loading');
    if (isDisabled) {
      const missingFields = getMissingFieldsMessage();
      if (missingFields.length > 0) {
        return `Complete ${missingFields.length} Required Field${missingFields.length > 1 ? 's' : ''}`;
      }
    }
    return t('button.default');
  };

  return (
    <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
      {/* Show missing fields information when disabled */}
      {isDisabled && !isLoading && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Complete Required Information</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>Please fill in the following required fields:</p>
                <ul className="mt-1 list-inside list-disc">
                  {getMissingFieldsMessage()
                    .slice(0, 5)
                    .map((field, index) => (
                      <li key={index}>{field}</li>
                    ))}
                  {getMissingFieldsMessage().length > 5 && <li>and {getMissingFieldsMessage().length - 5} more...</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleContinuePayment}
          className={`main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-4 transition-colors ${
            isLoading || isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-umbra-40'
          }`}
          disabled={isLoading || isDisabled}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default ConfirmPayment;
