'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const TopNav = ({ setMenuOpen, menuOpen, ref }) => {
  const t = useTranslations('');
  const [shouldRender, setShouldRender] = useState(true); // Controls internal visibility

  // When exit animation finishes, call setMenuOpen(false)
  const handleClose = () => {
    setShouldRender(false);
  };

  // After exit animation (200ms), unmount completely
  useEffect(() => {
    if (!shouldRender) {
      const timer = setTimeout(() => {
        setMenuOpen(false);
      }, 200); // match with motion transition.duration
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
          <div className="divide-umbra-40 mx-auto grid h-full w-[1440px] grid-cols-1 divide-x text-black md:grid-cols-3">
            {/* Left Section */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, height: 554 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex w-[480px] flex-col items-start gap-6 bg-white py-[50px] pr-[60px] pl-[80px]"
            >
              <div className="space-y-12">
                <div>
                  <Link href={`/`}>
                    <Image src="/assets/svgs/logos/logo-dark.svg" alt="Logo" width={221} height={36} />
                  </Link>
                </div>
                <div className="flex h-full flex-col items-start justify-between gap-4">
                  <div>
                    <Image
                      src="/assets/images/nav-product.png"
                      alt="Product Highlight"
                      width={300}
                      height={175}
                      className="h-[175px] w-[300px]"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-umbra-100 font-sans text-[13px] font-normal">Product name</p>
                      <p className="text-umbra-40 font-sans text-[13px] font-normal">Product of the month</p>
                    </div>
                  </div>
                  <div className="group relative mt-4 w-full">
                    <input
                      type="text"
                      placeholder="Search products"
                      className="border-umbra-20 group-hover:text-umbra-100 text-umbra-100 placeholder-text-umbra-20 w-full border-b bg-transparent py-5 pr-10 text-sm transition duration-300 focus:outline-none"
                    />
                    <div className="border-umbra-5/10 bg-umbra-5 text-umbra-10 group-hover:border-umbra-10 group-hover:bg-umbra-10 group-hover:text-umbra-100 absolute top-1/2 right-0 -translate-y-1/2 rounded-full border p-3 transition duration-300">
                      <Search width={13} height={13} color="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Middle Section */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, height: 554 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex w-[480px] flex-col gap-6 bg-white px-[60px] pt-[120px] pb-[50px] pl-[60px] text-4xl font-semibold"
            >
              <div className="flex h-full flex-col justify-center gap-12">
                <div>
                  <button className="main-button-black rounded-full px-6 py-2">Wholesale</button>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="/about" className="text-umbra-100 font-mono text-[40px] leading-[100%] font-normal">
                    About
                  </Link>
                  <Link href="/lab" className="text-umbra-100 font-mono text-[40px] leading-[100%] font-normal">
                    The lab
                  </Link>
                  <Link href="/shop" className="text-umbra-100 font-mono text-[40px] leading-[100%] font-normal">
                    Shop
                  </Link>
                  <Link href="/new" className="text-umbra-100 font-mono text-[40px] leading-[100%] font-normal">
                    New
                  </Link>
                  <Link
                    href="/product-guide"
                    className="text-umbra-100 font-mono text-[40px] leading-[100%] font-normal"
                  >
                    Product guide
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, height: 554 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-[480px] bg-white px-[80px] py-[50px]"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-end gap-[30px]">
                  <Link href={`/login`} className="mx-[5px] font-sans text-[20px] font-normal hover:underline">
                    {t('Log_in')}
                  </Link>
                  <Link href={`/cart`} className="mx-[5px] font-sans text-[20px] font-normal hover:underline">
                    {t('Cart')} <span className="text-inherit/60">(0)</span>
                  </Link>
                  <div className="cursor-pointer" onClick={handleClose}>
                    <X width={27} height={27} color={'#191919'} className="hover:text-umbra-40" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-gray-400">Shop by</p>
                  {['Alive', 'Dank', 'Sweet', 'Classic'].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b py-2 text-sm">
                      <span>{item}</span>
                      <span className="border px-2 text-sm">Line</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopNav;
