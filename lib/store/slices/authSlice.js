import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        phone_number: payload.phone_number,
        role: payload.role,
        status: payload.status,
        addresss: payload.addresss,
      };
      state.token = payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setUserAddresses: (state, { payload }) => {
      if (state.user) {
        state.user.addresss = payload;
      }
    },
    addUserAddress: (state, { payload }) => {
      if (state.user) {
        if (!state.user.addresss) {
          state.user.addresss = [];
        }
        state.user.addresss.push(payload);
      }
    },
    updateUserAddress: (state, { payload }) => {
      if (state.user && state.user.addresss) {
        const addressIndex = state.user.addresss.findIndex((addr) => addr._id === payload._id);
        if (addressIndex !== -1) {
          state.user.addresss[addressIndex] = payload;
        }
      }
    },
    removeUserAddress: (state, { payload }) => {
      if (state.user && state.user.addresss) {
        state.user.addresss = state.user.addresss.filter((addr) => addr._id !== payload);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  setLoading,
  setError,
  setUserAddresses,
  addUserAddress,
  updateUserAddress,
  removeUserAddress,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserAddresses = (state) => state.auth.user?.addresss || [];
