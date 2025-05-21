'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-left"
      richColors
      closeButton
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}
