import React from 'react';
import Image from 'next/image';

const TransitionAnimation = () => {
  return (
    <div className="container">
      <Image
        src="/assets/images/transition-animation.png"
        width={1440}
        height={781}
        className="h-[781px] w-[1440px] object-cover"
        alt="transition-animation"
      />
    </div>
  );
};

export default TransitionAnimation;
