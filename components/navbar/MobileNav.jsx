'use client';

import CloseButton from '@/components/navbar/CloseButton';
import SearchModal from '@/components/SearchModal';
import HashLink from '@/components/ui/hash-link';
import { Link } from '@/i18n/navigation';
import { logout } from '@/lib/store/slices/authSlice';
import { selectCartItems } from '@/lib/store/slices/cartSlice';
import { clearCheckoutOnLogin } from '@/lib/store/slices/checkoutSlice';
import { LogInIcon, Search, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const MobileNav = ({ onClose, setCartOpen }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector((state) => state.auth.user);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const t = useTranslations('Navbar');
  const topNav = useTranslations('Navbar.TopNav');
  const [searchOpen, setSearchOpen] = useState(false);

  // Handle logout functionality
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

  // Determine the wholesale link based on user status
  const getWholesaleLink = () => {
    if (!isAuthenticated || !user) {
      // Not logged in - go to wholesale registration form
      return '/wholesale-registration#wholesale-form';
    }

    if (user.role === 'wholesaler') {
      if (user.status === 'Active') {
        // Active wholesaler - go to wholesale store
        return '/wholesale-store';
      } else {
        // Inactive wholesaler - go to under review section
        return '/wholesale-registration#wholesale-under-review';
      }
    } else {
      // Customer - go to wholesale registration form
      return '/wholesale-registration#wholesale-form';
    }
  };

  const wholesaleHref = getWholesaleLink();
  const isHashLink = wholesaleHref.includes('#');

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
          <div className="flex items-center gap-4">
            {user ? (
              <Link
                href="/account"
                className={`hover:text-umbra-40 text-[#191919]' } mx-[5px] flex items-center gap-2 font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out md:flex`}
              >
                <UserIcon size={24} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-umbra-100 hover:text-umbra-40 relative mx-[5px] cursor-pointer transition-colors duration-300 ease-in-out"
              >
                <LogInIcon size={24} />
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                setCartOpen(true);
              }}
              aria-label={`${t('Cart')} (${cartItems?.length || 0} items)`}
              className="text-umbra-100 hover:text-umbra-40 relative mx-[5px] cursor-pointer transition-colors duration-300 ease-in-out"
            >
              <ShoppingCartIcon size={24} />
              {cartItems?.length > 0 && (
                <span className="bg-alive absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[12px] font-medium text-white">
                  {cartItems.length}
                </span>
              )}
            </button>
            <CloseButton onClose={onClose} />
          </div>
        </div>
        <div className="group relative mt-4 w-full">
          <button
            type="button"
            className="border-umbra-20 group-hover:text-umbra-100 text-umbra-100 placeholder-text-umbra-20 w-full border-b bg-transparent py-5 pr-10 text-left text-sm transition duration-300 focus:outline-none"
            onClick={() => setSearchOpen(true)}
          >
            Search products
          </button>
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
            {topNav('Terpene_Guide')}
          </Link>
          <Link href="/terpene-chart" className={'navLinkClass'}>
            {topNav('Terpene_Chart')}
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {isHashLink ? (
          <HashLink
            href={wholesaleHref}
            className="main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-4"
          >
            Wholesale
          </HashLink>
        ) : (
          <Link
            href={wholesaleHref}
            className="main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-4"
          >
            Wholesale
          </Link>
        )}
        {isAuthenticated && user ? (
          <button
            onClick={handleLogout}
            className="outline-button-white inline-flex w-full items-center justify-center rounded-full border px-6 py-4"
          >
            Logout
          </button>
        ) : (
          <Link
            href={`/login`}
            className="outline-button-white inline-flex w-full items-center justify-center rounded-full border px-6 py-4"
          >
            Login
          </Link>
        )}
      </div>
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
};

export default MobileNav;
