'use client';

import { useEffect, useRef, useState } from 'react';
import { PlusIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import TopNav from '@/components/TopNav';

const Navbar = ({ locale }) => {
  const t = useTranslations('');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const specialPaths = [
    'blog',
    'wholesale',
    'wholesale-registration',
    'terms-and-conditions',
    'privacy-policy',
    'login',
    'lab',
    'terpene-chart',
    'faq',
  ];

  const isSpecialPath = specialPaths.some(
    (path) => pathname === `/${locale}/${path}` || pathname.startsWith(`/${locale}/${path}/`),
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click
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

  const navBg = isSpecialPath ? 'bg-white-100' : isScrolled ? 'bg-umbra-100' : 'bg-transparent';
  const textColor = isSpecialPath ? 'text-umbra-100' : 'text-white';
  const logoSrc = isSpecialPath ? '/assets/svgs/logos/logo-dark.svg' : '/assets/svgs/logos/logo-light.svg';

  return (
    <>
      <nav className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${navBg} ${textColor}`}>
        <div
          className={`container mx-auto flex items-center justify-between px-[80px] ${isScrolled ? 'py-5' : 'py-12'} transition-all duration-300`}
        >
          <Link href={`/`}>
            <Image src={logoSrc} alt="Logo" width={221} height={36} />
          </Link>
          <div className="flex items-center gap-[30px]">
            <Link href={`/login`} className="mx-[5px] font-sans text-[20px] font-normal hover:underline">
              {t('Log_in')}
            </Link>
            <Link href={`/cart`} className="mx-[5px] font-sans text-[20px] font-normal hover:underline">
              {t('Cart')} <span className="text-inherit/60">(0)</span>
            </Link>
            <div className="cursor-pointer" onClick={() => setMenuOpen(true)}>
              <PlusIcon width={27} height={27} color={isSpecialPath ? '#191919' : 'white'} />
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && <TopNav ref={menuRef} setMenuOpen={setMenuOpen} />}
    </>
  );
};

export default Navbar;
