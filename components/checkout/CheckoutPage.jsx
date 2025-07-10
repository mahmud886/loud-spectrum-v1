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
  selectBillingAddress,
  selectPaymentPayload,
  selectSelectedCourier,
  selectSelectedPaymentMethod,
  selectShippingAddress,
  selectShippingType,
  selectShowCardDialog,
  selectShowWireDialog,
  selectWireFormData,
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
import { toast } from 'sonner';
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
  const wireFormData = useSelector(selectWireFormData);
  const showCardDialog = useSelector(selectShowCardDialog);
  const showWireDialog = useSelector(selectShowWireDialog);
  const paymentPayload = useSelector(selectPaymentPayload);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  const selectedCourier = useSelector(selectSelectedCourier);
  const selectedShippingType = useSelector(selectShippingType);

  // Cart selectors
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  // Validation functions
  const validateCart = () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error('Cart is Empty', {
        description: 'Please add some products to your cart before proceeding to checkout',
        duration: 4000,
        // action: {
        //   label: 'Go Shopping',
        //   onClick: () => router.push('/shop'),
        // },
      });

      return router.push('/shop');
    }

    if (cartTotalQuantity === 0) {
      toast.error('No Items in Cart', {
        description: 'Your cart appears to be empty. Please add products to continue',
        duration: 4000,
      });
      return router.push('/shop');
    }

    if (cartTotalAmount <= 0) {
      toast.error('Invalid Cart Total', {
        description: 'There seems to be an issue with your cart total. Please refresh and try again',
        duration: 4000,
      });
      return router.push('/shop');
    }

    return true;
  };

  const validateShippingAddress = () => {
    const requiredFields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      country: 'Country',
      city: 'City',
      province: 'Province/State',
      postalCode: 'Postal Code',
      streetAddress: 'Street Address',
    };

    const missingFields = [];
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!shippingAddress[field] || String(shippingAddress[field]).trim() === '') {
        missingFields.push(label);
      }
    });

    if (missingFields.length > 0) {
      toast.error('Missing Shipping Information', {
        description: `Please fill in: ${missingFields.join(', ')}`,
        duration: 4000,
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingAddress.email)) {
      toast.error('Invalid Email', {
        description: 'Please enter a valid email address',
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  const validateBillingAddress = () => {
    if (billingAddress.sameAsShipping) {
      return true; // No need to validate if same as shipping
    }

    const requiredFields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      country: 'Country',
      city: 'City',
      province: 'Province/State',
      postalCode: 'Postal Code',
      streetAddress: 'Street Address',
    };

    const missingFields = [];
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!billingAddress[field] || String(billingAddress[field]).trim() === '') {
        missingFields.push(label);
      }
    });

    if (missingFields.length > 0) {
      toast.error('Missing Billing Information', {
        description: `Please fill in: ${missingFields.join(', ')}`,
        duration: 4000,
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billingAddress.email)) {
      toast.error('Invalid Billing Email', {
        description: 'Please enter a valid billing email address',
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  const validateCourier = () => {
    if (!selectedCourier) {
      toast.error('Select Shipping Method', {
        description: 'Please choose a shipping courier',
        duration: 4000,
      });
      return false;
    }

    if (!selectedShippingType) {
      toast.error('Select Shipping Type', {
        description: 'Please choose a shipping type from the dropdown',
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  const validatePaymentMethod = () => {
    if (!selectedPaymentMethod) {
      toast.error('Select Payment Method', {
        description: 'Please choose a payment method',
        duration: 4000,
      });
      return false;
    }
    return true;
  };

  const validateWireForm = () => {
    const requiredFields = {
      accountHolderName: 'Account Holder Name',
      accountNumber: 'Account Number',
      transactionId: 'Transaction ID',
    };

    const missingFields = [];
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!wireFormData[field] || String(wireFormData[field]).trim() === '') {
        missingFields.push(label);
      }
    });

    if (missingFields.length > 0) {
      toast.error('Incomplete Wire Transfer Information', {
        description: `Please fill in: ${missingFields.join(', ')}`,
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  const validateCompleteForm = () => {
    // Validate in order of importance
    if (!validateCart()) return false;
    if (!validateShippingAddress()) return false;
    if (!validateBillingAddress()) return false;
    if (!validateCourier()) return false;
    if (!validatePaymentMethod()) return false;

    // Payment method specific validation
    // Note: Card validation is handled by Square, so we skip it here
    if (selectedPaymentMethod === 'ach-wire-transfer' && !validateWireForm()) return false;

    return true;
  };

  const handlePaymentMethodChange = (value) => {
    dispatch(setSelectedPaymentMethod(value));
  };

  // Cash on Delivery Payment Processing
  const processPayment = async (payload = null) => {
    // Validate form before processing
    if (!validateCompleteForm()) {
      return;
    }

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

      // Show processing toast
      toast.loading('Processing Payment...', {
        description: 'Please wait while we process your order',
        duration: Infinity,
        id: 'payment-processing',
      });

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

      const responseData = await response.json();
      const { data: orderResponse, error, message } = responseData;

      // console.log('Full response:', responseData);
      // console.log('Order response:', orderResponse);
      // console.log('error:', error);
      // console.log('message:', message);

      // Dismiss processing toast
      toast.dismiss('payment-processing');

      // The actual order data is nested in orderResponse.data
      const actualOrderData = orderResponse?.data;
      // console.log('Actual order data:', actualOrderData);
      // console.log('actualOrderData._id:', actualOrderData?._id);

      if (!error) {
        setOrderedData(actualOrderData);
        dispatch(clearCart());

        // Get the order ID with fallbacks
        const orderId = actualOrderData?._id || actualOrderData?.id || actualOrderData?.orderId || null;
        // console.log('Extracted order ID:', orderId);

        if (orderId) {
          dispatch(completeOrder({ orderId }));
          setIsOrderCompleted(true);

          // Show success toast
          toast.success('Order Placed Successfully!', {
            description: `Your order has been confirmed. Order ID: ${orderId}`,
            duration: 5000,
            icon: '🎉',
          });

          router.push(`/order-confirmation/${orderId}`);
        } else {
          console.error('No order ID found in response data');
          dispatch(setCheckoutError('Order created but ID not found'));
          toast.error('Order Error', {
            description: 'Order was created but we could not retrieve the order ID',
            duration: 5000,
          });
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
        toast.error('Payment Failed', {
          description: message || 'There was an error processing your payment. Please try again.',
          duration: 5000,
        });

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

      // Dismiss processing toast
      toast.dismiss('payment-processing');

      toast.error('Payment Error', {
        description: 'There was an error processing your payment. Please check your information and try again.',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      dispatch(setIsProcessing(false));
    }
  };

  // Square Payment Processing
  const processSquarePayment = async (token) => {
    // Validate form before processing
    if (!validateCompleteForm()) {
      return;
    }

    setIsLoading(true);
    dispatch(setIsProcessing(true));

    try {
      // Show processing toast
      toast.loading('Processing Card Payment...', {
        description: 'Please wait while we process your card payment',
        duration: Infinity,
        id: 'card-payment-processing',
      });

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

      console.log('Square API Response Status:', response.status);
      console.log('Square API Response Headers:', response.headers.get('content-type'));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Square API Raw Response:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse Square API response:', parseError);
        console.error('Response was:', responseText);
        throw new Error('Invalid JSON response from payment API');
      }

      const { data, error, message, success } = responseData;

      // Dismiss processing toast
      toast.dismiss('card-payment-processing');

      if (!error) {
        setOrderedData(data);
        dispatch(clearCart());
        dispatch(completeOrder({ orderId: data?._id }));
        setIsOrderCompleted(true);

        // Show success toast
        toast.success('Card Payment Successful!', {
          description: `Your payment has been processed. Order ID: ${data?._id}`,
          duration: 5000,
          icon: '💳',
        });

        router.push(`/order-confirmation/${data?._id}`);
      } else {
        dispatch(setCheckoutError(message || 'Square payment failed'));
        toast.error('Card Payment Failed', {
          description: message || 'There was an error processing your card payment. Please try again.',
          duration: 5000,
        });
        // Handle payment failure - could redirect to failure page
        // router.push('/payment-callback/fail');
      }
    } catch (error) {
      dispatch(setCheckoutError('Square payment processing failed'));
      console.error('Square Payment Error:', error);

      // Dismiss processing toast
      toast.dismiss('card-payment-processing');

      toast.error('Card Payment Error', {
        description: 'There was an error processing your card payment. Please check your card details and try again.',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      dispatch(setIsProcessing(false));
    }
  };

  // Wire Transfer Payment Processing
  const processWireTransferPayment = async () => {
    if (!validateWireForm()) {
      return;
    }

    setIsLoading(true);
    dispatch(setIsProcessing(true));

    try {
      // Create payload with wire transfer details
      const wirePayload = {
        ...paymentPayload,
        payment_info: {
          transection_id: wireFormData.transactionId,
          account_number: wireFormData.accountNumber,
          account_name: wireFormData.accountHolderName,
        },
        payment_status: 'Unpaid',
      };

      await processPayment(wirePayload);
      await dispatch(clearCart());
    } catch (error) {
      dispatch(setCheckoutError('Wire transfer processing failed'));
      console.error('Wire Transfer Error:', error);

      toast.error('Wire Transfer Error', {
        description: 'There was an error processing your wire transfer. Please check your details and try again.',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      dispatch(setIsProcessing(false));
    }
  };

  // Handle wire form input change
  const handleWireFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(setWireFormField({ name, value }));
  };

  // Submit handler for debit / credit card form
  const handleCardSubmit = async (token) => {
    console.log('Square Token Received in CheckoutPage:', token);

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
      <DebitCreditCardDialog open={showCardDialog} onClose={handleCardDialogClose} onSubmit={handleCardSubmit} />

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
