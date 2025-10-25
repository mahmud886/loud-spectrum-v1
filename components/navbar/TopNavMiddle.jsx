import HashLink from '@/components/ui/hash-link';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

const TopNavMiddle = () => {
  const t = useTranslations('Navbar.TopNav');
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Determine the wholesale link based on user status
  const getWholesaleLink = () => {
    if (!isAuthenticated || !user) {
      return '/wholesale-registration#wholesale-form';
    }

    if (user.role === 'wholesaler') {
      if (user.status === 'Active') {
        return '/wholesale-store';
      } else if (user.status === 'Inactive') {
        return '/wholesale-disapprove';
      } else if (user.status === 'Waiting For Approve') {
        return '/wholesale-under-review';
      }
    }
  };

  const wholesaleHref = getWholesaleLink();
  const isHashLink = wholesaleHref.includes('#');

  return (
    <div className="flex h-full flex-col justify-center gap-12">
      <div>
        {isHashLink ? (
          <HashLink
            href={wholesaleHref}
            className="main-button-black inline-flex items-center justify-center rounded-full px-6 py-2"
          >
            {t('Wholesale')}
          </HashLink>
        ) : (
          <Link
            href={wholesaleHref}
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
