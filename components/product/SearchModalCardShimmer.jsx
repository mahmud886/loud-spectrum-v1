import Shimmer from '@/components/ui/shimmer';

const SearchModalCardShimmer = () => {
  return (
    <div className="cursor-pointer">
      <div className="relative flex h-[220px] min-h-[220px] w-full min-w-[162px] flex-col justify-around border bg-[#F5F5F5] p-2.5 md:h-[300px] md:min-h-[300px] md:w-full md:min-w-full">
        {/* Image Section */}
        <div className="flex items-center justify-center overflow-hidden">
          <Shimmer className="h-[150px] w-auto object-cover md:h-[220px] md:w-[150px]" />
        </div>

        {/* Tag Button - positioned at top-left */}
        <div className="absolute top-2 left-2 z-10">
          <Shimmer className="h-4 w-16 rounded-[3px]" />
        </div>

        {/* Product Title and Price - positioned at bottom-left */}
        <div className="absolute bottom-3 left-2 flex flex-col items-start text-left">
          <Shimmer className="mb-1 h-3 w-20 rounded md:h-3" />
          <Shimmer className="h-2 w-12 rounded md:h-2" />
        </div>
      </div>
    </div>
  );
};

export default SearchModalCardShimmer;
