'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Shimmer component for loading state
const UnderReviewShimmer = () => (
  <div className="container py-[80px]">
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-8">
        <Skeleton className="mx-auto mb-6 h-20 w-20 rounded-full" />
        <Skeleton className="mx-auto mb-4 h-8 w-80" />
        <Skeleton className="mx-auto mb-6 h-6 w-96" />
      </div>
      <div className="mb-8 rounded-lg bg-gray-50 p-6">
        <Skeleton className="mx-auto mb-4 h-6 w-48" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-blue-50 p-6">
        <Skeleton className="mx-auto mb-2 h-5 w-40" />
        <Skeleton className="mx-auto h-4 w-80" />
      </div>
    </div>
  </div>
);

const WholesaleUnderReviewPage = () => {
  const t = useTranslations('Wholesale');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in and is a wholesaler waiting for approval
    if (isAuthenticated && user) {
      if (user?.role === 'wholesaler' && user?.status === 'Waiting For Approve') {
        setUserData(user);
      }
    }
    setIsLoading(false);
  }, [isAuthenticated, user]);

  // Show shimmer while loading
  if (isLoading) {
    return <UnderReviewShimmer />;
  }

  // Redirect to registration if user is not authenticated or not a pending wholesaler
  if (!isAuthenticated || !user || user?.role !== 'wholesaler' || user?.status !== 'Waiting For Approve') {
    return (
      <div className="container py-[80px]">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-10 w-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-umbra-100 mb-4 font-sans text-[32px] leading-[120%] font-normal xl:text-[44px]">
              {t('wholesaleRegistrationForm.redirect.title')}
            </h2>
            <p className="text-umbra-100 mb-6 font-sans text-[18px] leading-[140%] font-normal">
              {t('wholesaleRegistrationForm.redirect.description')}
            </p>
            <a
              href="/wholesale-registration"
              className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800"
            >
              {t('wholesaleRegistrationForm.redirect.button')}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-[80px]" id="wholesale-under-review">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
            <svg className="h-10 w-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-umbra-100 mb-4 font-sans text-[32px] leading-[120%] font-normal xl:text-[44px]">
            {t('wholesaleRegistrationForm.waitingForApproval.title')}
          </h2>
          <p className="text-umbra-100 mb-6 font-sans text-[18px] leading-[140%] font-normal">
            {t('wholesaleRegistrationForm.waitingForApproval.description')}
          </p>
        </div>

        <div className="mb-8 rounded-lg bg-gray-50 p-6">
          <h3 className="text-umbra-100 mb-4 font-sans text-[20px] leading-[120%] font-medium">
            {t('wholesaleRegistrationForm.waitingForApproval.registrationDetails')}
          </h3>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('wholesaleRegistrationForm.fullName')}:</span>
              <span className="text-umbra-100 font-medium">{userData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('wholesaleRegistrationForm.email')}:</span>
              <span className="text-umbra-100 font-medium">{userData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('wholesaleRegistrationForm.phone')}:</span>
              <span className="text-umbra-100 font-medium">{userData.phone_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('wholesaleRegistrationForm.waitingForApproval.status')}:</span>
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                {t('wholesaleRegistrationForm.waitingForApproval.pendingApproval')}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-6">
          <h4 className="text-umbra-100 mb-2 font-sans text-[18px] leading-[120%] font-medium">
            {t('wholesaleRegistrationForm.waitingForApproval.nextSteps')}
          </h4>
          <p className="text-[14px] leading-[140%] text-gray-600">
            {t('wholesaleRegistrationForm.waitingForApproval.nextStepsDescription')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WholesaleUnderReviewPage;
