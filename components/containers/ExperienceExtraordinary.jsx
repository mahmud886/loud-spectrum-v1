import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ExperienceExtraordinary = () => {
  const t = useTranslations('Homepage');
  return (
    <>
      <div className="bg-umbra-100">
        <div className="container pb-20">
          <div className="pt-12 lg:px-[188px] lg:pt-[100px] xl:px-[188px] xl:pt-[100px]">
            <h2 className="bg-[linear-gradient(97.43deg,#101820_7.54%,#0077C8_45.72%,rgba(192,174,231,0.2)_83.43%,rgba(221,218,232,0)_100.19%)] bg-clip-text text-center text-[50px] leading-[100%] text-transparent lg:text-[130px] xl:text-[130px]">
              {t('Experience_Extraordinary')}
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-umbra-100">
        <div className="container w-full">
          <div className="relative hidden items-center justify-center lg:flex xl:flex">
            {/* Background image */}
            <Image
              src="/assets/svgs/pattern-extra.svg"
              width={1440}
              height={1235}
              className="h-[1100px] w-[1440px] object-cover"
              alt="extra-ordinary-pattern"
            />
            {/* Centered foreground image */}
            <Image
              unoptimized={true}
              src="/assets/videos/extraordinary.gif"
              width={373}
              height={573}
              className="absolute top-1/2 left-1/2 h-[573px] w-[373px] -translate-x-1/2 -translate-y-1/2 object-cover"
              alt="extra-ordinary"
            />
            {/* Top Left Text */}
            <div className="absolute top-[40%] left-[10%] flex max-w-[300px] flex-col gap-6">
              <div className="flex flex-col space-y-2.5 xl:space-y-4">
                <h5 className="text-white-100 font-sans text-[22px] leading-[130%] font-normal xl:text-[28px]">
                  The Flavor Spectrum
                </h5>
                <p className="text-white-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  Bold profiles for every mood, moment, and memory.
                </p>
                <div className="border-white-20 mt-3 border-1 xl:hidden"></div>
              </div>
            </div>
            <div className="absolute bottom-[30%] left-[20%] flex max-w-[300px] flex-col gap-6">
              <div className="flex flex-col space-y-2.5 xl:space-y-4">
                <h5 className="text-white-100 font-sans text-[22px] leading-[130%] font-normal xl:text-[28px]">
                  Quality Above All
                </h5>
                <p className="text-white-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  Unmatched flavor and consistency, crafted to the highest standards.
                </p>
                <div className="border-white-20 mt-3 border-1 xl:hidden"></div>
              </div>
            </div>

            {/* Top Right Text */}
            <div className="absolute top-[23%] right-[20%] flex max-w-[300px] flex-col gap-6">
              <div className="flex flex-col space-y-2.5 xl:space-y-4">
                <h5 className="text-white-100 font-sans text-[22px] leading-[130%] font-normal xl:text-[28px]">
                  Essential Ingredient
                </h5>
                <p className="text-white-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  The cornerstone of every unforgettable cannabis experience.
                </p>
                <div className="border-white-20 mt-3 border-1 xl:hidden"></div>
              </div>
            </div>
            <div className="absolute top-[40%] right-[10%] flex max-w-[300px] flex-col gap-6">
              <div className="flex flex-col space-y-2.5 xl:space-y-4">
                <h5 className="text-white-100 font-sans text-[22px] leading-[130%] font-normal xl:text-[28px]">
                  Masters of Craft
                </h5>
                <p className="text-white-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                  Science meets expertise to redefine terpene craftsmanship.
                </p>
                <div className="border-white-20 mt-3 border-1 xl:hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-umbra-100 px-[20px]">
        <div className="flex justify-center lg:hidden xl:hidden">
          <Image
            src="/assets/videos/extraordinary.gif"
            width={373}
            height={573}
            className="h-[573px] w-[373px] object-cover"
            alt="extra-ordinary"
          />
        </div>
        <div className="pb-20 lg:hidden xl:hidden">
          <div className="flex flex-col gap-6">
            {extraordinary.map((item, index) => (
              <div key={index} className="flex flex-col space-y-2.5 lg:space-y-4 xl:space-y-4">
                <h5 className="text-white-100 font-sans text-[18px] leading-[130%] font-normal lg:text-[28px] xl:text-[22px] xl:text-[28px]">
                  {item.title}
                </h5>
                <p className="text-white-40 font-mono text-[14px] leading-[140%] font-normal tracking-normal xl:text-[16px]">
                  {item.description}
                </p>
                <div className="border-white-20 mt-3 border-1 xl:hidden"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-umbra-100 relative mx-auto w-full">
        {/* <Image
          src="/assets/svgs/mimosa-bottom-mask.svg"
          width={1440}
          height={195}
          className="h-[50px] w-[450px] object-cover xl:h-[195px] xl:w-[1440px]"
          alt="extra-ordinary"
        /> */}
        <div className="absolute bottom-0 left-0 w-screen">
          <div className="w-full">
            <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
              <div className="w-[70%] bg-transparent"></div>
              <div className="w-[30%] bg-white"></div>
            </div>
            <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
              <div className="w-[10%] bg-white"></div>
              <div className="w-[35%] bg-transparent"></div>
              <div className="w-[55%] bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceExtraordinary;

const extraordinary = [
  {
    title: 'Masters of Craft',
    description: 'Science meets expertise to redefine terpene craftsmanship.',
  },
  {
    title: 'Quality Above All',
    description: 'Unmatched flavor and consistency, crafted to the highest standards.',
  },
  {
    title: 'The Flavor Spectrum',
    description: 'Bold profiles for every mood, moment, and memory.',
  },
  {
    title: 'Essential Ingredient',
    description: 'The cornerstone of every unforgettable cannabis experience.',
  },
];
