import React from 'react';
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';

const WholesaleStoreLayout = ({ children }) => {
  return (
    <div className="container">
      <div className="mt-[150px] md:mt-[170px]">
        <div className="mb-6 flex w-full flex-col items-center justify-between md:flex-row">
          <h2 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal md:text-[60px]">
            Wholesale Store
          </h2>
          <DynamicBreadcrumb />
        </div>
      </div>
      {children}
    </div>
  );
};

export default WholesaleStoreLayout;
