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

      const response = await fetch('/api/payment/cash-on-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: finalPayload,
        }),
      });

      setShowWireTransferModal(false);

      const { data, error, message } = await response.json();

      if (!error) {
        setOrderedData(data);
        dispatch(clearCart());
        dispatch(completeOrder({ orderId: data?._id }));
        setIsOrderCompleted(true);

        // Step 2: Save Order and Send Confirmation Email
        try {
          const emailResponse = await fetch('/api/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderPayload: finalPayload,
              orderDetails: data,
            }),
          });

          const emailResult = await emailResponse.json();
          if (emailResult.error) {
            console.warn('Email Error:', emailResult.error);
          }
        } catch (emailError) {
          console.warn('Email sending failed:', emailError);
        }

        router.push(`/order-confirmation/${data?._id}`);
      } else {
        dispatch(setCheckoutError(message || 'Payment failed'));

        // Send failure email
        try {
          const emailResponse = await fetch('/api/email-failed', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderPayload: finalPayload,
              orderDetails: data,
            }),
          });

          const emailResult = await emailResponse.json();
          if (emailResult.error) {
            console.warn('Email Error:', emailResult.error);
          }
        } catch (emailError) {
          console.warn('Failed email sending failed:', emailError);
        }
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
          account_holder_name: wireFormData.accountHolderName,
          account_number: wireFormData.accountNumber,
          transaction_id: wireFormData.transactionId,
          payment_method: 'ach-wire-transfer',
        },
        payment_status: 'Pending', // Wire transfers need manual verification
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
