import Shimmer from '@/components/ui/shimmer';

const ShopQualityPromiseShimmer = () => {
  return (
    <div className="bg-white-100 relative h-[797px] overflow-hidden">
      <div className="absolute top-[-2px] left-1/2 z-20 w-full -translate-x-1/2 md:w-[1280px]">
        <Shimmer className="h-[25px] w-full object-cover md:h-[84px] md:w-[1280px]" />
      </div>

      <Shimmer className="absolute top-0 left-1/2 z-0 h-[775px] w-full -translate-x-1/2 object-cover md:h-[795px] md:w-[1280px]" />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex w-[90%] flex-col items-center justify-center gap-[50px] text-center md:max-w-[600px]">
          <div>
            <Shimmer className="mb-5 h-12 w-64 rounded md:h-16 md:w-96" />
            <Shimmer className="h-6 w-80 rounded md:h-8 md:w-96" />
          </div>
          <div>
            <Shimmer className="h-12 w-32 rounded-full" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[2%] left-1/2 z-20 w-full -translate-x-1/2 md:bottom-[-2px] md:w-[1280px]">
        <Shimmer className="h-[25px] w-full object-cover md:h-[84px] md:w-[1280px]" />
      </div>
    </div>
  );
};

export default ShopQualityPromiseShimmer;
