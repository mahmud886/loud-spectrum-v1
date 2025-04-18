import React from 'react';
import TerpeneSelection from '@/components/ui/TerpeneSelection';

const TerpeneChart = () => {
  return (
    <div className="container">
      <div className="space-y-6 pb-[100px]">
        <hr />
        <div className="flex items-center justify-between">
          <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal tracking-normal">
            Durban Poison
          </h2>
          <TerpeneSelection />
        </div>
      </div>
    </div>
  );
};

export default TerpeneChart;
