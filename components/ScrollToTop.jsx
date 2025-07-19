'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ScrollToTop component with optional layout transitions
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {boolean} props.enableTransition - Enable page transitions
 * @param {string} props.transitionType - Type of transition ('fade', 'slide', 'slideUp', 'scale')
 * @param {number} props.duration - Animation duration in seconds
 * @param {string} props.scrollBehavior - Scroll behavior ('smooth', 'auto')
 * @param {Object} props.customVariants - Custom Framer Motion variants
 * @param {string} props.className - Additional CSS classes
 */
function ScrollToTop({
  children,
  enableTransition = false,
  transitionType = 'fade',
  duration = 0.3,
  scrollBehavior = 'smooth',
  customVariants = null,
  className = '',
}) {
  const pathname = usePathname();

  // Default transition variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -100, opacity: 0 },
    },
    slideUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
    },
    scale: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.05, opacity: 0 },
    },
  };

  const currentVariants = customVariants || variants[transitionType] || variants.fade;

  const transition = {
    duration,
    ease: 'easeInOut',
  };

  useEffect(() => {
    // Only scroll on client side
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: scrollBehavior,
      });
    }
  }, [pathname, scrollBehavior]);

  // If transitions are disabled, return children without animation
  if (!enableTransition) {
    return <>{children}</>;
  }

  // Return with page transitions
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={currentVariants.initial}
        animate={currentVariants.animate}
        exit={currentVariants.exit}
        transition={transition}
        className={className}
        layout
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default ScrollToTop;
