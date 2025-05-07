import Image from 'next/image';

const TransitionAnimation = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/assets/images/transition-animation.png"
        width={1440}
        height={781}
        className="h-[400px] w-[375px] object-cover md:h-[781px] md:w-[1440px] lg:h-[781px] lg:w-full 2xl:w-full"
        alt="transition-animation"
      />
    </div>
  );
};

export default TransitionAnimation;
