'use client';

import WholesaleRegistrationFaq from '@/components/containers/wholesale/WholesaleRegistrationFAQ';
import WholesaleRegistrationForm from '@/components/containers/wholesale/WholesaleRegistrationForm';
import WholesaleRegistrationWorks from '@/components/containers/wholesale/WholesaleRegistrationWorks';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const WholesaleRegistrationPage = () => {
  const t = useTranslations('Wholesale');
  const [isWaitingForApproval, setIsWaitingForApproval] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in and is a wholesaler waiting for approval
    if (isAuthenticated && user) {
      if (user.role === 'wholesaler' && user.status !== 'Active') {
        setIsWaitingForApproval(true);
        setUserData(user);
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Function to handle scrolling
    const scrollToElement = (elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleScroll = () => {
      if (window?.location?.hash === '#wholesale-form') {
        scrollToElement('wholesale-form');
      } else if (window?.location?.hash === '#wholesale-under-review') {
        scrollToElement('wholesale-under-review');
      }
    };

    // Handle initial load
    if (window?.location?.hash === '#wholesale-form' || window?.location?.hash === '#wholesale-under-review') {
      setTimeout(handleScroll, 100);
    }

    const handleHashChange = () => {
      handleScroll();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Show waiting for approval message if user is inactive wholesaler
  if (isWaitingForApproval && userData) {
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
            <h2 className="text-umbra-100 mb-4 font-sans text-[32px] leading-[120%] font-normal md:text-[44px]">
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
                  {userData.status === 'Waiting For Approve'
                    ? t('wholesaleRegistrationForm.waitingForApproval.pendingApproval')
                    : t('wholesaleRegistrationForm.waitingForApproval.inactive')}
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
  }

  // Show normal registration form for new users
  return (
    <div className="">
      <WholesaleRegistrationForm id="wholesale-form" />
      <WholesaleRegistrationWorks />
      <WholesaleRegistrationFaq />
    </div>
  );
};

export default WholesaleRegistrationPage;
