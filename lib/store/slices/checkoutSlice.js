import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ui: {
    showCardDialog: false,
    showWireDialog: false,
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
    subtotal: 0,
    shipping: 0,
    discount: 0,
    couponCode: '',
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
      state.order = { ...state.order, ...action.payload };
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
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
