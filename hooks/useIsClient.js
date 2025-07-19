'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if the component is running on the client side
 * Useful for preventing hydration mismatches
 * @returns {boolean} - True if running on client side, false during SSR
 */
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

/**
 * Hook to safely access window object
 * Returns null during SSR and window object on client
 * @returns {Window | null} - Window object or null
 */
export const useWindow = () => {
  const [windowObj, setWindowObj] = useState(null);

  useEffect(() => {
    setWindowObj(window);
  }, []);

  return windowObj;
};
