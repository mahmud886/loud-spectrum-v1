'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store/store';

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex min-h-screen items-center justify-center">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"></div>
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
