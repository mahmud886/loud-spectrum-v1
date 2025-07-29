'use client';

const HeroShimmer = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Section Shimmer */}
      <div className="bg-black">
        <div className="relative container h-[900px] overflow-hidden">
          {/* Background video shimmer */}
          <div className="absolute top-0 left-1/2 z-0 h-[900px] w-[450px] -translate-x-1/2 transform overflow-hidden md:hidden">
            <div className="h-full w-full bg-gray-800"></div>
          </div>

          <div className="absolute top-0 left-1/2 z-0 hidden h-[900px] w-[1440px] -translate-x-1/2 transform overflow-hidden md:block">
            <div className="h-full w-full bg-gray-800"></div>
          </div>

          {/* Content shimmer */}
          <div className="relative z-30 flex h-[900px] flex-col justify-end gap-6 md:w-3/6 md:items-center md:justify-center md:gap-[40px] lg:w-3/6">
            <div className="space-y-6 md:space-y-0">
              {/* Title shimmer */}
              <div className="space-y-4">
                <div className="h-12 w-80 rounded bg-gray-700 md:h-16 md:w-96 lg:h-16 lg:w-96"></div>
                <div className="h-12 w-72 rounded bg-gray-700 md:h-16 md:w-80 lg:h-16 lg:w-80"></div>
              </div>

              {/* Description shimmer */}
              <div className="pb-6 md:pb-0">
                <div className="h-6 w-full rounded bg-gray-700 md:h-8"></div>
                <div className="mt-2 h-6 w-3/4 rounded bg-gray-700 md:h-8"></div>
                <div className="mt-2 h-6 w-1/2 rounded bg-gray-700 md:h-8"></div>
              </div>
            </div>

            {/* Buttons shimmer */}
            <div className="mb-12 flex w-full flex-col gap-[15px] md:mb-0 md:flex-row md:self-start lg:mb-0 lg:self-start">
              <div className="h-12 w-32 rounded-full bg-gray-700 md:h-10 lg:h-10"></div>
              <div className="h-12 w-36 rounded-full bg-gray-700 md:h-10 lg:h-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom mask shimmer */}
      <div className="mx-auto w-[375px] md:flex md:w-[1440px] lg:flex lg:w-[1440px]">
        <div className="h-[50px] w-[375px] bg-black md:h-[195px] md:w-[1440px] lg:h-[195px] lg:w-[1440px]">
          <div className="h-full w-full bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroShimmer;
