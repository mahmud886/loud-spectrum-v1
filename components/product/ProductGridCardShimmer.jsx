import { Skeleton } from '@/components/ui/skeleton';

// Custom shimmer component for images and buttons with gradient animation
const ShimmerElement = ({ className }) => {
  return (
    <div
      className={`bg-gradient-to-r from-gray-100/50 via-gray-200/50 to-gray-100/50 bg-[length:200%_100%] ${className}`}
      style={{
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
};

const ProductGridCardShimmer = () => {
  return (
    <div className="cursor-pointer">
      <div className="relative flex h-[220px] min-h-[220px] w-full min-w-[162px] flex-col justify-around border bg-[#F5F5F5] p-2.5 xl:h-[384px] xl:min-h-[384px] xl:w-auto xl:min-w-auto">
        {/* Image Section */}
        <div className="flex items-center justify-center overflow-hidden xl:mt-16">
          <ShimmerElement className="h-[150px] w-auto rounded-md object-cover xl:h-[254px] xl:w-[174px]" />
        </div>

        {/* Tag Button (Hidden on mobile) */}
        <div className="ml-3 hidden xl:block">
          <ShimmerElement className="h-6 w-20 rounded-[3px]" />
        </div>

        {/* Buy Now Button (Mobile) */}
        <div className="mt-auto xl:hidden">
          <ShimmerElement className="h-10 w-full rounded-full" />
        </div>

        {/* Buy Now Button (Desktop) */}
        <div className="absolute top-5 right-5 hidden xl:flex xl:justify-end">
          <ShimmerElement className="h-10 w-24 rounded-full" />
        </div>
      </div>

      {/* Product Title and Price */}
      <div className="mt-[15px]">
        <Skeleton className="mb-2 h-6 w-3/4 rounded xl:h-7" />
        <Skeleton className="h-5 w-1/2 rounded xl:h-6" />
      </div>
    </div>
  );
};

export default ProductGridCardShimmer;
