'use client';

import TerpenePieChart from '@/components/containers/terpene-chart/TerpenePieChart';
import TerpeneSelection from '@/components/ui/TerpeneSelection';
import terpeneOptions from '@/lib/terpene-chart-data.json';
import { useState } from 'react';

const TerpeneChartFilter = () => {
  const [selectedStrain, setSelectedStrain] = useState('durban-poison');

  const selectedStrainData = terpeneOptions.find((item) => item.id === selectedStrain);

  return (
    <div className="w-full">
      <div className="flex flex-col-reverse justify-between gap-4 xl:flex-row xl:items-center xl:gap-0">
        <h2 className="text-umbra-100 text-left font-sans text-[26px] leading-[120%] font-normal tracking-normal xl:text-left xl:text-[32px]">
          {selectedStrainData?.name || ''}
        </h2>
        <TerpeneSelection value={selectedStrain} onChange={setSelectedStrain} />
      </div>

      <TerpenePieChart terpeneData={selectedStrainData?.terpenes} />
    </div>
  );
};

export default TerpeneChartFilter;
