import Shimmer from '@/components/ui/shimmer';

const ProductReviewsShimmer = () => {
  return (
    <div className="container pb-6 xl:pb-[80px]">
      <Shimmer className="mb-8 h-10 w-48 rounded xl:h-12 xl:w-64" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="rounded-lg border border-gray-200 p-6">
            <div className="mb-4 flex items-center gap-4">
              <Shimmer className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <Shimmer className="mb-2 h-4 w-24 rounded" />
                <Shimmer className="h-3 w-16 rounded" />
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-2 flex gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <Shimmer key={starIndex} className="h-4 w-4 rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Shimmer className="h-4 w-full rounded" />
              <Shimmer className="h-4 w-3/4 rounded" />
              <Shimmer className="h-4 w-5/6 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsShimmer;
