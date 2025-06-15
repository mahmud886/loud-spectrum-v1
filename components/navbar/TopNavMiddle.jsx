import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const TopNavMiddle = () => {
  const t = useTranslations('Navbar.TopNav');

  return (
    <div className="flex h-full flex-col justify-center gap-12">
      <div>
        <Link
          href={`/wholesale-store`}
          className="main-button-black inline-flex items-center justify-center rounded-full px-6 py-2"
        >
          {t('Wholesale')}
        </Link>
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
