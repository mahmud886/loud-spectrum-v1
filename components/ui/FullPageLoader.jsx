'use client';

import { useTranslations } from 'next-intl';
import { RippleLoader } from './RippleLoader';

const FullPageLoader = ({
  isVisible = false,
  title = 'Processing Payment...',
  description = 'Please wait while we process your payment. Do not close this window.',
  showLogo = true,
}) => {
  const t = useTranslations('UI.FullPageLoader');

  if (!isVisible) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-[9999] flex items-center justify-center bg-black backdrop-blur-sm">
      {/* Loading Container */}
      <div className="mx-4 max-w-md rounded-lg bg-white p-8 text-center shadow-2xl">
        {/* Logo */}
        {showLogo && (
          <div className="mb-6">
            <img src="/footer-logo.svg" alt={t('logoAlt')} className="mx-auto h-12 w-auto" />
          </div>
        )}

        {/* Ripple Loader */}
        <div className="mb-6">
          <RippleLoader />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-xl font-semibold text-gray-900">{title}</h2>

        {/* Description */}
        <p className="text-sm text-gray-600">{description}</p>

        {/* Security Note */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 1C5.477 1 1.833 4.654 1.833 9.188c0 1.355.328 2.635.906 3.765l-.906 2.382c-.054.143-.007.304.121.411a.453.453 0 00.463.054l2.382-.906A8.142 8.142 0 0010 17.375c4.523 0 8.167-3.654 8.167-8.187S14.523 1 10 1zm0 1.375c3.727 0 6.792 3.076 6.792 6.813S13.727 15.999 10 15.999c-1.324 0-2.559-.377-3.608-1.028l-.106-.066-1.916.729.729-1.916-.066-.106A6.747 6.747 0 013.208 9.188C3.208 5.451 6.273 2.375 10 2.375z"
              clipRule="evenodd"
            />
            <path d="M10 6.125a.688.688 0 00-.688.688v2.75a.688.688 0 001.375 0v-2.75A.688.688 0 0010 6.125zm0 5.5a.688.688 0 100 1.375.688.688 0 000-1.375z" />
          </svg>
          <span>{t('securityNote')}</span>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
