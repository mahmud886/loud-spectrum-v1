import React from 'react';
import TheLabHero from '@/components/containers/the-lab/TheLabHero';

const TheLabLayout = ({ children }) => {
  return (
    <div>
      <TheLabHero />
      {children}
    </div>
  );
};

export default TheLabLayout;
