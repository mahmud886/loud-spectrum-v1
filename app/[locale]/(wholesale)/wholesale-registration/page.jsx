'use client';

import WholesaleRegistrationFaq from '@/components/containers/wholesale/WholesaleRegistrationFAQ';
import WholesaleRegistrationForm from '@/components/containers/wholesale/WholesaleRegistrationForm';
import WholesaleRegistrationWorks from '@/components/containers/wholesale/WholesaleRegistrationWorks';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const WholesaleRegistrationPage = () => {
  const t = useTranslations('Wholesale');
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in and redirect based on their status
    if (isAuthenticated && user) {
      if (
        user?.role?.toLowerCase() === 'wholesaler' &&
        user?.status?.toLowerCase() !== 'active' &&
        user?.status?.toLowerCase() !== 'inactive'
      ) {
        router.push('/wholesale-under-review');
        return;
      }
    }
    setUserData(user);
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    // Function to handle scrolling to the form
    const scrollToElement = (elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleScroll = () => {
      if (window?.location?.hash === '#wholesale-form') {
        scrollToElement('wholesale-form');
      }
    };

    // Handle initial load - only scroll to form if hash is present
    if (window?.location?.hash === '#wholesale-form') {
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
