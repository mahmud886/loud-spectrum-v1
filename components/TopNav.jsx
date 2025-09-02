'use client';

import MobileNav from '@/components/navbar/MobileNav';
import { toggleCartDrawer } from '@/lib/store/slices/uiSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import TopNavLeft from './navbar/TopNavLeft';
import TopNavMiddle from './navbar/TopNavMiddle';
import TopNavRight from './navbar/TopNavRight';

const TopNav = ({ setMenuOpen, menuOpen }) => {
  const t = useTranslations('');
  const [shouldRender, setShouldRender] = useState(true);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShouldRender(false);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
        if (menuRef.current.contains(event.target) && event.target.tagName === 'A') {
          setShouldRender(false);
        }
      }
    };
    if (menuOpen) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!shouldRender) {
      const timer = setTimeout(() => {
        setMenuOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldRender, setMenuOpen]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <>
          {/* For Larger Devices */}
          <div className="hidden xl:block">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 554 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="fixed top-0 right-0 left-0 z-50 overflow-hidden"
              ref={menuRef}
            >
              <div className="divide-umbra-40 mx-auto grid h-full w-full grid-cols-1 divide-x text-black xl:max-w-[1440px] xl:grid-cols-3">
                {/* Left Section */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, height: 554 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex w-auto flex-col items-start gap-6 bg-white py-[50px] pr-[60px] pl-[80px]"
                >
                  <TopNavLeft />
                </motion.div>

                {/* Middle Section */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, height: 554 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex w-auto flex-col gap-6 bg-white px-[60px] pt-[120px] pb-[50px] pl-[60px] text-4xl font-semibold"
                >
                  <TopNavMiddle />
                </motion.div>

                {/* Right Section */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, height: 554 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="w-auto bg-white py-[50px] pr-[80px] pl-[60px]"
                >
                  <TopNavRight onClose={handleClose} setCartOpen={() => dispatch(toggleCartDrawer())} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* For Mobile Devices */}
          <div className="xl:hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '100vh' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="fixed top-0 right-0 left-0 z-50 overflow-hidden"
              ref={menuRef}
            >
              <div className="divide-umbra-40 flex h-screen w-full flex-col divide-y text-black">
                {/* Right Section */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="h-screen w-full bg-white px-5 py-12"
                >
                  <MobileNav onClose={handleClose} setCartOpen={() => dispatch(toggleCartDrawer())} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TopNav;
