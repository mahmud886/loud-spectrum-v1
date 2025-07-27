'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const NotFoundPage = () => {
  const t = useTranslations('MainPage');

  return (
    <div className="container my-[100px]">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
          <h2 className="mb-4 text-3xl font-semibold text-gray-800">{t('notFound.title')}</h2>
          <p className="mb-8 max-w-md text-lg text-gray-600">{t('notFound.description')}</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="main-button-black inline-flex items-center rounded-full px-6 py-3 text-base font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('notFound.backToHome')}
          </Link>
          <Link
            href="/contact"
            className="outline-button-white inline-flex items-center rounded-full px-6 py-3 text-base font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('notFound.contactUs')}
          </Link>
        </div>

        <div className="max-w-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">{t('notFound.explore.title')}</h3>
          <p className="mb-6 text-gray-600">{t('notFound.explore.description')}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/about"
              className="group hover:border-primary hover:bg-primary/5 rounded-lg border border-gray-200 p-4 text-center transition-colors"
            >
              <h4 className="group-hover:text-primary mb-2 font-semibold text-gray-800">
                {t('notFound.explore.about')}
              </h4>
              <p className="text-sm text-gray-600">{t('notFound.explore.aboutDescription')}</p>
            </Link>
            <Link
              href="/shop"
              className="group hover:border-primary hover:bg-primary/5 rounded-lg border border-gray-200 p-4 text-center transition-colors"
            >
              <h4 className="group-hover:text-primary mb-2 font-semibold text-gray-800">
                {t('notFound.explore.shop')}
              </h4>
              <p className="text-sm text-gray-600">{t('notFound.explore.shopDescription')}</p>
            </Link>
            <Link
              href="/contact"
              className="group hover:border-primary hover:bg-primary/5 rounded-lg border border-gray-200 p-4 text-center transition-colors"
            >
              <h4 className="group-hover:text-primary mb-2 font-semibold text-gray-800">
                {t('notFound.explore.contact')}
              </h4>
              <p className="text-sm text-gray-600">{t('notFound.explore.contactDescription')}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
