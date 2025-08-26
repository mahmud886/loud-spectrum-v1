import { createSelector, createSlice } from '@reduxjs/toolkit';

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
  selectedCourier: '',
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
    couponType: '',
    applied: false,
    discountAmount: 0,
    originalDiscountValue: 0, // Store the original value from API (e.g., 10 for 10% or $10)
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

  // Guest User State
  guestUser: {
    customerEmail: '',
    customerPassword: '', // Optional - for registration
    isGuest: false, // Whether this is a guest checkout
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
      state.discountCoupon.couponType = payload.couponType || '';
      state.discountCoupon.discountAmount = payload.discountAmount;
      state.discountCoupon.originalDiscountValue = payload.originalDiscountValue; // Store original value
      state.orderSummary.discount = payload.discountAmount;
      state.orderSummary.total = calculateTotal(state.orderSummary);
      state.discountCoupon.error = null;
    },

    removeCoupon: (state) => {
      state.discountCoupon = {
        code: '',
        couponId: null,
        couponType: '',
        applied: false,
        discountAmount: 0,
        originalDiscountValue: 0, // Reset original value
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
      } else {
        // Clear billing address fields when not same as shipping
        state.billingAddress = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          city: '',
          province: '',
          postalCode: '',
          streetAddress: '',
          sameAsShipping: false,
        };
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

    // Clear checkout state on fresh login
    clearCheckoutOnLogin: (state) => {
      return { ...initialState };
    },

    // Reset processing state only (without clearing other data)
    resetProcessingState: (state) => {
      state.isProcessing = false;
      state.error = null;
    },

    // Guest User Actions
    setGuestUserField: (state, { payload }) => {
      const { name, value } = payload;
      // Ensure guestUser object exists
      if (!state.guestUser) {
        state.guestUser = {
          customerEmail: '',
          customerPassword: '',
          isGuest: false,
        };
      }
      state.guestUser[name] = value;
    },

    updateGuestUser: (state, { payload }) => {
      // Ensure guestUser object exists
      if (!state.guestUser) {
        state.guestUser = {
          customerEmail: '',
          customerPassword: '',
          isGuest: false,
        };
      }
      state.guestUser = { ...state.guestUser, ...payload };
    },

    setIsGuest: (state, { payload }) => {
      // Ensure guestUser object exists
      if (!state.guestUser) {
        state.guestUser = {
          customerEmail: '',
          customerPassword: '',
          isGuest: false,
        };
      }
      state.guestUser.isGuest = payload;
      // If switching to guest mode, clear any user-specific data
      if (payload) {
        // Don't clear address data as guest users still need to fill it
      }
    },

    resetGuestUser: (state) => {
      state.guestUser = {
        customerEmail: '',
        customerPassword: '',
        isGuest: false,
      };
    },

    // Set default addresses from user data
    setDefaultAddresses: (state, { payload }) => {
      const { defaultAddress } = payload;

      if (defaultAddress) {
        // Map the address fields from the API response to checkout state
        state.shippingAddress = {
          firstName: defaultAddress.first_name || '',
          lastName: defaultAddress.last_name || '',
          email: defaultAddress.email || '',
          phone: defaultAddress.phone || '',
          country: defaultAddress.country || '',
          city: defaultAddress.city || '',
          province: defaultAddress.province || defaultAddress.state || '',
          postalCode: defaultAddress.post_code || defaultAddress.postal_code || '',
          streetAddress: defaultAddress.street_address || '',
        };

        // Set billing address same as shipping by default
        state.billingAddress = {
          ...state.shippingAddress,
          sameAsShipping: true,
        };
      }
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

  // Guest User Actions
  setGuestUserField,
  updateGuestUser,
  setIsGuest,
  resetGuestUser,

  // Checkout Process Actions
  setCurrentStep,
  nextStep,
  previousStep,
  setIsProcessing,
  setCheckoutError,
  clearCheckoutError,
  completeOrder,
  resetProcessingState,

  // Reset Actions
  resetCheckoutForm,
  resetCheckout,
  clearCheckoutOnLogin,
  setDefaultAddresses,
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
export const selectGuestUser = (state) =>
  state.checkout.guestUser || {
    customerEmail: '',
    customerPassword: '',
    isGuest: false,
  };
export const selectIsGuest = (state) => state.checkout.guestUser?.isGuest || false;

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
  return shippingAddress.firstName && shippingAddress.lastName && shippingAddress.streetAddress && shippingAddress.city;
};

export const selectCanProceedToPayment = (state) => {
  return state.checkout.selectedCourier && state.checkout.shippingType;
};

// Payment payload selector
export const selectPaymentPayload = createSelector(
  [(state) => state.checkout, (state) => state.cart, (state) => state.auth],
  (checkout, cart, auth) => {
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

    // Separate regular and wholesale products
    const regularProducts = cart.items
      .filter((item) => !item.isWholesale)
      .map((item) => {
        // Ensure no NaN values
        const price = parseFloat(item.price || 1);
        const quantity = parseInt(item.quantity || 1);
        const total = parseFloat(item.totalPrice || 1);

        // Get subProduct data (now it's a single object, not an array)
        const subProduct = item?.subProducts;
        return {
          flavor: item.flavor || '',
          remarks: item.remarks || '',
          product: subProduct?._id || item.id,
          name: item.name || item.product?.name,
          volume: item.selectedVolume,
          sku:
            subProduct?.sku ||
            `${(item.name || item.product?.name || 'product').replace(/\s+/g, '-')}-${item.selectedVolume}`,
          price: (isNaN(price) ? 1 : Math.max(1, price)).toFixed(2),
          quantity: isNaN(quantity) ? 1 : Math.max(1, quantity),
          tax: '0.00',
          total: (isNaN(total) ? 1 : Math.max(1, total)).toFixed(2),
        };
      });

    const wholesaleProducts = cart.items
      .filter((item) => item.isWholesale)
      .map((item) => {
        // Ensure no NaN values
        const price = parseFloat(item.price || 1);
        const quantity = parseInt(item.quantity || 1);
        const total = parseFloat(item.totalPrice || 1);

        // Get subProduct data (now it's a single object, not an array)
        const subProduct = item.product?.subProducts;

        return {
          product: item.originalId,
          name: item.name,
          volume: item.selectedVolume,
          sku: item.sku || `${item.name.replace(/\s+/g, '-')}-${item.selectedVolume}`,
          price: (isNaN(price) ? 1 : Math.max(1, price)).toFixed(2),
          quantity: isNaN(quantity) ? 1 : Math.max(1, quantity),
          total: (isNaN(total) ? 1 : Math.max(1, total)).toFixed(2),
          attribute: JSON.stringify({ flavor: item.flavor || '' }),
        };
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
      // Customer info (will be set by backend from auth token or guest data)
      customer: auth?.user?.id || null, // Customer ID from auth state
      customer_email: checkout.guestUser?.isGuest ? checkout.guestUser?.customerEmail : checkout.shippingAddress.email,
      // Guest user specific fields
      ...(checkout.guestUser?.isGuest && {
        guest_checkout: true,
        guest_password: checkout.guestUser?.customerPassword || null, // Optional for registration
      }),

      // Separate product arrays
      ...(regularProducts.length > 0 && { products: regularProducts }),
      ...(wholesaleProducts.length > 0 && { ws_products: wholesaleProducts }),

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
        const val = parseFloat(checkout.orderSummary.tax || 0);
        return isNaN(val) ? 0 : Math.max(0, val);
      })(),

      // Discount amount handling (backend requires min 1 for all order types)
      discount_amount: (() => {
        const val = parseFloat(checkout.orderSummary.discount || 0);
        return isNaN(val) ? 0 : Math.max(0, val);
      })(),

      // Payment info
      payment_type: getPaymentType(checkout.selectedPaymentMethod),
      payment_status: checkout.selectedPaymentMethod === 'cash-on-delivery' ? 'Unpaid' : 'Pending',

      // Coupon (if applied)
      ...(checkout.discountCoupon.applied &&
        checkout.discountCoupon.couponId && { coupon: checkout.discountCoupon.couponId }),

      // Payment info (will be populated based on payment method)
      payment_info: {},
    };
  },
);
