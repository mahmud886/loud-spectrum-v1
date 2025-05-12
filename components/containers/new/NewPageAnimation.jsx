import Image from 'next/image';

const NewPageAnimation = () => {
  return (
    <div className="mx-auto h-full w-full md:w-[1440px] lg:h-[781px] lg:w-full 2xl:h-[797px] 2xl:w-full">
      <Image
        src="/assets/images/newpge-animation.png"
        alt="Background"
        width={1440}
        height={797}
        className="h-[400px] w-full object-cover md:h-[781px] md:w-[1440px] lg:h-[781px] lg:w-full 2xl:h-[797px] 2xl:w-full"
        priority
      />
    </div>
  );
};
export default NewPageAnimation;
