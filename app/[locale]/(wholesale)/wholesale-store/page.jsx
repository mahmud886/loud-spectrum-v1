import React from 'react';
import WholesaleProductCard from '@/components/wholesale/WholesaleProductCard';

const WholesaleStorePage = () => {
  return (
    <div className="py-20">
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <WholesaleProductCard />
        <WholesaleProductCard />
        <WholesaleProductCard />
      </div>
    </div>
  );
};

export default WholesaleStorePage;
