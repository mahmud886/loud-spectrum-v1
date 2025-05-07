'use client';

import { useCallback } from 'react';

/**
 * Custom hook for scrolling to the top of the page
 * @param {Object} options - Configuration options
 * @param {boolean} [options.smooth=true] - Whether to use smooth scrolling
 * @param {number} [options.duration=500] - Duration of smooth scroll in milliseconds
 * @returns {Function} - Function to trigger scroll to top
 */
const useScrollToTop = (options = {}) => {
  const { smooth = true, duration = 500 } = options;

  const scrollToTop = useCallback(() => {
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

  return scrollToTop;
};

export default useScrollToTop;
