import React from 'react';
import TerpeneChartHero from '@/components/headers/TerpeneChartHero';

const TerpeneChartLayout = ({ children }) => {
  return (
    <div>
      <TerpeneChartHero />
      {children}
    </div>
  );
};

export default TerpeneChartLayout;
