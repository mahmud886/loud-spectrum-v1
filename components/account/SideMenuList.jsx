'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { LayoutDashboard, ShoppingBag, LocateFixed, User, MapPin, LogOut } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/account', icon: LayoutDashboard },
  { name: 'Orders', href: '/account/orders', icon: ShoppingBag },
  { name: 'Order Track', href: '/account/order-track', icon: LocateFixed },
  { name: 'Personal Info', href: '/account/personal-info', icon: User },
  { name: 'Address Book', href: '/account/address-book', icon: MapPin },
  { name: 'Logout', href: '/logout', icon: LogOut },
];

const SideMenuList = () => {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const normalizedPath = '/' + segments.slice(2).join('/');

  return (
    <nav className="space-y-3">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
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
