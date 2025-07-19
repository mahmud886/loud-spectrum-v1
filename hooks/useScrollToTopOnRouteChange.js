'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

/**
 * Custom hook that automatically scrolls to top when route changes
 * @param {Object} options - Configuration options
 * @param {boolean} [options.smooth=true] - Whether to use smooth scrolling
 * @param {number} [options.duration=500] - Duration of smooth scroll in milliseconds
 */
const useScrollToTopOnRouteChange = (options = {}) => {
  const { smooth = true, duration = 500 } = options;
  const pathname = usePathname();

  const scrollToTop = useCallback(() => {
    // Only execute on client side
    if (typeof window === 'undefined') return;

    if (smooth) {
      const start = window.pageYOffset;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(0, start * (1 - progress));

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    } else {
      window.scrollTo(0, 0);
    }
  }, [smooth, duration]);

  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);
};

export default useScrollToTopOnRouteChange;
