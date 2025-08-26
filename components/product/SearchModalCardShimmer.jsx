import Shimmer from '@/components/ui/shimmer';

const SearchModalCardShimmer = () => {
  return (
    <div className="cursor-pointer">
      <div className="relative flex h-[384px] w-full flex-col justify-around overflow-hidden border bg-[#F5F5F5] p-2.5 xl:h-[384px] xl:w-full">
        {/* Image Section */}
        <div className="mb-5 flex h-[280px] w-full items-center justify-center overflow-hidden xl:h-[280px]">
          <div className="z-[1] flex h-full w-full items-center justify-center">
            <Shimmer className="h-[280px] w-[200px] object-contain xl:h-[280px] xl:w-[280px]" />
          </div>
        </div>

        {/* Tag Button - positioned at top-left */}
        <div className="absolute top-2 left-3 z-10 w-full">
          <Shimmer className="h-4 w-16 rounded-[3px]" />
        </div>

        {/* Product Title and Price - positioned at bottom-left */}
        <div className="absolute bottom-3 left-3 z-10 flex w-full flex-col items-start bg-[#F5F5F5] text-left">
          <Shimmer className="mb-1 h-4 w-24 rounded xl:h-5" />
          <Shimmer className="h-3 w-16 rounded xl:h-3" />
        </div>
      </div>
    </div>
  );
};

export default SearchModalCardShimmer;
