import React from 'react';
import Image from 'next/image';

const NewPageAnimation = () => {
  return (
    <div className="mx-auto w-[1440px]">
      <Image
        src="/assets/images/newpge-animation.png"
        alt="Background"
        width={1440}
        height={797}
        className="z-0 h-full w-[1440px] object-cover"
        priority
      />
    </div>
  );
};
export default NewPageAnimation;
