'use client';

import ConfirmPayment from '@/components/checkout/ConfirmPayment';
import DebitCreditCardDialog from '@/components/checkout/DebitAndCreditCardDialog';
import DiscountCoupon from '@/components/checkout/DiscountCoupon';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import ProductCart from '@/components/checkout/ProductCart';
import WireTransferDialog from '@/components/checkout/WireTransferDialog';
import { useRouter } from '@/i18n/navigation';
import {
  completeOrder,
  selectBillingAddress,
  selectIsProcessing,
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
  setSelectedCourier,
  setSelectedPaymentMethod,
  setShippingType,
  setShowCardDialog,
  setShowWireDialog,
  setWireFormField,
} from '@/lib/store/slices/checkoutSlice';

import {
  clearCart,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from '@/lib/store/slices/cartSlice';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
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
  const isProcessing = useSelector(selectIsProcessing);

  // Cart selectors
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  // Reset processing state when component mounts
  useEffect(() => {
    dispatch(setIsProcessing(false));
    setIsLoading(false);

    // Note: FedEx is set as default courier in Redux store initialState
    // Courier will be reset to empty string when order completes/fails

    // Cleanup function to reset processing state when component unmounts
    return () => {
      dispatch(setIsProcessing(false));
      setIsLoading(false);
    };
  }, [dispatch]);

  // Reset processing state function
  const handleResetProcessingState = () => {
    dispatch(setIsProcessing(false));
    setIsLoading(false);
    toast.success('Processing State Reset', {
      description: 'Payment methods are now available',
      duration: 2000,
    });
  };

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

  // Comprehensive validation for payment button state
  const validateRequiredFields = () => {
    // Check if cart has items
    if (!cartItems || cartItems.length === 0 || cartTotalQuantity === 0) {
      return false;
    }

    // Check shipping address required fields
    const shippingRequired = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'country',
      'city',
      'province',
      'postalCode',
      'streetAddress',
    ];

    for (const field of shippingRequired) {
      if (!shippingAddress[field] || String(shippingAddress[field]).trim() === '') {
        return false;
      }
    }

    // Check billing address if not same as shipping
    if (!billingAddress.sameAsShipping) {
      const billingRequired = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'country',
        'city',
        'province',
        'postalCode',
        'streetAddress',
      ];

      for (const field of billingRequired) {
        if (!billingAddress[field] || String(billingAddress[field]).trim() === '') {
          return false;
        }
      }
    }

    // Check courier and shipping type
    if (!selectedCourier || !selectedShippingType) {
      return false;
    }

    // Check payment method
    if (!selectedPaymentMethod) {
      return false;
    }

    return true;
  };

  // Validation for payment method selection (without requiring payment method itself)
  const validateFieldsForPaymentMethodSelection = () => {
    // Check if cart has items
    if (!cartItems || cartItems.length === 0 || cartTotalQuantity === 0) {
      return false;
    }

    // Check shipping address required fields
    const shippingRequired = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'country',
      'city',
      'province',
      'postalCode',
      'streetAddress',
    ];

    for (const field of shippingRequired) {
      if (!shippingAddress[field] || String(shippingAddress[field]).trim() === '') {
        return false;
      }
    }

    // Check billing address if not same as shipping
    if (!billingAddress.sameAsShipping) {
      const billingRequired = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'country',
        'city',
        'province',
        'postalCode',
        'streetAddress',
      ];

      for (const field of billingRequired) {
        if (!billingAddress[field] || String(billingAddress[field]).trim() === '') {
          return false;
        }
      }
    }

    // Check courier and shipping type
    if (!selectedCourier || !selectedShippingType) {
      return false;
    }

    // Don't require payment method for payment method selection
    return true;
  };

  // Check if payment method selection should be disabled
  const isPaymentMethodDisabled = !validateFieldsForPaymentMethodSelection() || isProcessing || isLoading;

  // Check if payment button should be disabled
  const isPaymentButtonDisabled = !validateRequiredFields() || isProcessing || isLoading;

  // Get missing fields message for user feedback
  const getMissingFieldsMessage = (forPaymentMethod = false) => {
    const missing = [];

    if (!cartItems || cartItems.length === 0) {
      missing.push('Add products to cart');
    }

    if (!shippingAddress.firstName || !shippingAddress.lastName) {
      missing.push('Shipping name');
    }

    if (!shippingAddress.email) {
      missing.push('Email address');
    }

    if (!shippingAddress.phone) {
      missing.push('Phone number');
    }

    if (!shippingAddress.country) {
      missing.push('Country');
    }

    if (!shippingAddress.city) {
      missing.push('City');
    }

    if (!shippingAddress.province) {
      missing.push('Province/State');
    }

    if (!shippingAddress.postalCode) {
      missing.push('Postal code');
    }

    if (!shippingAddress.streetAddress) {
      missing.push('Street address');
    }

    if (!billingAddress.sameAsShipping) {
      if (!billingAddress.firstName || !billingAddress.lastName) {
        missing.push('Billing name');
      }
      if (!billingAddress.email) {
        missing.push('Billing email');
      }
      if (!billingAddress.phone) {
        missing.push('Billing phone');
      }
      if (!billingAddress.country) {
        missing.push('Billing country');
      }
      if (!billingAddress.city) {
        missing.push('Billing city');
      }
      if (!billingAddress.province) {
        missing.push('Billing province/state');
      }
      if (!billingAddress.postalCode) {
        missing.push('Billing postal code');
      }
      if (!billingAddress.streetAddress) {
        missing.push('Billing street address');
      }
    }

    if (!selectedCourier) {
      missing.push('Shipping courier');
    }

    if (!selectedShippingType) {
      missing.push('Shipping type');
    }

    // Only include payment method requirement for payment button, not for payment method selection
    if (!forPaymentMethod && !selectedPaymentMethod) {
      missing.push('Payment method');
    }

    return missing;
  };

  // Development utility - expose debug functions to window
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      window.checkoutDebug = {
        handleResetProcessingState,
        getCurrentState: () => ({
          isProcessing,
          isLoading,
          selectedPaymentMethod,
          shippingAddress,
          billingAddress,
          selectedCourier,
          selectedShippingType,
          isPaymentButtonDisabled,
          isPaymentMethodDisabled,
        }),
        getValidationState: () => ({
          validateRequiredFields: validateRequiredFields(),
          validateFieldsForPaymentMethodSelection: validateFieldsForPaymentMethodSelection(),
          missingFieldsForPayment: getMissingFieldsMessage(false),
          missingFieldsForPaymentMethod: getMissingFieldsMessage(true),
          isPaymentButtonDisabled,
          isPaymentMethodDisabled,
        }),
        forceReset: () => {
          dispatch(setIsProcessing(false));
          setIsLoading(false);
          // console.log('Checkout state force reset');
        },
        resetCourierAndShipping: () => {
          dispatch(setSelectedCourier(''));
          dispatch(setShippingType(''));
          // console.log('Courier and shipping reset to empty');
        },
        setDefaultCourier: () => {
          dispatch(setSelectedCourier('fedex'));
          dispatch(setShippingType(''));
          // console.log('Courier set to fedex (default)');
        },
      };
    }
  }, [
    isProcessing,
    isLoading,
    selectedPaymentMethod,
    shippingAddress,
    billingAddress,
    selectedCourier,
    selectedShippingType,
    handleResetProcessingState,
    isPaymentButtonDisabled,
    isPaymentMethodDisabled,
  ]);

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
    // If trying to select a payment method (not deselect), check if required fields are filled
    if (value && value !== selectedPaymentMethod && !validateFieldsForPaymentMethodSelection()) {
      const missingFields = getMissingFieldsMessage(true); // true = for payment method selection
      toast.error('Complete Required Information First', {
        description: `Please fill in: ${missingFields.slice(0, 3).join(', ')}${missingFields.length > 3 ? `... and ${missingFields.length - 3} more` : ''}`,
        duration: 5000,
      });
      return; // Don't set the payment method
    }

    dispatch(setSelectedPaymentMethod(value));
  };

  // Cash on Delivery Payment Processing
  const processPayment = async (payload = null) => {
    // Validate form before processing
    if (!validateCompleteForm()) {
      // Reset processing state if validation fails
      dispatch(setIsProcessing(false));
      setIsLoading(false);
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
      // console.log('Final Payload being sent:', JSON.stringify(finalPayload, null, 2));

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
      const recipientEmail = actualOrderData?.billing_details?.email || actualOrderData?.shipping_details?.email;
      const recipientName =
        (actualOrderData?.billing_details?.first_name || actualOrderData?.shipping_details?.first_name) +
        ' ' +
        (actualOrderData?.billing_details?.last_name || actualOrderData?.shipping_details?.last_name);

      if (!error) {
        setOrderedData(actualOrderData);
        dispatch(clearCart());

        // Get the order ID with fallbacks
        const orderId = actualOrderData?._id || actualOrderData?.id || actualOrderData?.orderId || null;
        // console.log('Extracted order ID:', orderId);

        if (orderId) {
          dispatch(completeOrder({ orderId }));
          setIsOrderCompleted(true);

          // Reset payment state and close dialogs
          dispatch(setSelectedPaymentMethod(''));
          dispatch(setShowCardDialog(false));
          dispatch(setShowWireDialog(false));

          // Reset courier and shipping selection
          dispatch(setSelectedCourier(''));
          dispatch(setShippingType(''));

          // Show success toast
          toast.success('Order Placed Successfully!', {
            description: `Your order has been confirmed. Order ID: ${orderId}`,
            duration: 5000,
            icon: '🎉',
          });

          const res = await fetch('/api/emails/order/confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderData: actualOrderData,
              recipientEmail,
              recipientName,
            }),
          });

          router.push(`/order-confirmation/${orderId}`);
        } else {
          console.error('No order ID found in response data');
          dispatch(setCheckoutError('Order created but ID not found'));

          // Reset payment state and close dialogs on error
          dispatch(setSelectedPaymentMethod(''));
          dispatch(setShowCardDialog(false));
          dispatch(setShowWireDialog(false));

          // Reset courier and shipping selection on error
          dispatch(setSelectedCourier(''));
          dispatch(setShippingType(''));

          toast.error('Order Error', {
            description: 'Order was created but we could not retrieve the order ID',
            duration: 5000,
          });
          const res = await fetch('/api/emails/order/failed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderData: actualOrderData,
              recipientEmail,
              recipientName,
              rejectionReason: message,
            }),
          });
        }
      } else {
        dispatch(setCheckoutError(message || 'Payment failed'));

        const res = await fetch('/api/emails/payment/rejection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderData: actualOrderData,
            paymentData: finalPayload,
            recipientEmail,
            recipientName,
            rejectionReason: message,
          }),
        });

        // Reset payment state and close dialogs on error
        dispatch(setSelectedPaymentMethod(''));
        dispatch(setShowCardDialog(false));
        dispatch(setShowWireDialog(false));

        // Reset courier and shipping selection on error
        dispatch(setSelectedCourier(''));
        dispatch(setShippingType(''));

        toast.error('Payment Failed', {
          description: message || 'There was an error processing your payment. Please try again.',
          duration: 5000,
        });
      }
    } catch (error) {
      setShowWireTransferModal(false);
      dispatch(setCheckoutError('Payment processing failed'));
      console.error('Payment Error:', error);

      const res = await fetch('/api/emails/payment/rejection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderData: actualOrderData,
          paymentData: finalPayload,
          recipientEmail,
          recipientName,
          rejectionReason: error,
        }),
      });

      // Reset payment state and close dialogs on error
      dispatch(setSelectedPaymentMethod(''));
      dispatch(setShowCardDialog(false));
      dispatch(setShowWireDialog(false));

      // Reset courier and shipping selection on error
      dispatch(setSelectedCourier(''));
      dispatch(setShippingType(''));

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
      // Reset processing state if validation fails
      dispatch(setIsProcessing(false));
      setIsLoading(false);
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

      // console.log('Square API Response Status:', response.status);
      // console.log('Square API Response Headers:', response.headers.get('content-type'));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      // console.log('Square API Raw Response:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        // console.error('Failed to parse Square API response:', parseError);
        // console.error('Response was:', responseText);
        throw new Error('Invalid JSON response from payment API');
      }

      const { data, error, message, success } = responseData;
      const recipientEmail = data?.billing_details?.email || data?.shipping_details?.email;
      const recipientName =
        (data?.billing_details?.first_name || data?.shipping_details?.first_name) +
        ' ' +
        (data?.billing_details?.last_name || data?.shipping_details?.last_name);

      // Dismiss processing toast
      toast.dismiss('card-payment-processing');

      if (!error) {
        setOrderedData(data);
        dispatch(clearCart());
        dispatch(completeOrder({ orderId: data?._id }));
        setIsOrderCompleted(true);

        // Reset payment state and close dialogs
        dispatch(setSelectedPaymentMethod(''));
        dispatch(setShowCardDialog(false));
        dispatch(setShowWireDialog(false));

        // Reset courier and shipping selection
        dispatch(setSelectedCourier(''));
        dispatch(setShippingType(''));

        // Show success toast
        toast.success('Card Payment Successful!', {
          description: `Your payment has been processed. Order ID: ${data?._id}`,
          duration: 5000,
          icon: '💳',
        });

        // sending order confirmation email
        const resOrder = await fetch('/api/emails/order/confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderData: data,
            recipientEmail,
            recipientName,
          }),
        });
        // sending payment confirmation email
        const resPayment = await fetch('/api/emails/payment/confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderData: data,
            paymentData: paymentPayload,
            recipientEmail,
            recipientName,
          }),
        });

        router.push(`/order-confirmation/${data?._id}`);
      } else {
        dispatch(setCheckoutError(message || 'Square payment failed'));

        // Reset payment state and close dialogs on error
        dispatch(setSelectedPaymentMethod(''));
        dispatch(setShowCardDialog(false));
        dispatch(setShowWireDialog(false));

        // Reset courier and shipping selection on error
        dispatch(setSelectedCourier(''));
        dispatch(setShippingType(''));

        toast.error('Card Payment Failed', {
          description: message || 'There was an error processing your card payment. Please try again.',
          duration: 5000,
        });
        // sending order failed email
        const res = await fetch('/api/emails/order/failed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderData: data,
            recipientEmail,
            recipientName,
            rejectionReason: message,
          }),
        });
      }
    } catch (error) {
      dispatch(setCheckoutError('Square payment processing failed'));
      console.error('Square Payment Error:', error);

      // Reset payment state and close dialogs on error
      dispatch(setSelectedPaymentMethod(''));
      dispatch(setShowCardDialog(false));
      dispatch(setShowWireDialog(false));

      // Reset courier and shipping selection on error
      dispatch(setSelectedCourier(''));
      dispatch(setShippingType(''));

      // Dismiss processing toast
      toast.dismiss('card-payment-processing');

      toast.error('Card Payment Error', {
        description: 'There was an error processing your card payment. Please check your card details and try again.',
        duration: 5000,
      });
      // sending payment rejection email
      const res = await fetch('/api/emails/payment/rejection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderData: data,
          paymentData: paymentPayload,
          recipientEmail,
          recipientName,
          rejectionReason: error,
        }),
      });
    } finally {
      setIsLoading(false);
      dispatch(setIsProcessing(false));
    }
  };

  // Wire Transfer Payment Processing
  const processWireTransferPayment = async () => {
    if (!validateWireForm()) {
      // Reset processing state if validation fails
      dispatch(setIsProcessing(false));
      setIsLoading(false);
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

      // Process wire transfer payment directly without calling processPayment
      // to avoid nested isProcessing state management
      const response = await fetch('/api/payment/cash-on-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: wirePayload,
        }),
      });

      const responseData = await response.json();
      const { data: orderResponse, error, message } = responseData;

      if (!error) {
        const actualOrderData = orderResponse?.data;
        const orderId = actualOrderData?._id || actualOrderData?.id || actualOrderData?.orderId || null;
        const recipientEmail = actualOrderData?.billing_details?.email || actualOrderData?.shipping_details?.email;
        const recipientName =
          (actualOrderData?.billing_details?.first_name || actualOrderData?.shipping_details?.first_name) +
          ' ' +
          (actualOrderData?.billing_details?.last_name || actualOrderData?.shipping_details?.last_name);

        if (orderId) {
          dispatch(completeOrder({ orderId }));
          dispatch(clearCart());

          // Reset payment state and close dialogs
          dispatch(setSelectedPaymentMethod(''));
          dispatch(setShowCardDialog(false));
          dispatch(setShowWireDialog(false));

          // Reset courier and shipping selection
          dispatch(setSelectedCourier(''));
          dispatch(setShippingType(''));

          toast.success('Wire Transfer Order Placed!', {
            description: `Your order has been confirmed. Order ID: ${orderId}`,
            duration: 5000,
            icon: '🎉',
          });

          // sending order confirmation email
          // const resOrder = await fetch('/api/emails/order/confirmation', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     orderData: actualOrderData,
          //     recipientEmail,
          //     recipientName,
          //   }),
          // });

          // sending payment confirmation email
          // const resPayment = await fetch('/api/emails/payment/confirmation', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     orderData: actualOrderData,
          //     paymentData: wirePayload,
          //     recipientEmail,
          //     recipientName,
          //   }),
          // });

          router.push(`/order-confirmation/${orderId}`);
        } else {
          dispatch(setCheckoutError('Order created but ID not found'));

          // Reset payment state and close dialogs on error
          dispatch(setSelectedPaymentMethod(''));
          dispatch(setShowCardDialog(false));
          dispatch(setShowWireDialog(false));

          // Reset courier and shipping selection on error
          dispatch(setSelectedCourier(''));
          dispatch(setShippingType(''));

          toast.error('Order Error', {
            description: 'Order was created but we could not retrieve the order ID',
            duration: 5000,
          });

          // sending order failed email
          // const res = await fetch('/api/emails/order/failed', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     orderData: actualOrderData,
          //     recipientEmail,
          //     recipientName,
          //     rejectionReason: message,
          //   }),
          // });
        }
      } else {
        dispatch(setCheckoutError(message || 'Wire transfer failed'));

        // Reset payment state and close dialogs on error
        dispatch(setSelectedPaymentMethod(''));
        dispatch(setShowCardDialog(false));
        dispatch(setShowWireDialog(false));

        // Reset courier and shipping selection on error
        dispatch(setSelectedCourier(''));
        dispatch(setShippingType(''));

        toast.error('Wire Transfer Failed', {
          description: message || 'There was an error processing your wire transfer. Please try again.',
          duration: 5000,
        });
      }
    } catch (error) {
      dispatch(setCheckoutError('Wire transfer processing failed'));
      console.error('Wire Transfer Error:', error);

      // Reset payment state and close dialogs on error
      dispatch(setSelectedPaymentMethod(''));
      dispatch(setShowCardDialog(false));
      dispatch(setShowWireDialog(false));

      // Reset courier and shipping selection on error
      dispatch(setSelectedCourier(''));
      dispatch(setShippingType(''));

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
    // console.log('Square Token Received in CheckoutPage:', token);

    // Process Square payment with token
    if (token) {
      await processSquarePayment(token);
    }
  };

  // Submit handler for wire transfer
  const handleWireSubmit = async () => {
    // console.log('Wire info Submitted:', wireFormData);
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

            {/* Progress indicator when payment methods are disabled */}
            {isPaymentMethodDisabled && !isProcessing && (
              <div className="mt-4 rounded-[10px] border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="mt-0.5 h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Complete Information to Continue</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p className="mb-2">To proceed with payment, please complete:</p>
                      <div className="grid grid-cols-1 gap-1">
                        {getMissingFieldsMessage(true).map((field, index) => (
                          <div key={index} className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-blue-400"></div>
                            <span>{field}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <PaymentMethod
              value={selectedPaymentMethod}
              onValueChange={handlePaymentMethodChange}
              isDisabled={isPaymentMethodDisabled}
              getMissingFieldsMessage={() => getMissingFieldsMessage(true)}
            />

            <ConfirmPayment
              onProcessPayment={processPayment}
              isLoading={isLoading}
              selectedPaymentMethod={selectedPaymentMethod}
              isDisabled={isPaymentButtonDisabled}
              getMissingFieldsMessage={() => getMissingFieldsMessage(false)}
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
