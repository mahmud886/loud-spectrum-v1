'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function BlogSectionError({ error, reset }) {
  const t = useTranslations('BlogPage');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog section error:', error);
  }, [error]);

  return (
    <div className="container mx-auto mt-[200px] px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          {t('sectionError.title', { defaultValue: 'Blog Loading Error' })}
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          {t('sectionError.description', {
            defaultValue:
              'We encountered an error while loading the blog section. Please try again or contact support if the problem persists.',
          })}
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-left">
            <h3 className="mb-2 text-sm font-medium text-red-800">Error Details:</h3>
            <p className="font-mono text-sm break-words text-red-700">{error?.message || 'Unknown error occurred'}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('sectionError.tryAgain', { defaultValue: 'Try Again' })}
          </button>

          <Link
            href="/"
            className="focus:ring-primary inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('sectionError.backToHome', { defaultValue: 'Back to Home' })}
          </Link>
        </div>

        {/* Alternative Navigation */}
        <div className="mt-12 rounded-lg bg-gray-50 p-6">
          <h3 className="mb-3 text-lg font-medium text-gray-900">
            {t('sectionError.alternatives.title', { defaultValue: 'Explore Other Sections' })}
          </h3>
          <p className="mb-4 text-gray-600">
            {t('sectionError.alternatives.description', {
              defaultValue: 'While we fix this issue, you can explore other parts of our website.',
            })}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {t('sectionError.alternatives.shop', { defaultValue: 'Visit Shop' })}
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {t('sectionError.alternatives.about', { defaultValue: 'About Us' })}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {t('sectionError.alternatives.contact', { defaultValue: 'Contact Us' })}
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {t('sectionError.alternatives.faq', { defaultValue: 'FAQ' })}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
