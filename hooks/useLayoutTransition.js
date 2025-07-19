'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook for layout transitions
 * @param {Object} options - Configuration options
 * @param {number} options.duration - Animation duration in seconds
 * @param {string} options.type - Animation type ('fade', 'slide', 'scale', 'custom')
 * @param {Object} options.customVariants - Custom Framer Motion variants
 * @param {boolean} options.enableRouteTransition - Enable route change transitions
 * @param {boolean} options.enableScrollToTop - Enable scroll to top on route change
 * @param {string} options.scrollBehavior - Scroll behavior ('smooth', 'auto')
 * @returns {Object} - Transition utilities and states
 */
export const useLayoutTransition = ({
  duration = 0.3,
  type = 'fade',
  customVariants = null,
  enableRouteTransition = true,
  enableScrollToTop = true,
  scrollBehavior = 'smooth',
} = {}) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousPath, setPreviousPath] = useState(pathname);

  // Pre-defined animation variants
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
    custom: customVariants || {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  // Get current animation variants
  const currentVariants = variants[type] || variants.fade;

  // Animation transition config
  const transition = {
    duration,
    ease: 'easeInOut',
  };

  // Handle route change effects
  useEffect(() => {
    if (pathname !== previousPath) {
      setIsTransitioning(true);

      // Scroll to top if enabled and on client side
      if (enableScrollToTop && typeof window !== 'undefined') {
        window.scrollTo({
          top: 0,
          behavior: scrollBehavior,
        });
      }

      // Reset transition state after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousPath(pathname);
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [pathname, previousPath, duration, enableScrollToTop, scrollBehavior]);

  // Smooth scroll to element
  const scrollToElement = useCallback(
    (elementId, offset = 0) => {
      // Only execute on client side
      if (typeof window === 'undefined') return;

      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: scrollBehavior,
        });
      }
    },
    [scrollBehavior],
  );

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    // Only execute on client side
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: 0,
      behavior: scrollBehavior,
    });
  }, [scrollBehavior]);

  // Layout transition wrapper props
  const getTransitionProps = useCallback(
    (key = pathname) => ({
      key,
      initial: enableRouteTransition ? currentVariants.initial : false,
      animate: enableRouteTransition ? currentVariants.animate : false,
      exit: enableRouteTransition ? currentVariants.exit : false,
      transition,
      layout: true,
    }),
    [pathname, enableRouteTransition, currentVariants, transition],
  );

  // Stagger children animation
  const getStaggerProps = useCallback(
    (delay = 0.1) => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: duration * 0.8,
        delay,
        ease: 'easeOut',
      },
    }),
    [duration],
  );

  // Container for staggered children
  const getContainerProps = useCallback(
    () => ({
      initial: 'initial',
      animate: 'animate',
      variants: {
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      },
    }),
    [],
  );

  // Page transition wrapper
  const PageTransition = useCallback(
    ({ children, className = '' }) => {
      const MotionDiv = require('framer-motion').motion.div;

      return (
        <MotionDiv className={className} {...getTransitionProps()}>
          {children}
        </MotionDiv>
      );
    },
    [getTransitionProps],
  );

  // Layout transition wrapper with AnimatePresence
  const LayoutTransition = useCallback(
    ({ children, className = '', mode = 'wait' }) => {
      const MotionDiv = require('framer-motion').motion.div;

      return (
        <AnimatePresence mode={mode}>
          <MotionDiv className={className} {...getTransitionProps()}>
            {children}
          </MotionDiv>
        </AnimatePresence>
      );
    },
    [getTransitionProps],
  );

  return {
    // State
    isTransitioning,
    pathname,
    previousPath,

    // Variants and config
    variants: currentVariants,
    transition,

    // Utility functions
    scrollToElement,
    scrollToTop,
    getTransitionProps,
    getStaggerProps,
    getContainerProps,

    // Components
    PageTransition,
    LayoutTransition,

    // Animation presets
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: duration * 0.6 },
    },
    slideInUp: {
      initial: { y: 30, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: duration * 0.8, ease: 'easeOut' },
    },
    slideInLeft: {
      initial: { x: -30, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: duration * 0.8, ease: 'easeOut' },
    },
    scaleIn: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: duration * 0.6, ease: 'easeOut' },
    },
  };
};

export default useLayoutTransition;
