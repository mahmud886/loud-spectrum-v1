import React from 'react';
import WholesaleRegistrationHero from '@/components/headers/WholesaleRegistrationHero';

const WholesaleRegistrationLayout = ({ children }) => {
  return (
    <>
      <WholesaleRegistrationHero />
      {children}
    </>
  );
};

export default WholesaleRegistrationLayout;
