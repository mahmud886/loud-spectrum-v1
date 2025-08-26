import Shimmer from '@/components/ui/shimmer';

const ProductGridCardShimmer = () => {
  return (
    <div className="cursor-pointer">
      <div className="relative flex h-[220px] min-h-[220px] w-full min-w-[162px] flex-col justify-around border bg-[#F5F5F5] p-2.5 xl:h-[384px] xl:min-h-[384px] xl:w-[305px] xl:min-w-[305px]">
        {/* Image Section */}
        <div className="flex items-center justify-center overflow-hidden xl:mt-16">
          <Shimmer className="h-[150px] w-auto object-cover xl:h-[254px] xl:w-[174px]" />
        </div>

        {/* Tag Button (Hidden on mobile) */}
        <div className="ml-3 hidden xl:block">
          <Shimmer className="h-6 w-20 rounded-[3px]" />
        </div>

        {/* Buy Now Button (Mobile) */}
        <div className="mt-auto xl:hidden">
          <Shimmer className="h-10 w-full rounded-full" />
        </div>

        {/* Buy Now Button (Desktop) */}
        <div className="absolute top-5 right-5 hidden xl:flex xl:justify-end">
          <Shimmer className="h-10 w-24 rounded-full" />
        </div>
      </div>

      {/* Product Title and Price */}
      <div className="mt-[15px]">
        <Shimmer className="mb-2 h-6 w-3/4 rounded xl:h-7" />
        <Shimmer className="h-5 w-1/2 rounded xl:h-6" />
      </div>
    </div>
  );
};

export default ProductGridCardShimmer;
