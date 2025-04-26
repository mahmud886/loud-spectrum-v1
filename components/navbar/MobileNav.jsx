'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import CloseButton from '@/components/navbar/CloseButton';
import Image from 'next/image';
import { Search } from 'lucide-react';

const MobileNav = ({ onClose }) => {
  const t = useTranslations('Navbar');
  const topNav = useTranslations('Navbar.TopNav');
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-10">
        <div className="flex w-full items-center justify-between">
          {/* Logo Section */}
          <Link href={`/`}>
            <Image
              src={`/assets/svgs/logos/logo-dark.svg`}
              alt="Logo"
              width={221}
              height={36}
              className="h-[25px] w-[153px] cursor-pointer md:h-[36px] md:w-[221px] lg:h-[36px] lg:w-[221px]"
              priority
            />
          </Link>
          {/* Cart and Close Button Section */}
          <div className="flex items-center gap-[30px]">
            <Link
              href={`/cart`}
              className="text-umbra-100 hover:text-umbra-40 mx-[5px] font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out"
            >
              {t('Cart')} <span className="text-inherit/60">(0)</span>
            </Link>
            <CloseButton onClose={onClose} />
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
        <div className="flex flex-col gap-4">
          <Link href="/about" className={'navLinkClass'}>
            {topNav('About')}
          </Link>
          <Link href="/lab" className={'navLinkClass'}>
            {topNav('The_lab')}
          </Link>
          <Link href="/shop" className={'navLinkClass'}>
            {topNav('Shop')}
          </Link>
          <Link href="/new" className={'navLinkClass'}>
            {topNav('New')}
          </Link>
          <Link href="/terpene-guide" className={'navLinkClass'}>
            Terpene Guide
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Link
          href={`/wholesale`}
          className="main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-4"
        >
          Wholesale
        </Link>
        <Link
          href={`/login`}
          className="outline-button-white inline-flex w-full items-center justify-center rounded-full border px-6 py-4"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
