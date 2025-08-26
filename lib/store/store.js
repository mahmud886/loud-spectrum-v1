import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from './storage';

import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import uiReducer from './slices/uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'checkout'],
  version: 1,
  migrate: (state) => {
    // Handle any state migrations here
    return Promise.resolve(state).then((migratedState) => {
      // Ensure cart state is properly structured
      if (migratedState && migratedState.cart) {
        // If items is not an array, reset it
        if (!Array.isArray(migratedState.cart.items)) {
          migratedState.cart.items = [];
        }

        // Ensure other cart properties exist
        if (typeof migratedState.cart.totalQuantity !== 'number') {
          migratedState.cart.totalQuantity = 0;
        }

        if (typeof migratedState.cart.totalAmount !== 'number') {
          migratedState.cart.totalAmount = 0;
        }
      }

      // Ensure checkout state is properly structured
      if (migratedState && migratedState.checkout) {
        // Ensure guestUser object exists
        if (!migratedState.checkout.guestUser) {
          migratedState.checkout.guestUser = {
            customerEmail: '',
            customerPassword: '',
            isGuest: false,
          };
        }
      }

      return migratedState;
    });
  },
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
