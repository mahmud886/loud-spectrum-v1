import Image from 'next/image';

const NewPageAnimation = () => {
  return (
    <div className="mx-auto h-full w-full lg:h-[781px] lg:w-full xl:w-[1440px] 2xl:h-[797px] 2xl:w-full">
      <Image
        src="/assets/images/newpge-animation.png"
        alt="Background"
        width={1440}
        height={797}
        className="h-[400px] w-full object-cover lg:h-[781px] lg:w-full xl:h-[781px] xl:w-[1440px] 2xl:h-[797px] 2xl:w-full"
        priority
      />
    </div>
  );
};
export default NewPageAnimation;
