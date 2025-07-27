'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

const ErrorPage = ({ error, reset }) => {
  const t = useTranslations('MainPage');

  useEffect(() => {
    // Log the error to an error reporting service
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error:', error);
    }
  }, [error]);

  return (
    <div className="container my-[100px]">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-6xl font-bold text-red-600">500</h1>
          <h2 className="mb-4 text-3xl font-semibold text-gray-800">{t('error.title')}</h2>
          <p className="mb-8 max-w-md text-lg text-gray-600">{t('error.description')}</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="main-button-black inline-flex items-center rounded-full px-6 py-3 text-base font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('error.tryAgain')}
          </button>
          <Link
            href="/"
            className="outline-button-white inline-flex items-center rounded-full px-6 py-3 text-base font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('error.backToHome')}
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-left">
            <h3 className="mb-2 font-semibold text-red-800">{t('error.development.title')}</h3>
            <p className="mb-4 text-sm text-red-700">{t('error.development.description')}</p>
            <details className="text-sm">
              <summary className="cursor-pointer font-medium text-red-800">
                {t('error.development.showDetails')}
              </summary>
              <pre className="mt-2 rounded bg-red-100 p-2 text-xs whitespace-pre-wrap text-red-800">
                {error?.message || 'Unknown error'}
              </pre>
            </details>
          </div>
        )}

        <div className="max-w-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">{t('error.alternatives.title')}</h3>
          <p className="mb-6 text-gray-600">{t('error.alternatives.description')}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/shop"
              className="group hover:border-primary hover:bg-primary/5 rounded-lg border border-gray-200 p-4 text-center transition-colors"
            >
              <h4 className="group-hover:text-primary mb-2 font-semibold text-gray-800">
                {t('error.alternatives.shop')}
              </h4>
              <p className="text-sm text-gray-600">{t('error.alternatives.shopDescription')}</p>
            </Link>
            <Link
              href="/about"
              className="group hover:border-primary hover:bg-primary/5 rounded-lg border border-gray-200 p-4 text-center transition-colors"
            >
              <h4 className="group-hover:text-primary mb-2 font-semibold text-gray-800">
                {t('error.alternatives.about')}
              </h4>
              <p className="text-sm text-gray-600">{t('error.alternatives.aboutDescription')}</p>
            </Link>
            <Link
              href="/contact"
              className="group hover:border-primary hover:bg-primary/5 rounded-lg border border-gray-200 p-4 text-center transition-colors"
            >
              <h4 className="group-hover:text-primary mb-2 font-semibold text-gray-800">
                {t('error.alternatives.contact')}
              </h4>
              <p className="text-sm text-gray-600">{t('error.alternatives.contactDescription')}</p>
            </Link>
            <Link
              href="/faq"
              className="group hover:border-primary hover:bg-primary/5 rounded-lg border border-gray-200 p-4 text-center transition-colors"
            >
              <h4 className="group-hover:text-primary mb-2 font-semibold text-gray-800">
                {t('error.alternatives.faq')}
              </h4>
              <p className="text-sm text-gray-600">{t('error.alternatives.faqDescription')}</p>
            </Link>
          </div>
        </div>

        <div className="mt-8 max-w-md rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-800">{t('error.contactSupport.title')}</h3>
          <p className="mb-4 text-sm text-blue-700">{t('error.contactSupport.description')}</p>
          <Link
            href="/contact"
            className="main-button-black inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('error.contactSupport.contactUs')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
