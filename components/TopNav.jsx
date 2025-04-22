'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import TopNavLeft from './navbar/TopNavLeft';
import TopNavMiddle from './navbar/TopNavMiddle';
import TopNavRight from './navbar/TopNavRight';

const TopNav = ({ setMenuOpen, menuOpen }) => {
  const t = useTranslations('');
  const [shouldRender, setShouldRender] = useState(true);
  const menuRef = useRef(null);

  // When exit animation finishes, call setMenuOpen(false)
  const handleClose = () => {
    setShouldRender(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // After exit animation (200ms), unmount completely
  useEffect(() => {
    if (!shouldRender) {
      const timer = setTimeout(() => {
        setMenuOpen(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [shouldRender, setMenuOpen]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 554 }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="fixed top-0 right-0 left-0 z-50 overflow-hidden"
        >
          <div
            className="divide-umbra-40 mx-auto grid h-full w-[1440px] grid-cols-1 divide-x text-black md:grid-cols-3"
            // ref={menuRef}
          >
            {/* Left Section */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, height: 554 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex w-[480px] flex-col items-start gap-6 bg-white py-[50px] pr-[60px] pl-[80px]"
            >
              <TopNavLeft />
            </motion.div>

            {/* Middle Section */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, height: 554 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex w-[480px] flex-col gap-6 bg-white px-[60px] pt-[120px] pb-[50px] pl-[60px] text-4xl font-semibold"
            >
              <TopNavMiddle />
            </motion.div>

            {/* Right Section */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, height: 554 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-[480px] bg-white py-[50px] pr-[80px] pl-[60px]"
            >
              <TopNavRight onClose={handleClose} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopNav;
