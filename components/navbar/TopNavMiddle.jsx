'use client';
import HashLink from '@/components/ui/hash-link';
import { useUserStatus } from '@/hooks/useUserStatus';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const TopNavMiddle = () => {
  const t = useTranslations('Navbar.TopNav');
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { userStatus, error: userStatusError } = useUserStatus();

  const wholesaleHref = useMemo(() => {
    if (!isAuthenticated || !user || user.role === 'customer') {
      return '/wholesale-registration#wholesale-form';
    }

    if (user.role === 'wholesaler') {
      // Use userStatus from API if available, otherwise fall back to Redux user state
      const status = userStatus?.status || user?.status;
      if (status === 'Active') {
        return '/wholesale-store';
      }
      if (status === 'Inactive') {
        return '/wholesale-disapprove';
      }
      if (status === 'Waiting For Approve') {
        return '/wholesale-under-review';
      }
      return '/wholesale-registration#wholesale-form';
    }
    // Fallback (if user.role is unexpected)
    return '/wholesale-registration#wholesale-form';
  }, [user, isAuthenticated, userStatus, userStatusError]);
  const isHashLink = typeof wholesaleHref === 'string' && wholesaleHref?.includes('#');

  return (
    <div className="flex h-full flex-col justify-center gap-12">
      <div>
        {isHashLink ? (
          <HashLink
            href={wholesaleHref || ''}
            className="main-button-black inline-flex items-center justify-center rounded-full px-6 py-2"
          >
            {t('Wholesale')}
          </HashLink>
        ) : (
          <Link
            href={wholesaleHref || ''}
            className="main-button-black inline-flex items-center justify-center rounded-full px-6 py-2"
          >
            {t('Wholesale')}
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/about" className={'navLinkClass'}>
          {t('About')}
        </Link>
        <Link href="/lab" className={'navLinkClass'}>
          {t('The_lab')}
        </Link>
        <Link href="/shop" className={'navLinkClass'}>
          {t('Shop')}
        </Link>
        <Link href="/new" className={'navLinkClass'}>
          {t('New')}
        </Link>
        <Link href="/fluur" className={'navLinkClass'}>
          {t('FLUUR')}
        </Link>
        <Link href="/terpene-guide" className={'navLinkClass'}>
          {t('Terpene_Guide')}
        </Link>
        <Link href="/terpene-chart" className={'navLinkClass'}>
          {t('Terpene_Chart')}
        </Link>
      </div>
    </div>
  );
};

export default TopNavMiddle;
