import React from 'react';
import NewPageHero from '@/components/headers/NewPageHero';

const NewTerpeneLayout = ({ children }) => {
  return (
    <div>
      <NewPageHero />
      {children}
    </div>
  );
};

export default NewTerpeneLayout;
