'use client';

import { Link } from '@/i18n/navigation';
import { logout } from '@/lib/store/slices/authSlice';
import { clearCheckoutOnLogin } from '@/lib/store/slices/checkoutSlice';
import clsx from 'clsx';
import { LayoutDashboard, LocateFixed, LogOut, MapPin, ShoppingBag, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const SideMenuList = () => {
  const t = useTranslations('');
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const segments = pathname.split('/');
  const normalizedPath = '/' + segments.slice(2).join('/');

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

  const menuItems = [
    { name: t('AccountPage.menuItems.profile'), href: '/account', icon: LayoutDashboard },
    { name: t('AccountPage.menuItems.orders'), href: '/account/orders', icon: ShoppingBag },
    { name: t('AccountPage.menuItems.orderTrack'), href: '/account/order-track', icon: LocateFixed },
    { name: t('AccountPage.menuItems.personalInfo'), href: '/account/personal-info', icon: User },
    { name: t('AccountPage.menuItems.addresses'), href: '/account/address-book', icon: MapPin },
    { name: t('AccountPage.menuItems.logout'), href: '#', icon: LogOut, onClick: handleLogout },
  ];

  return (
    <nav className="space-y-3 p-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={item.onClick}
            className={clsx(
              'flex items-center gap-3 rounded-[10px] px-4 py-2 text-sm font-medium transition',
              normalizedPath === item.href ? 'bg-stardust text-umbra-100' : 'text-umbra-100 hover:bg-umbra-10',
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default SideMenuList;
