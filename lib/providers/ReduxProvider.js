'use client';

import LoadingShimmer from '@/components/LoadingShimmer';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store/store';

export function ReduxProvider({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingShimmer />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
