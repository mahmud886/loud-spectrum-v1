import Shimmer from '@/components/ui/shimmer';

const ProductGridCardShimmer = () => {
  return (
    <div className="cursor-pointer">
      <div className="relative flex h-[220px] min-h-[220px] w-full min-w-[162px] flex-col justify-around border bg-[#F0F0F0] p-2.5 md:h-[384px] md:min-h-[384px] md:w-[305px] md:min-w-[305px]">
        {/* Image Section */}
        <div className="flex items-center justify-center overflow-hidden md:mt-16">
          <Shimmer className="h-[150px] w-auto object-cover md:h-[254px] md:w-[174px]" />
        </div>

        {/* Tag Button (Hidden on mobile) */}
        <div className="ml-3 hidden md:block">
          <Shimmer className="h-6 w-20 rounded-[3px]" />
        </div>

        {/* Buy Now Button (Mobile) */}
        <div className="mt-auto md:hidden">
          <Shimmer className="h-10 w-full rounded-full" />
        </div>

        {/* Buy Now Button (Desktop) */}
        <div className="absolute top-5 right-5 hidden md:flex md:justify-end">
          <Shimmer className="h-10 w-24 rounded-full" />
        </div>
      </div>

      {/* Product Title and Price */}
      <div className="mt-[15px]">
        <Shimmer className="mb-2 h-6 w-3/4 rounded md:h-7" />
        <Shimmer className="h-5 w-1/2 rounded md:h-6" />
      </div>
    </div>
  );
};

export default ProductGridCardShimmer;
