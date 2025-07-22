import React from 'react';

const TermsAndConditionLayout = ({ children }) => {
  return (
    <div className="container mt-[200px]">
      <div className="mb-6 flex w-1/2 items-center justify-start">
        <h2 className="text-umbra-100 font-sans text-[60px] leading-[120%] font-normal">Privacy Policy</h2>
      </div>
      {children}
    </div>
  );
};

export default TermsAndConditionLayout;
