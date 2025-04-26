'use client';

import React, { useState } from 'react';
import TerpeneSelection from '@/components/ui/TerpeneSelection';
import TerpenePieChart from '@/components/containers/terpene-chart/TerpenePieChart';

const TerpeneChartFilter = () => {
  const [selectedStrain, setSelectedStrain] = useState('Durban Poison');

  return (
    <div className="w-full">
      <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center md:gap-0">
        <h2 className="text-umbra-100 text-left font-sans text-[26px] leading-[120%] font-normal tracking-normal md:text-center md:text-left md:text-[32px]">
          {selectedStrain}
        </h2>
        <TerpeneSelection value={selectedStrain} onChange={setSelectedStrain} />
      </div>

      <TerpenePieChart />
    </div>
  );
};

export default TerpeneChartFilter;
