'use client';

import CartDrawer from '@/components/cart/CartDrawer';
import MenuButton from '@/components/navbar/MenuButton';
import TopNav from '@/components/TopNav';
import { useAuthToken } from '@/hooks/useAuthToken';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { logout } from '@/lib/store/slices/authSlice';
import { selectCartItems } from '@/lib/store/slices/cartSlice';
import { clearCheckoutOnLogin } from '@/lib/store/slices/checkoutSlice';
import { LogInIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Navbar = ({ locale }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartItems = useSelector(selectCartItems);
  const authToken = useAuthToken();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const t = useTranslations('');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success(t('Navbar.logout_success'));
        dispatch(logout());
        // Clear checkout state on logout
        dispatch(clearCheckoutOnLogin());
        router.push('/');
      }
    } catch (error) {
      toast.error(t('Navbar.logout_failed'));
      console.error('Logout failed:', error);
    }
  };

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
    'checkout',
    'wholesale-store',
    'account',
  ];

  const isSpecialPath = specialPaths.some(
    (path) => pathname === `/${locale}/${path}` || pathname.startsWith(`/${locale}/${path}/`),
  );

  useEffect(() => {
    // Only add scroll listener on client side
    if (typeof window !== 'undefined') {
      const handleScroll = () => setIsScrolled(window.scrollY > 10);

      // Set initial scroll state
      handleScroll();

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
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
          className={`container mx-auto flex items-center justify-between px-5 md:px-[40px] lg:px-[40px] xl:px-[80px] 2xl:px-[320px] ${isScrolled ? 'py-5' : 'py-12'} transition-all duration-300`}
        >
          {!isScrolled && (
            <div className="absolute top-0 left-1/2 -z-10 w-full -translate-x-1/2">
              <div
                className={`${
                  isSpecialPath
                    ? 'shadow-[0px_0px_100px_100px_rgba(255,255,255,0.9)]'
                    : 'shadow-[0px_0px_100px_100px_rgba(0,0,0,0.9)]'
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

          <div className="flex items-center gap-4">
            {authToken ? (
              <Link
                href="/account"
                className={`mx-[5px] flex items-center gap-2 font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out md:flex ${
                  isSpecialPath ? 'hover:text-umbra-40 text-[#191919]' : 'text-white-100 hover:text-white-40'
                }`}
              >
                <UserIcon size={24} />
              </Link>
            ) : (
              <Link
                href="/login"
                className={`mx-[5px] flex items-center gap-2 font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out md:flex ${
                  isSpecialPath ? 'hover:text-umbra-40 text-[#191919]' : 'text-white-100 hover:text-white-40'
                }`}
              >
                <LogInIcon size={24} />
                {/* <span className="hidden md:inline">{t('Navbar.Log_in')}</span> */}
              </Link>
            )}

            <button
              type="button"
              onClick={() => {
                setCartOpen(true);
              }}
              aria-label={`${t('Cart')} (${cartItems?.length || 0} items)`}
              className={`relative mx-[5px] cursor-pointer transition-colors duration-300 ease-in-out ${
                isSpecialPath ? 'hover:text-umbra-40 text-[#191919]' : 'text-white-100 hover:text-white-40'
              }`}
            >
              <ShoppingCartIcon size={24} />
              {cartItems?.length > 0 && (
                <span className="bg-alive absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[12px] font-medium text-white">
                  {cartItems.length}
                </span>
              )}
            </button>
            <MenuButton setMenuOpen={setMenuOpen} isSpecialPath={isSpecialPath} />
          </div>
        </div>
      </nav>

      {menuOpen && <TopNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} setCartOpen={setCartOpen} />}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
