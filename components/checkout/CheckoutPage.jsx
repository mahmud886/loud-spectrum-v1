'use client';

import ConfirmPayment from '@/components/checkout/ConfirmPayment';
import DebitCreditCardDialog from '@/components/checkout/DebitAndCreditCardDialog';
import DiscountCoupon from '@/components/checkout/DiscountCoupon';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import ProductCart from '@/components/checkout/ProductCart';
import WireTransferDialog from '@/components/checkout/WireTransferDialog';
import { useRouter } from '@/i18n/navigation';
import { clearCart } from '@/lib/store/slices/cartSlice';
import {
  completeOrder,
  selectCardFormData,
  selectPaymentPayload,
  selectSelectedPaymentMethod,
  selectShowCardDialog,
  selectShowWireDialog,
  selectWireFormData,
  setCardFormField,
  setCheckoutError,
  setIsProcessing,
  setSelectedPaymentMethod,
  setShowCardDialog,
  setShowWireDialog,
  setWireFormField,
} from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChooseYourCourier from './ChooseYourCourier';
import ShippingAndBillingAddress from './ShippingAndBillingAddress';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations('CheckoutPage.ShippingAndBillingAddress');

  // Local state for payment processing
  const [isLoading, setIsLoading] = useState(false);
  const [orderedData, setOrderedData] = useState(null);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [showWireTransferModal, setShowWireTransferModal] = useState(false);

  // Redux selectors
  const selectedPaymentMethod = useSelector(selectSelectedPaymentMethod);
  const cardFormData = useSelector(selectCardFormData);
  const wireFormData = useSelector(selectWireFormData);
  const showCardDialog = useSelector(selectShowCardDialog);
  const showWireDialog = useSelector(selectShowWireDialog);
  const paymentPayload = useSelector(selectPaymentPayload);

  const handlePaymentMethodChange = (value) => {
    dispatch(setSelectedPaymentMethod(value));
  };

  // Cash on Delivery Payment Processing
  const processPayment = async (payload = null) => {
    setIsLoading(true);
    dispatch(setIsProcessing(true));

    try {
      const finalPayload = payload ?? paymentPayload;

      // Validate payload for NaN values
      const validatePayload = (obj, path = '') => {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key;
          if (typeof value === 'number' && isNaN(value)) {
            console.error(`NaN value found at ${currentPath}:`, value);
          } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            validatePayload(value, currentPath);
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              if (typeof item === 'object' && item !== null) {
                validatePayload(item, `${currentPath}[${index}]`);
              } else if (typeof item === 'number' && isNaN(item)) {
                console.error(`NaN value found at ${currentPath}[${index}]:`, item);
              }
            });
          }
        }
      };

      validatePayload(finalPayload);
      console.log('Final Payload being sent:', JSON.stringify(finalPayload, null, 2));

      const response = await fetch('/api/payment/cash-on-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: finalPayload,
        }),
      });

      console.log('Response:', response);
      setShowWireTransferModal(false);

      const responseData = await response.json();
      const { data: orderResponse, error, message } = responseData;

      console.log('Full response:', responseData);
      console.log('Order response:', orderResponse);
      console.log('error:', error);
      console.log('message:', message);

      // The actual order data is nested in orderResponse.data
      const actualOrderData = orderResponse?.data;
      console.log('Actual order data:', actualOrderData);
      console.log('actualOrderData._id:', actualOrderData?._id);

      if (!error) {
        setOrderedData(actualOrderData);
        // dispatch(clearCart());

        // Get the order ID with fallbacks
        const orderId = actualOrderData?._id || actualOrderData?.id || actualOrderData?.orderId || null;
        console.log('Extracted order ID:', orderId);

        if (orderId) {
          dispatch(completeOrder({ orderId }));
          setIsOrderCompleted(true);
          router.push(`/order-confirmation/${orderId}`);
        } else {
          console.error('No order ID found in response data');
          dispatch(setCheckoutError('Order created but ID not found'));
        }

        // Step 2: Save Order and Send Confirmation Email
        // try {
        //   const emailResponse = await fetch('/api/email', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       orderPayload: finalPayload,
        //       orderDetails: actualOrderData,
        //     }),
        //   });

        //   const emailResult = await emailResponse.json();
        //   if (emailResult.error) {
        //     console.warn('Email Error:', emailResult.error);
        //   }
        // } catch (emailError) {
        //   console.warn('Email sending failed:', emailError);
        // }
      } else {
        dispatch(setCheckoutError(message || 'Payment failed'));

        // Send failure email
        // try {
        //   const emailResponse = await fetch('/api/email-failed', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       orderPayload: finalPayload,
        //       orderDetails: actualOrderData,
        //     }),
        //   });

        //   const emailResult = await emailResponse.json();
        //   if (emailResult.error) {
        //     console.warn('Email Error:', emailResult.error);
        //   }
        // } catch (emailError) {
        //   console.warn('Failed email sending failed:', emailError);
        // }
      }
    } catch (error) {
      setShowWireTransferModal(false);
      dispatch(setCheckoutError('Payment processing failed'));
      console.error('Payment Error:', error);
    } finally {
      setIsLoading(false);
      dispatch(setIsProcessing(false));
    }
  };

  // Square Payment Processing
  const processSquarePayment = async (token) => {
    setIsLoading(true);
    dispatch(setIsProcessing(true));

    try {
      const response = await fetch('/api/payment/square', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceId: token.token,
          data: paymentPayload,
        }),
      });

      const { data, error, message } = await response.json();

      if (!error) {
        setOrderedData(data);
        dispatch(clearCart());
        dispatch(completeOrder({ orderId: data?._id }));
        setIsOrderCompleted(true);
        router.push(`/order-confirmation/${data?._id}`);
      } else {
        dispatch(setCheckoutError(message || 'Square payment failed'));
        // Handle payment failure - could redirect to failure page
        // router.push('/payment-callback/fail');
      }
    } catch (error) {
      dispatch(setCheckoutError('Square payment processing failed'));
      console.error('Square Payment Error:', error);
    } finally {
      setIsLoading(false);
      dispatch(setIsProcessing(false));
    }
  };

  // Wire Transfer Payment Processing
  const processWireTransferPayment = async () => {
    if (!wireFormData.accountHolderName || !wireFormData.accountNumber || !wireFormData.transactionId) {
      dispatch(setCheckoutError('Please fill in all wire transfer details'));
      return;
    }

    setIsLoading(true);
    dispatch(setIsProcessing(true));

    try {
      // Create payload with wire transfer details
      const wirePayload = {
        ...paymentPayload,
        payment_info: {
          transection_id: wireFormData.transactionId, // Note: backend uses 'transection_id' (typo in backend)
          account_number: wireFormData.accountNumber,
          account_name: wireFormData.accountHolderName,
        },
        payment_status: 'Unpaid', // Wire transfers start as unpaid until verified
      };

      // For wire transfer, we'll use the cash-on-delivery endpoint but with wire transfer info
      await processPayment(wirePayload);
    } catch (error) {
      dispatch(setCheckoutError('Wire transfer processing failed'));
      console.error('Wire Transfer Error:', error);
    } finally {
      setIsLoading(false);
      dispatch(setIsProcessing(false));
    }
  };

  console.log('selectedPaymentMethod', selectedPaymentMethod);

  // Handle card input change
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCardFormField({ name, value }));
  };

  // Handle wire form input change
  const handleWireFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(setWireFormField({ name, value }));
  };

  // Submit handler for debit / credit card form
  const handleCardSubmit = async (token) => {
    console.log('Card Info Submitted:', cardFormData);
    dispatch(setShowCardDialog(false));

    // Process Square payment with token
    if (token) {
      await processSquarePayment(token);
    }
  };

  // Submit handler for wire transfer
  const handleWireSubmit = async () => {
    console.log('Wire info Submitted:', wireFormData);
    dispatch(setShowWireDialog(false));

    // Process wire transfer payment
    await processWireTransferPayment();
  };

  // Handle dialog close
  const handleCardDialogClose = () => {
    dispatch(setShowCardDialog(false));
  };

  const handleWireDialogClose = () => {
    dispatch(setShowWireDialog(false));
  };

  return (
    <>
      <div className="flex w-full flex-col items-start justify-between gap-5 pb-10 md:flex-row">
        <div className="h-auto w-full rounded-[10px] shadow-sm md:min-w-[58%]">
          <div className="px-4">
            <ProductCart />
          </div>
          <ShippingAndBillingAddress />
        </div>
        <div className="h-auto w-full rounded-[10px] pb-4 shadow-sm md:min-w-[40%]">
          <div className="px-4">
            <ChooseYourCourier />
            <DiscountCoupon />
            <OrderSummary />
            <PaymentMethod value={selectedPaymentMethod} onValueChange={handlePaymentMethodChange} />
            <ConfirmPayment
              onProcessPayment={processPayment}
              isLoading={isLoading}
              selectedPaymentMethod={selectedPaymentMethod}
            />
          </div>
        </div>
      </div>

      {/* Show card form dialog */}
      <DebitCreditCardDialog
        open={showCardDialog}
        onClose={handleCardDialogClose}
        formData={cardFormData}
        onChange={handleCardInputChange}
        onSubmit={handleCardSubmit}
      />

      {/* Show wire transfer dialog */}
      <WireTransferDialog
        open={showWireDialog}
        onClose={handleWireDialogClose}
        formData={wireFormData}
        onChange={handleWireFormChange}
        onSubmit={handleWireSubmit}
      />
    </>
  );
};

export default CheckoutPage;
