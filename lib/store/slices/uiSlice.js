import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartDrawerOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCartDrawer: (state) => {
      state.cartDrawerOpen = true;
    },
    closeCartDrawer: (state) => {
      state.cartDrawerOpen = false;
    },
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
  },
});

export const { openCartDrawer, closeCartDrawer, toggleCartDrawer } = uiSlice.actions;

export const selectCartDrawerOpen = (state) => state?.ui?.cartDrawerOpen || false;

export default uiSlice.reducer;
