'use client';

import { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const Navbar = () => {
  const t = useTranslations('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-100 w-full text-white transition-colors duration-300 ${
        isScrolled ? 'bg-umbra-100' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-[80px] py-4">
        <Link href={`/`}>
          <Image src="/assets/svgs/logos/logo-light.svg" alt="Logo" width={221} height={36} />
        </Link>
        <div className="flex items-center gap-[30px]">
          <Link href={`/login`} className="mx-[5px] font-sans text-[17px] font-normal hover:underline">
            {t('Log_in')}
          </Link>
          <Link href={`/cart`} className="mx-[5px] font-sans text-[17px] font-normal hover:underline">
            {t('Cart')} <span className="text-white/60">(0)</span>
          </Link>
          <div className="cursor-pointer">
            <PlusIcon width={20} height={20} color="white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
