'use client';

import MenuButton from '@/components/navbar/MenuButton';
import TopNav from '@/components/TopNav';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartDrawer from '@/components/CartDrawer';

const Navbar = ({ locale }) => {
  const t = useTranslations('');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

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

  const navBg = isSpecialPath
    ? 'bg-white-100/60 backdrop-blur-xl'
    : isScrolled
      ? 'bg-umbra-100/80 backdrop-blur-xl'
      : 'bg-transparent';
  const textColor = isSpecialPath ? 'text-umbra-100' : 'text-white';
  const logoSrc = isSpecialPath ? '/assets/svgs/logos/logo-dark.svg' : '/assets/svgs/logos/logo-light.svg';

  return (
    <>
      <nav className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${navBg} ${textColor}`}>
        <div
          className={`container mx-auto flex items-center justify-between px-5 md:px-[40px] lg:px-[40px] xl:px-[80px] ${isScrolled ? 'py-5' : 'py-12'} transition-all duration-300`}
        >
          {!isScrolled && (
            <div className="absolute top-0 left-1/2 -z-10 w-full -translate-x-1/2">
              <div
                className={`${
                  isSpecialPath
                    ? 'shadow-[0px_0px_300px_150px_rgba(255,255,255,0.9)]'
                    : 'shadow-[0px_0px_300px_150px_rgba(0,0,0,0.9)]'
                }`}
              />
            </div>
          )}
          <Link href={`/`}>
            <Image
              src={logoSrc}
              alt="Logo"
              width={221}
              height={36}
              className="h-[25px] w-[153px] cursor-pointer md:h-[36px] md:w-[221px] lg:h-[36px] lg:w-[221px]"
              priority
            />
          </Link>
          <div className="flex items-center gap-[30px]">
            <Link
              href={`/login`}
              className={`mx-[5px] hidden font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out md:flex ${
                isSpecialPath ? 'hover:text-umbra-40 text-[#191919]' : 'text-white-100 hover:text-white-40'
              }`}
            >
              {t('Log_in')}
            </Link>

            <a
              onClick={() => {
                setCartOpen(true);
              }}
              className={`mx-[5px] cursor-pointer font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out ${
                isSpecialPath ? 'hover:text-umbra-40 text-[#191919]' : 'text-white-100 hover:text-white-40'
              }`}
            >
              {t('Cart')} <span className={`${isSpecialPath ? 'text-umbra-40' : 'text-white-40'}`}>(0)</span>
            </a>
            <MenuButton setMenuOpen={setMenuOpen} isSpecialPath={isSpecialPath} />
          </div>
        </div>
      </nav>

      {menuOpen && <TopNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cartItems={[]} />
    </>
  );
};

export default Navbar;
