import { useRouter } from '@/i18n/navigation';
import {
  selectIsProcessing,
  setIsProcessing,
  setShowCardDialog,
  setShowWireDialog,
} from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import FullPageLoader from '../ui/FullPageLoader';

const ConfirmPayment = ({
  onProcessPayment,
  isLoading = false,
  selectedPaymentMethod,
  isDisabled = false,
  getMissingFieldsMessage = () => [],
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations('CheckoutPage.ContinueToPayment');
  const isProcessing = useSelector(selectIsProcessing);

  const handleContinuePayment = async () => {
    if (!selectedPaymentMethod) {
      toast.error(t('toast.paymentMethodRequired.title'), {
        description: t('toast.paymentMethodRequired.description'),
        duration: 4000,
      });
      return;
    }

    // Show missing fields if button is disabled
    if (isDisabled) {
      const missingFields = getMissingFieldsMessage();
      if (missingFields.length > 0) {
        const displayFields = missingFields.slice(0, 3);
        const remainingCount = missingFields.length - displayFields.length;

        toast.error(t('toast.completeRequiredInfo.title'), {
          description: t('toast.completeRequiredInfo.description', {
            fields: displayFields.join(', '),
            remaining: remainingCount > 0 ? ` and ${remainingCount} more field${remainingCount > 1 ? 's' : ''}` : '',
          }),
          duration: 5000,
          action: {
            label: t('toast.completeRequiredInfo.showAllLabel'),
            onClick: () => {
              toast.info(t('toast.completeRequiredInfo.allFieldsTitle'), {
                description: missingFields.join(', '),
                duration: 8000,
              });
            },
          },
        });
      } else {
        toast.error(t('toast.formValidationError.title'), {
          description: t('toast.formValidationError.description'),
          duration: 4000,
        });
      }
      return; // Don't proceed with payment if disabled
    }

    // Proceed with payment method specific logic only if not disabled
    try {
      if (selectedPaymentMethod === 'cash-on-delivery') {
        // Process cash on delivery payment
        if (onProcessPayment) {
          // Set processing state to show full page loader
          dispatch(setIsProcessing(true));
          await onProcessPayment();
          // Note: Processing state will be cleared by the parent component after successful order completion
        } else {
          toast.error(t('toast.paymentProcessingError.title'), {
            description: t('toast.paymentProcessingError.description'),
            duration: 4000,
          });
        }
      } else if (selectedPaymentMethod === 'debit-credit-card') {
        // Open card payment dialog
        dispatch(setShowCardDialog(true));
        toast.info(t('toast.cardPayment.title'), {
          description: t('toast.cardPayment.description'),
          duration: 3000,
        });
      } else if (selectedPaymentMethod === 'ach-wire-transfer') {
        // Open wire transfer dialog
        dispatch(setShowWireDialog(true));
        toast.info(t('toast.wireTransfer.title'), {
          description: t('toast.wireTransfer.description'),
          duration: 3000,
        });
      } else {
        // Fallback - navigate to payment page
        dispatch(setIsProcessing(true));
        router.push('/payment');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      // Clear processing state on error
      dispatch(setIsProcessing(false));
      toast.error(t('toast.paymentError.title'), {
        description: t('toast.paymentError.description'),
        duration: 5000,
      });
    }
  };

  // Get button text based on state
  const getButtonText = () => {
    if (isLoading) return t('button.loading');
    if (isDisabled) {
      const missingFields = getMissingFieldsMessage();
      if (missingFields.length > 0) {
        return t('validation.completeFields', {
          count: missingFields.length,
          plural: missingFields.length > 1 ? 's' : '',
        });
      }
    }

    // Show different text based on selected payment method
    if (selectedPaymentMethod === 'cash-on-delivery') {
      return t('button.cashOnDelivery');
    } else if (selectedPaymentMethod === 'debit-credit-card') {
      return t('button.cardPayment');
    } else if (selectedPaymentMethod === 'ach-wire-transfer') {
      return t('button.wireTransfer');
    }

    return t('button.default');
  };

  // Get full page loading props based on payment method
  const getFullPageLoadingProps = () => {
    if (selectedPaymentMethod === 'cash-on-delivery') {
      return {
        title: t('fullPageLoader.cashOnDelivery.title'),
        description: t('fullPageLoader.cashOnDelivery.description'),
      };
    }
    if (selectedPaymentMethod === 'debit-credit-card') {
      return {
        title: t('fullPageLoader.cardPayment.title'),
        description: t('fullPageLoader.cardPayment.description'),
      };
    }
    if (selectedPaymentMethod === 'ach-wire-transfer') {
      return {
        title: t('fullPageLoader.wireTransfer.title'),
        description: t('fullPageLoader.wireTransfer.description'),
      };
    }
    return {
      title: t('fullPageLoader.default.title'),
      description: t('fullPageLoader.default.description'),
    };
  };

  return (
    <>
      {/* Full Page Loader */}
      <FullPageLoader isVisible={isProcessing} {...getFullPageLoadingProps()} />

      <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
        {/* Show missing fields information when disabled */}
        {/* {isDisabled && !isLoading && (
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
                <h3 className="text-sm font-medium text-amber-800">{t('missingFields.header')}</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>{t('missingFields.instruction')}</p>
                  <ul className="mt-1 list-inside list-disc">
                    {getMissingFieldsMessage()
                      .slice(0, 5)
                      .map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                    {getMissingFieldsMessage().length > 5 && (
                      <li>{t('missingFields.andMore', { count: getMissingFieldsMessage().length - 5 })}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* Helpful Notice */}
        <div className="rounded-md border border-green-200 bg-green-50 p-3">
          <div className="flex items-start">
            <div className="ml-3">
              <p className="text-sm text-green-800">{t('helpfulNotice')}</p>
            </div>
          </div>
        </div>

        {/* Fraud Warning Notice */}
        <div className="rounded-md border border-red-200 bg-red-50 p-3">
          <div className="flex items-start">
            <div className="ml-3">
              <p className="text-sm text-red-800">{t('fraudWarning')}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleContinuePayment}
            className={`main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-4 transition-all duration-200 ${
              isLoading || isDisabled || isProcessing
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-umbra-40 hover:shadow-lg active:scale-95'
            }`}
            disabled={isLoading || isDisabled || isProcessing}
            title={
              isDisabled
                ? t('validation.missingTooltip', {
                    fields: getMissingFieldsMessage().slice(0, 2).join(', '),
                    more: getMissingFieldsMessage().length > 2 ? '...' : '',
                  })
                : ''
            }
          >
            {(isLoading || isProcessing) && (
              <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {getButtonText()}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmPayment;
