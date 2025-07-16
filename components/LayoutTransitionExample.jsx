'use client';

import { motion } from 'framer-motion';
import useLayoutTransition from '../hooks/useLayoutTransition';

/**
 * Example component demonstrating various uses of the layout transition hook
 */
const LayoutTransitionExample = () => {
  // Basic usage with fade transition
  const {
    PageTransition,
    LayoutTransition,
    fadeIn,
    slideInUp,
    scaleIn,
    getStaggerProps,
    getContainerProps,
    scrollToElement,
    scrollToTop,
    isTransitioning,
  } = useLayoutTransition({
    duration: 0.4,
    type: 'slideUp',
    enableScrollToTop: true,
  });

  // Example with custom variants
  const customTransition = useLayoutTransition({
    duration: 0.5,
    type: 'custom',
    customVariants: {
      initial: { opacity: 0, scale: 0.8, rotate: -10 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      exit: { opacity: 0, scale: 0.8, rotate: 10 },
    },
  });

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Layout Transition Examples</h1>

      {/* Basic Page Transition */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">1. Basic Page Transition</h2>
        <PageTransition className="rounded-lg bg-blue-100 p-4">
          <p>This content will fade in on route changes.</p>
        </PageTransition>
      </section>

      {/* Layout Transition with AnimatePresence */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">2. Layout Transition</h2>
        <LayoutTransition className="rounded-lg bg-green-100 p-4">
          <p>This content uses AnimatePresence for smooth transitions.</p>
        </LayoutTransition>
      </section>

      {/* Staggered Animation */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">3. Staggered Animation</h2>
        <motion.div {...getContainerProps()} className="space-y-2">
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div key={item} {...getStaggerProps(index * 0.1)} className="rounded bg-yellow-100 p-3">
              Staggered Item {item}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Animation Presets */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">4. Animation Presets</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.div {...fadeIn} className="rounded-lg bg-purple-100 p-4">
            Fade In
          </motion.div>
          <motion.div {...slideInUp} className="rounded-lg bg-pink-100 p-4">
            Slide In Up
          </motion.div>
          <motion.div {...scaleIn} className="rounded-lg bg-indigo-100 p-4">
            Scale In
          </motion.div>
        </div>
      </section>

      {/* Custom Transition Example */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">5. Custom Transition</h2>
        <customTransition.PageTransition className="rounded-lg bg-red-100 p-4">
          <p>This uses custom variants with rotation and scale.</p>
        </customTransition.PageTransition>
      </section>

      {/* Interactive Controls */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">6. Interactive Controls</h2>
        <div className="space-x-4">
          <button
            onClick={() => scrollToTop()}
            className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Scroll to Top
          </button>
          <button
            onClick={() => scrollToElement('example-section', 100)}
            className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            Scroll to Section
          </button>
        </div>

        {isTransitioning && <div className="mt-4 rounded bg-orange-100 p-2">Page is transitioning...</div>}
      </section>

      {/* Target section for scroll example */}
      <section id="example-section" className="mt-16 rounded-lg bg-gray-100 p-8">
        <h3 className="text-xl font-semibold">Target Section</h3>
        <p>This section can be scrolled to using the scrollToElement function.</p>
      </section>
    </div>
  );
};

export default LayoutTransitionExample;
