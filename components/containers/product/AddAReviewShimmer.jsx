import Shimmer from '@/components/ui/shimmer';

const AddAReviewShimmer = () => {
  return (
    <div className="container py-[80px]">
      <Shimmer className="mb-6 h-10 w-48 rounded md:h-12 md:w-64" />
      <div className="mt-6 w-full md:w-[60%]">
        <div className="space-y-4">
          <div className="mb-6 space-y-4">
            <Shimmer className="h-4 w-64 rounded" />
            <Shimmer className="h-4 w-80 rounded" />
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="w-full">
              <Shimmer className="h-12 w-full rounded" />
            </div>
            <div className="w-full">
              <Shimmer className="h-12 w-full rounded" />
            </div>
          </div>
          <div>
            <Shimmer className="h-32 w-full rounded" />
          </div>
          <div className="flex items-center justify-start gap-4">
            <Shimmer className="h-4 w-24 rounded" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <Shimmer key={index} className="h-6 w-6 rounded" />
              ))}
            </div>
          </div>
          <div className="mt-12">
            <Shimmer className="h-12 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAReviewShimmer;
