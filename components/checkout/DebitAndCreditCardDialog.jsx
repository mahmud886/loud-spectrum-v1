'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  selectBillingAddress,
  selectIsProcessing,
  selectOrderSummary,
  selectShippingAddress,
} from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { toast } from 'sonner';
import FullPageLoader from '../ui/FullPageLoader';

const DebitCreditCardDialog = ({ open, onClose, onSubmit }) => {
  const t = useTranslations('CheckoutPage.PaymentDialog');
  const [isFormReady, setIsFormReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get billing address, shipping address, order summary, and global processing state from Redux
  const billingAddress = useSelector(selectBillingAddress);
  const shippingAddress = useSelector(selectShippingAddress);
  const orderSummary = useSelector(selectOrderSummary);
  const isGlobalProcessing = useSelector(selectIsProcessing);

  // Use billing address if not same as shipping, otherwise use shipping address
  const addressToUse = billingAddress.sameAsShipping ? shippingAddress : billingAddress;

  // Convert total to cents for Square
  const amountInCents = Math.round((orderSummary.total || 0) * 100);

  // Reset form state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setIsFormReady(false);
      setIsProcessing(false);
      // Add a small delay to ensure dialog is fully rendered
      const timer = setTimeout(() => {
        setIsFormReady(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsFormReady(false);
      setIsProcessing(false);
    }
  }, [open]);

  const createVerificationDetails = () => ({
    amount: amountInCents.toString(),
    billingContact: {
      addressLines: [addressToUse.streetAddress || ''],
      familyName: addressToUse.lastName || '',
      givenName: addressToUse.firstName || '',
      // Square expects 2-letter country codes
      countryCode:
        addressToUse.country === 'United States' ? 'US' : addressToUse.country === 'United Kingdom' ? 'GB' : 'US',
      city: addressToUse.city || '',
      postalCode: addressToUse.postalCode || '',
    },
    currencyCode: 'USD',
    intent: 'CHARGE',
  });

  const handleCardTokenReceived = async (token, verifiedBuyer) => {
    if (isProcessing || isGlobalProcessing) return; // Prevent double submission

    setIsProcessing(true);
    // Set global processing state for full page loader
    console.log('Square Token Received:', token);
    console.log('Verified Buyer:', verifiedBuyer);

    try {
      // Close the dialog first
      onClose();

      // Call the parent's submit handler with the token
      if (onSubmit) {
        await onSubmit(token);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment Error', {
        description: 'There was an error processing your payment. Please try again.',
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
      // Note: Global processing state will be cleared by parent component after order completion
    }
  };

  const handlePaymentFormError = (errors) => {
    console.error('Square Payment Form Error:', errors);
    setIsProcessing(false);
    // Clear global processing state on error

    // Show user-friendly error message
    const errorMessage = errors?.[0]?.message || 'Payment form error occurred';
    toast.error('Payment Form Error', {
      description: errorMessage,
      duration: 5000,
    });
  };

  // Square has limited CSS property support - only basic properties are allowed
  const cardStyle = {
    input: {
      fontSize: '16px',
      fontFamily: 'inherit',
      color: '#000000',
      backgroundColor: '#f8f9fa',
      // Remove borderRadius and padding as they're not supported
    },
    'input.is-error': {
      color: '#dc3545',
    },
    'input::placeholder': {
      color: '#6c757d',
    },
    '.message-text': {
      color: '#dc3545',
    },
  };

  return (
    <>
      {/* Full Page Loader for card payment processing */}
      <FullPageLoader
        isVisible={isGlobalProcessing}
        title={t('fullPageLoader.title')}
        description={t('fullPageLoader.description')}
      />

      <Dialog open={open} onOpenChange={onClose}>
        <div className="payment-modal-warp">
          <DialogContent className="modal-dialog w-[500px] max-w-full rounded-none border-0 p-0">
            <div className="modal-content relative rounded-none border-0 p-[30px]">
              {/* Custom Modal Header with Close Button */}
              <div className="modal-header absolute -top-[15px] -right-[15px] z-10 border-b-0 p-0">
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className={`float-none m-0 p-0 text-lg font-normal text-gray-800 opacity-65 transition-colors hover:text-red-500 hover:opacity-100 ${
                    isProcessing ? 'cursor-not-allowed opacity-30' : ''
                  }`}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-body relative p-0">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-umbra-100 font-sans text-[20px] font-normal">{t('title')}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Display order amount */}
                  <div className="bg-umbra-5 rounded-lg p-4 text-center">
                    <p className="text-umbra-100 text-sm font-medium">Total Amount</p>
                    <p className="text-umbra-100 text-2xl font-bold">${orderSummary.total?.toFixed(2) || '0.00'}</p>
                  </div>

                  {/* Square Payment Form - only render when dialog is open and ready */}
                  {open && isFormReady && (
                    <div className="space-y-4">
                      <PaymentForm
                        applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID}
                        cardTokenizeResponseReceived={handleCardTokenReceived}
                        createVerificationDetails={createVerificationDetails}
                        locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
                        onError={handlePaymentFormError}
                      >
                        <div className="rounded-lg border border-gray-200 p-4">
                          <CreditCard
                            style={cardStyle}
                            includeInputLabels={true}
                            buttonProps={{
                              css: {
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                fontWeight: '600',
                                width: '100%',
                                // Remove borderRadius, padding, border, cursor as they may not be supported
                              },
                              children: isProcessing ? 'Processing...' : 'Pay Now',
                            }}
                          />
                        </div>
                      </PaymentForm>
                    </div>
                  )}

                  {/* Loading state when form is not ready */}
                  {open && !isFormReady && (
                    <div className="rounded-lg border border-gray-200 p-8 text-center">
                      <div className="border-umbra-100 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                      <p className="text-umbra-100 text-sm">Loading payment form...</p>
                    </div>
                  )}

                  {/* Billing Address Info */}
                  <div className="bg-umbra-5 rounded-lg p-4">
                    <h4 className="text-umbra-100 mb-2 text-sm font-medium">Billing Address</h4>
                    <div className="text-umbra-100 space-y-1 text-xs">
                      <p>
                        {addressToUse.firstName} {addressToUse.lastName}
                      </p>
                      <p>{addressToUse.streetAddress}</p>
                      <p>
                        {addressToUse.city}, {addressToUse.province} {addressToUse.postalCode}
                      </p>
                      <p>{addressToUse.country}</p>
                    </div>
                  </div>

                  {/* Cancel button */}
                  <button
                    onClick={onClose}
                    disabled={isProcessing}
                    className={`border-umbra-20 text-umbra-100 hover:bg-umbra-5 inline-flex w-full items-center justify-center rounded-full border px-6 py-3 ${
                      isProcessing ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default DebitCreditCardDialog;
