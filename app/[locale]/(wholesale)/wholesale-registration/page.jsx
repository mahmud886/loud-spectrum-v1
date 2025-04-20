import React from 'react';
import WholesaleRegistrationForm from '@/components/containers/wholesale/WholesaleRegistrationForm';
import WholesaleRegistrationWorks from '@/components/containers/wholesale/WholesaleRegistrationWorks';
import WholesaleRegistrationFaq from '@/components/containers/wholesale/WholesaleRegistrationFAQ';

const WholesaleRegistrationPage = () => {
  return (
    <div className="">
      <WholesaleRegistrationForm />
      <WholesaleRegistrationWorks />
      <WholesaleRegistrationFaq />
    </div>
  );
};

export default WholesaleRegistrationPage;
