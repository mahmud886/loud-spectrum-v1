import Shimmer from '@/components/ui/shimmer';

const ShopHeroShimmer = () => {
  return (
    <div className="relative h-[510px] overflow-hidden bg-black md:h-[797px]">
      <Shimmer className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 object-cover md:w-[1920px]" />

      <div className="absolute inset-0 z-10 container h-[610px] w-full overflow-hidden">
        <div className="relative z-10 flex h-[610px] w-full flex-col items-center justify-center gap-[40px] md:h-full md:w-[42%]">
          <div>
            <Shimmer className="mb-5 h-12 w-64 rounded md:h-16 md:w-96" />
            <Shimmer className="h-6 w-80 rounded md:h-8 md:w-96" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 z-20 w-full -translate-x-1/2 md:w-[1440px]">
        <Shimmer className="h-[50px] w-full object-cover md:h-[195px] md:w-[1440px]" />
      </div>
    </div>
  );
};

export default ShopHeroShimmer;
