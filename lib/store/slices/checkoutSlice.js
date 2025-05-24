import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ui: {
    showCardDialog: false,
    showWireDialog: false,
  },
  status: {
    loading: false,
    error: null,
  },
  validation: {
    cardForm: {
      isValid: false,
      errors: {},
    },
    wireForm: {
      isValid: false,
      errors: {},
    },
    shippingAddress: {
      isValid: false,
      errors: {},
    },
    billingAddress: {
      isValid: false,
      errors: {},
    },
  },
  paymentMethod: '',
  shipping: {
    billingOption: 'same',
    selectedCourier: 'fedex',
    shippingType: '',
  },
  cardForm: {
    cardHolderName: '',
    expiry: '',
    securityCode: '',
    postalCode: '',
  },
  wireForm: {
    accountHolderName: '',
    accountNumber: '',
    transactionId: '',
  },
  shippingAddress: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
  },
  billingAddress: {
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
  },
  order: {
    subtotal: 100,
    shipping: 20,
    discount: 0,
    total: 100,
    couponCode: '',
    couponApplied: false,
    couponDetails: null,
  },
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      state.ui.showCardDialog = action.payload === 'debit-credit-card';
      state.ui.showWireDialog = action.payload === 'ach-wire-transfer';
    },
    updateCardForm: (state, action) => {
      state.cardForm = { ...state.cardForm, ...action.payload };
    },
    updateWireForm: (state, action) => {
      state.wireForm = { ...state.wireForm, ...action.payload };
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload };
    },
    updateBillingAddress: (state, action) => {
      state.billingAddress = { ...state.billingAddress, ...action.payload };
    },
    toggleSameAsShipping: (state) => {
      state.billingAddress.sameAsShipping = !state.billingAddress.sameAsShipping;
      if (state.billingAddress.sameAsShipping) {
        state.billingAddress = { ...state.shippingAddress, sameAsShipping: true };
      }
    },
    setBillingOption: (state, action) => {
      state.shipping.billingOption = action.payload;
    },
    setSelectedCourier: (state, action) => {
      state.shipping.selectedCourier = action.payload;
    },
    setShippingType: (state, action) => {
      state.shipping.shippingType = action.payload;
    },
    closeDialogs: (state) => {
      state.ui.showCardDialog = false;
      state.ui.showWireDialog = false;
    },
    setOrderDetails: (state, action) => {
      state.order = {
        ...state.order,
        ...action.payload,
        total:
          (action.payload.subtotal || state.order.subtotal) +
          (action.payload.shipping || state.order.shipping) -
          state.order.discount,
      };
    },
    setLoading: (state, action) => {
      state.status.loading = action.payload;
    },
    setError: (state, action) => {
      state.status.error = action.payload;
    },
    clearError: (state) => {
      state.status.error = null;
    },
    setFormValidation: (state, action) => {
      const { formName, isValid, errors } = action.payload;
      state.validation[formName] = { isValid, errors };
    },
    clearFormValidation: (state, action) => {
      const formName = action.payload;
      state.validation[formName] = { isValid: false, errors: {} };
    },
    applyCoupon: (state, action) => {
      const { code, type, value } = action.payload;
      state.order.couponCode = code;
      state.order.couponApplied = true;
      state.order.couponDetails = { type, value };

      // Calculate discount based on type (percentage or fixed)
      if (type === 'percentage') {
        state.order.discount = (state.order.subtotal * value) / 100;
      } else {
        state.order.discount = value;
      }

      // Recalculate total
      state.order.total = state.order.subtotal + state.order.shipping - state.order.discount;
    },
    removeCoupon: (state) => {
      state.order.couponCode = '';
      state.order.couponApplied = false;
      state.order.couponDetails = null;
      state.order.discount = 0;
      // Recalculate total without discount
      state.order.total = state.order.subtotal + state.order.shipping;
    },
  },
});

export const {
  setPaymentMethod,
  updateCardForm,
  updateWireForm,
  updateShippingAddress,
  updateBillingAddress,
  toggleSameAsShipping,
  closeDialogs,
  setOrderDetails,
  setBillingOption,
  setSelectedCourier,
  setShippingType,
  setLoading,
  setError,
  clearError,
  setFormValidation,
  clearFormValidation,
  applyCoupon,
  removeCoupon,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

// Selectors
export const selectCheckoutState = (state) => state.checkout;
export const selectPaymentMethod = (state) => state.checkout.paymentMethod;
export const selectCardForm = (state) => state.checkout.cardForm;
export const selectWireForm = (state) => state.checkout.wireForm;
export const selectShippingAddress = (state) => state.checkout.shippingAddress;
export const selectBillingAddress = (state) => state.checkout.billingAddress;
export const selectOrderDetails = (state) => state.checkout.order;
export const selectShippingOptions = (state) => state.checkout.shipping;
export const selectCheckoutUI = (state) => state.checkout.ui;
export const selectCouponDetails = (state) => state.checkout.order.couponDetails;
export const selectIsCouponApplied = (state) => state.checkout.order.couponApplied;
export const selectDiscount = (state) => state.checkout.order.discount;
export const selectOrderTotal = (state) => state.checkout.order.total;
