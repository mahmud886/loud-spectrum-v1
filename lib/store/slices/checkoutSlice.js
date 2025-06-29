import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Payment Method State
  selectedPaymentMethod: '',

  // Card Form State
  cardFormData: {
    cardHolderName: '',
    expiry: '',
    securityCode: '',
    postalCode: '',
  },

  // Wire Transfer Form State
  wireFormData: {
    accountHolderName: '',
    accountNumber: '',
    transactionId: '',
  },

  // Dialog States
  showCardDialog: false,
  showWireDialog: false,

  // Courier and Shipping
  selectedCourier: 'fedex',
  shippingType: '',
  shippingCostLoading: false,
  dynamicShippingCost: null,

  // Order Summary
  orderSummary: {
    subtotal: 0,
    shipping: 0,
    discount: 0,
    tax: 0,
    totalVolume: 0,
    total: 0,
  },

  // Discount Coupon
  discountCoupon: {
    code: '',
    couponId: null,
    applied: false,
    discountAmount: 0,
    error: null,
  },

  // Shipping and Billing Address
  shippingAddress: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    province: '',
    postalCode: '',
    streetAddress: '',
  },

  billingAddress: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    province: '',
    postalCode: '',
    streetAddress: '',
    sameAsShipping: true,
  },

  // Checkout Process State
  currentStep: 1,
  isProcessing: false,
  error: null,
  orderComplete: false,
  orderId: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    // Payment Method Actions
    setSelectedPaymentMethod: (state, { payload }) => {
      state.selectedPaymentMethod = payload;
      // Auto-open dialogs based on payment method
      state.showCardDialog = payload === 'debit-credit-card';
      state.showWireDialog = payload === 'ach-wire-transfer';
    },

    // Card Form Actions
    updateCardFormData: (state, { payload }) => {
      state.cardFormData = { ...state.cardFormData, ...payload };
    },

    setCardFormField: (state, { payload }) => {
      const { name, value } = payload;
      state.cardFormData[name] = value;
    },

    resetCardFormData: (state) => {
      state.cardFormData = {
        cardHolderName: '',
        expiry: '',
        securityCode: '',
        postalCode: '',
      };
    },

    // Wire Transfer Form Actions
    updateWireFormData: (state, { payload }) => {
      state.wireFormData = { ...state.wireFormData, ...payload };
    },

    setWireFormField: (state, { payload }) => {
      const { name, value } = payload;
      state.wireFormData[name] = value;
    },

    resetWireFormData: (state) => {
      state.wireFormData = {
        accountHolderName: '',
        accountNumber: '',
        transactionId: '',
      };
    },

    // Dialog State Actions
    setShowCardDialog: (state, { payload }) => {
      state.showCardDialog = payload;
    },

    setShowWireDialog: (state, { payload }) => {
      state.showWireDialog = payload;
    },

    closeAllDialogs: (state) => {
      state.showCardDialog = false;
      state.showWireDialog = false;
    },

    // Courier and Shipping Actions
    setSelectedCourier: (state, { payload }) => {
      state.selectedCourier = payload;
    },

    setShippingType: (state, { payload }) => {
      state.shippingType = payload;
      // Reset dynamic cost when shipping type changes
      state.dynamicShippingCost = null;
      // Update shipping cost based on type (default cost)
      state.orderSummary.shipping = calculateShippingCost(payload);
      state.orderSummary.total = calculateTotal(state.orderSummary);
    },

    setShippingCostLoading: (state, { payload }) => {
      state.shippingCostLoading = payload;
    },

    setDynamicShippingCost: (state, { payload }) => {
      state.dynamicShippingCost = payload;
      // Update order summary with dynamic cost
      state.orderSummary.shipping = payload;
      state.orderSummary.total = calculateTotal(state.orderSummary);
      state.shippingCostLoading = false;
    },

    resetDynamicShippingCost: (state) => {
      state.dynamicShippingCost = null;
      state.shippingCostLoading = false;
      // Fallback to default cost
      state.orderSummary.shipping = calculateShippingCost(state.shippingType);
      state.orderSummary.total = calculateTotal(state.orderSummary);
    },

    // Order Summary Actions
    updateOrderSummary: (state, { payload }) => {
      state.orderSummary = { ...state.orderSummary, ...payload };
      state.orderSummary.total = calculateTotal(state.orderSummary);
    },

    setSubtotal: (state, { payload }) => {
      state.orderSummary.subtotal = payload;
      state.orderSummary.total = calculateTotal(state.orderSummary);
    },

    setShippingCost: (state, { payload }) => {
      state.orderSummary.shipping = payload;
      state.orderSummary.total = calculateTotal(state.orderSummary);
    },

    setDiscount: (state, { payload }) => {
      state.orderSummary.discount = payload;
      state.orderSummary.total = calculateTotal(state.orderSummary);
    },

    setTotalVolume: (state, { payload }) => {
      state.orderSummary.totalVolume = payload;
    },

    setTax: (state, { payload }) => {
      state.orderSummary.tax = payload;
      state.orderSummary.total = calculateTotal(state.orderSummary);
    },

    // Discount Coupon Actions
    setCouponCode: (state, { payload }) => {
      state.discountCoupon.code = payload;
      state.discountCoupon.error = null;
    },

    applyCoupon: (state, { payload }) => {
      state.discountCoupon.applied = true;
      state.discountCoupon.couponId = payload.couponId;
      state.discountCoupon.discountAmount = payload.discountAmount;
      state.orderSummary.discount = payload.discountAmount;
      state.orderSummary.total = calculateTotal(state.orderSummary);
      state.discountCoupon.error = null;
    },

    removeCoupon: (state) => {
      state.discountCoupon = {
        code: '',
        couponId: null,
        applied: false,
        discountAmount: 0,
        error: null,
      };
      state.orderSummary.discount = 0;
      state.orderSummary.total = calculateTotal(state.orderSummary);
    },

    setCouponError: (state, { payload }) => {
      state.discountCoupon.error = payload;
      state.discountCoupon.applied = false;
    },

    // Address Actions
    updateShippingAddress: (state, { payload }) => {
      state.shippingAddress = { ...state.shippingAddress, ...payload };
    },

    setShippingAddressField: (state, { payload }) => {
      const { name, value } = payload;
      state.shippingAddress[name] = value;
    },

    updateBillingAddress: (state, { payload }) => {
      state.billingAddress = { ...state.billingAddress, ...payload };
    },

    setBillingAddressField: (state, { payload }) => {
      const { name, value } = payload;
      state.billingAddress[name] = value;
    },

    setSameAsShipping: (state, { payload }) => {
      state.billingAddress.sameAsShipping = payload;
      if (payload) {
        // Copy shipping address to billing address
        const { sameAsShipping, ...shippingData } = state.shippingAddress;
        state.billingAddress = { ...state.billingAddress, ...shippingData, sameAsShipping: true };
      }
    },

    // Checkout Process Actions
    setCurrentStep: (state, { payload }) => {
      state.currentStep = payload;
    },

    nextStep: (state) => {
      state.currentStep += 1;
    },

    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },

    setIsProcessing: (state, { payload }) => {
      state.isProcessing = payload;
    },

    setCheckoutError: (state, { payload }) => {
      state.error = payload;
      state.isProcessing = false;
    },

    clearCheckoutError: (state) => {
      state.error = null;
    },

    completeOrder: (state, { payload }) => {
      state.orderComplete = true;
      state.orderId = payload.orderId;
      state.isProcessing = false;
      state.error = null;
    },

    // Reset Actions
    resetCheckoutForm: (state) => {
      state.cardFormData = initialState.cardFormData;
      state.wireFormData = initialState.wireFormData;
      state.selectedPaymentMethod = '';
      state.showCardDialog = false;
      state.showWireDialog = false;
      state.discountCoupon = initialState.discountCoupon;
      state.error = null;
    },

    resetCheckout: (state) => {
      return { ...initialState };
    },
  },
});

// Helper functions
const calculateShippingCost = (shippingType) => {
  const shippingCosts = {
    // Legacy types
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
    free: 0,

    // New volume-based types
    'standard-flat-rate': 9.95,
    'fedex-2-day': 29.99,
    'ups-ground': 29.99,
    'fedex-air-hazardous': 300,
    'fedex-air-hazardous-international': 350,
    'international-economy': 25.99,
  };
  return shippingCosts[shippingType] || 0;
};

const calculateTotal = (orderSummary) => {
  const { subtotal, shipping, discount, tax } = orderSummary;
  return Math.max(0, subtotal + shipping + tax - discount);
};

export const {
  // Payment Method Actions
  setSelectedPaymentMethod,

  // Card Form Actions
  updateCardFormData,
  setCardFormField,
  resetCardFormData,

  // Wire Transfer Form Actions
  updateWireFormData,
  setWireFormField,
  resetWireFormData,

  // Dialog State Actions
  setShowCardDialog,
  setShowWireDialog,
  closeAllDialogs,

  // Courier and Shipping Actions
  setSelectedCourier,
  setShippingType,
  setShippingCostLoading,
  setDynamicShippingCost,
  resetDynamicShippingCost,

  // Order Summary Actions
  updateOrderSummary,
  setSubtotal,
  setShippingCost,
  setDiscount,
  setTotalVolume,
  setTax,

  // Discount Coupon Actions
  setCouponCode,
  applyCoupon,
  removeCoupon,
  setCouponError,

  // Address Actions
  updateShippingAddress,
  setShippingAddressField,
  updateBillingAddress,
  setBillingAddressField,
  setSameAsShipping,

  // Checkout Process Actions
  setCurrentStep,
  nextStep,
  previousStep,
  setIsProcessing,
  setCheckoutError,
  clearCheckoutError,
  completeOrder,

  // Reset Actions
  resetCheckoutForm,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

// Selectors
export const selectSelectedPaymentMethod = (state) => state.checkout.selectedPaymentMethod;
export const selectCardFormData = (state) => state.checkout.cardFormData;
export const selectWireFormData = (state) => state.checkout.wireFormData;
export const selectShowCardDialog = (state) => state.checkout.showCardDialog;
export const selectShowWireDialog = (state) => state.checkout.showWireDialog;
export const selectSelectedCourier = (state) => state.checkout.selectedCourier;
export const selectShippingType = (state) => state.checkout.shippingType;
export const selectShippingCostLoading = (state) => state.checkout.shippingCostLoading;
export const selectDynamicShippingCost = (state) => state.checkout.dynamicShippingCost;
export const selectOrderSummary = (state) => state.checkout.orderSummary;
export const selectDiscountCoupon = (state) => state.checkout.discountCoupon;
export const selectShippingAddress = (state) => state.checkout.shippingAddress;
export const selectBillingAddress = (state) => state.checkout.billingAddress;
export const selectCurrentStep = (state) => state.checkout.currentStep;
export const selectIsProcessing = (state) => state.checkout.isProcessing;
export const selectCheckoutError = (state) => state.checkout.error;
export const selectOrderComplete = (state) => state.checkout.orderComplete;
export const selectOrderId = (state) => state.checkout.orderId;

// Computed selectors
export const selectFormattedTotal = (state) => {
  const total = state.checkout.orderSummary.total;
  return `$${total.toFixed(2)}`;
};

export const selectIsFormValid = (state) => {
  const { selectedPaymentMethod, cardFormData, wireFormData, shippingAddress } = state.checkout;

  // Check if payment method is selected
  if (!selectedPaymentMethod) return false;

  // Check payment method specific validations
  if (selectedPaymentMethod === 'debit-credit-card') {
    return cardFormData.cardHolderName && cardFormData.expiry && cardFormData.securityCode;
  }

  if (selectedPaymentMethod === 'ach-wire-transfer') {
    return wireFormData.accountHolderName && wireFormData.accountNumber;
  }

  // Check shipping address
  return shippingAddress.firstName && shippingAddress.lastName && shippingAddress.address1 && shippingAddress.city;
};

export const selectCanProceedToPayment = (state) => {
  return state.checkout.selectedCourier && state.checkout.shippingType;
};

// Payment payload selector
export const selectPaymentPayload = (state) => {
  const checkout = state.checkout;
  const cart = state.cart;

  // Map payment method to backend expected values
  const getPaymentType = (paymentMethod) => {
    switch (paymentMethod) {
      case 'cash-on-delivery':
        return 'COD';
      case 'debit-credit-card':
        return 'CARD';
      case 'ach-wire-transfer':
        return 'ACH/WT';
      default:
        return 'COD';
    }
  };

  // Determine if this is a wholesale order
  const hasWholesaleProducts = cart.items.some((item) => item.isWholesale);

  // For wholesale orders, all products go in the products array with additional fields
  // For regular orders, products go in products array with minimal fields
  const products = cart.items.map((item) => {
    // Ensure no NaN values
    const price = parseFloat(item.price || 1);
    const quantity = parseInt(item.quantity || 1);
    const total = parseFloat(item.totalPrice || 1);

    const baseProductData = {
      product: item.originalId, // This should be the MongoDB ObjectId
      price: isNaN(price) ? 1 : Math.max(1, price), // Ensure valid number
      quantity: isNaN(quantity) ? 1 : Math.max(1, quantity), // Ensure valid number
      total: isNaN(total) ? 1 : Math.max(1, total), // Ensure valid number
    };

    // Add additional fields for wholesale products
    if (hasWholesaleProducts) {
      return {
        ...baseProductData,
        name: item.name,
        sku: item.sku || `${item.name.replace(/\s+/g, '-')}-${item.selectedVolume}`, // Generate SKU if not available
        price: (isNaN(price) ? 1 : Math.max(1, price)).toFixed(2), // String format for wholesale
        tax: '0.00', // Default tax per item
        total: (isNaN(total) ? 1 : Math.max(1, total)).toFixed(2), // String format for wholesale
      };
    }

    return baseProductData;
  });

  const shippingDetails = {
    first_name: checkout.shippingAddress.firstName,
    last_name: checkout.shippingAddress.lastName,
    email: checkout.shippingAddress.email,
    phone: checkout.shippingAddress.phone,
    country: checkout.shippingAddress.country,
    city: checkout.shippingAddress.city,
    province: checkout.shippingAddress.province,
    post_code: checkout.shippingAddress.postalCode,
    street_address: checkout.shippingAddress.streetAddress,
    // Add courier specific fields
    fedex_service_type: checkout.shippingType?.toUpperCase(),
    countryCode: checkout.shippingAddress.country,
  };

  const billingDetails = checkout.billingAddress.sameAsShipping
    ? { ...shippingDetails }
    : {
        first_name: checkout.billingAddress.firstName,
        last_name: checkout.billingAddress.lastName,
        email: checkout.billingAddress.email,
        phone: checkout.billingAddress.phone,
        country: checkout.billingAddress.country,
        city: checkout.billingAddress.city,
        province: checkout.billingAddress.province,
        post_code: checkout.billingAddress.postalCode,
        street_address: checkout.billingAddress.streetAddress,
        fedex_service_type: checkout.shippingType?.toUpperCase(),
        countryCode: checkout.billingAddress.country,
      };

  return {
    // Customer info (will be set by backend from auth token)
    customer_email: checkout.shippingAddress.email,

    // Products array (structure depends on wholesale vs regular)
    products: products,

    // Customer name
    customer_name: `${checkout.shippingAddress.firstName} ${checkout.shippingAddress.lastName}`,

    // Address details
    shipping_details: shippingDetails,
    billing_details: billingDetails,

    // Order totals (match backend field names) - ensure no NaN values
    sub_total: (() => {
      const val = parseFloat(checkout.orderSummary.subtotal || 1);
      return isNaN(val) ? 1 : Math.max(1, val);
    })(),
    shipping_amount: (() => {
      const val = parseFloat(checkout.orderSummary.shipping || 1);
      return isNaN(val) ? 1 : Math.max(1, val);
    })(),
    total: (() => {
      const val = parseFloat(checkout.orderSummary.total || 1);
      return isNaN(val) ? 1 : Math.max(1, val);
    })(),

    // Tax amount handling (backend requires min 1 for all order types)
    tax_amount: (() => {
      const val = parseFloat(checkout.orderSummary.tax || 1);
      return isNaN(val) ? 1 : Math.max(1, val);
    })(),

    // Only include discount_amount if there's actually a discount
    ...(checkout.orderSummary.discount > 0 && {
      discount_amount: (() => {
        const val = parseFloat(checkout.orderSummary.discount);
        return isNaN(val) ? 1 : Math.max(1, val);
      })(),
    }),

    // Payment info
    payment_type: getPaymentType(checkout.selectedPaymentMethod),
    payment_status: checkout.selectedPaymentMethod === 'cash-on-delivery' ? 'Unpaid' : 'Pending',

    // Order type
    type: hasWholesaleProducts ? 'Wholesale' : 'Regular',

    // Coupon (if applied)
    ...(checkout.discountCoupon.applied &&
      checkout.discountCoupon.couponId && { coupon: checkout.discountCoupon.couponId }),

    // Payment info (will be populated based on payment method)
    payment_info: {},
  };
};
