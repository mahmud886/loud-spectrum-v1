import React from 'react';
import Image from 'next/image';

const NewPageAnimation = () => {
  return (
    <div className="mx-auto w-[375px] md:w-[1440px]">
      <Image
        src="/assets/images/newpge-animation.png"
        alt="Background"
        width={1440}
        height={797}
        className="z-0 h-full w-[375px] object-cover md:w-[1440px]"
        priority
      />
    </div>
  );
};
export default NewPageAnimation;
