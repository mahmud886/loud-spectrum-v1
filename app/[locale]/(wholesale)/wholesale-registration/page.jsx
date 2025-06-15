'use client';

import WholesaleRegistrationFaq from '@/components/containers/wholesale/WholesaleRegistrationFAQ';
import WholesaleRegistrationForm from '@/components/containers/wholesale/WholesaleRegistrationForm';
import WholesaleRegistrationWorks from '@/components/containers/wholesale/WholesaleRegistrationWorks';
import { useEffect } from 'react';

const WholesaleRegistrationPage = () => {
  useEffect(() => {
    // Function to handle scrolling
    const scrollToForm = () => {
      const formElement = document.getElementById('wholesale-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    };
    if (window?.location?.hash === '#wholesale-form') {
      setTimeout(scrollToForm, 100);
    }
    const handleHashChange = () => {
      if (window?.location?.hash === '#wholesale-form') {
        scrollToForm();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="">
      <WholesaleRegistrationForm id="wholesale-form" />
      <WholesaleRegistrationWorks />
      <WholesaleRegistrationFaq />
    </div>
  );
};

export default WholesaleRegistrationPage;
