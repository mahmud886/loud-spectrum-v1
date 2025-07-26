import Shimmer from '@/components/ui/shimmer';

const SpectrumAccordionShimmer = () => {
  return (
    <div className="container pb-20 md:pb-[160px]">
      <div className="w-full space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <Shimmer className="h-7 w-48 rounded md:h-8 md:w-56" />
              <Shimmer className="h-6 w-6 rounded" />
            </div>
            <div className="mt-4 space-y-2">
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

export default SpectrumAccordionShimmer;
