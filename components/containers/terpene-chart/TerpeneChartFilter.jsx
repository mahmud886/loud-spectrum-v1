'use client';

import React, { useState } from 'react';
import TerpeneSelection from '@/components/ui/TerpeneSelection';
import TerpenePieChart from '@/components/containers/terpene-chart/TerpenePieChart';

const TerpeneChartFilter = () => {
  const [selectedStrain, setSelectedStrain] = useState('Durban Poison');

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
          {selectedStrain}
        </h2>
        <TerpeneSelection value={selectedStrain} onChange={setSelectedStrain} />
      </div>
      <TerpenePieChart />
    </>
  );
};

export default TerpeneChartFilter;
