import React from 'react';
import FluurPageHero from '@/components/containers/fluur/FluurPageHero';

const FluurPageLayout = ({ children }) => {
  return (
    <div>
      <FluurPageHero />
      {children}
    </div>
  );
};

export default FluurPageLayout;
