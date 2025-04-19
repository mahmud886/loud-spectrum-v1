import React from 'react';
import TheLabHero from '@/components/containers/the-lab/TheLabHero';
import Image from 'next/image';

const TheLabLayout = ({ children }) => {
  return (
    <div>
      <TheLabHero />
      {children}
      <div className="mx-auto w-[1440px]">
        <Image
          src="/assets/images/the-lab-section-mask.svg"
          alt="section-mask"
          width={1440}
          height={195}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default TheLabLayout;
