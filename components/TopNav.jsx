import React from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TopNav = ({ setMenuOpen, ref }) => {
  const t = useTranslations('');
  return (
    <div className="fixed inset-0 top-0 z-50 overflow-y-auto" ref={ref}>
      <div className="divide-umbra-40 mx-auto grid h-[554px] w-[1440px] grid-cols-1 divide-x bg-white text-black md:grid-cols-3">
        {/* Left side with product */}
        <div className="flex w-[480px] flex-col items-start gap-6 py-[50px] pr-[60px] pl-[80px]">
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
        </div>

        {/* Middle navigation */}
        <div className="flex w-[480px] flex-col gap-6 px-[60px] pt-[120px] pb-[50px] pl-[60px] text-4xl font-semibold">
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
              <Link href="/product-guide" className="text-umbra-100 font-mono text-[40px] leading-[100%] font-normal">
                Product guide
              </Link>
            </div>
          </div>
        </div>

        {/* Right filters */}
        <div className="w-[480px] px-[80px] py-[50px]">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-end gap-[30px]">
              <Link href={`/login`} className="mx-[5px] font-sans text-[20px] font-normal hover:underline">
                {t('Log_in')}
              </Link>
              <Link href={`/cart`} className="mx-[5px] font-sans text-[20px] font-normal hover:underline">
                {t('Cart')} <span className="text-inherit/60">(0)</span>
              </Link>
              <div className="cursor-pointer" onClick={() => setMenuOpen(false)}>
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
        </div>
      </div>
    </div>
  );
};

export default TopNav;
