'use client';

import { RippleLoader } from '@/components/ui/RippleLoader';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store/store';

export function ReduxProvider({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything until client is ready to prevent hydration issues
  // if (isClient) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <RippleLoader />
  //     </div>
  //   );
  // }

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex min-h-screen items-center justify-center">
            <RippleLoader />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
