import React from 'react';
import TransitionAnimation from '@/components/containers/TransitionAnimation';
import BehindTheProccess from '@/components/containers/the-lab/BehindTheProccess';
import Image from 'next/image';

const LabPage = () => {
  return (
    <div>
      <TransitionAnimation />
      <BehindTheProccess />
    </div>
  );
};

export default LabPage;
