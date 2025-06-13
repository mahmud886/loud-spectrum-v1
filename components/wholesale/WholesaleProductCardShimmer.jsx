import Shimmer from '@/components/ui/shimmer';

const WholesaleProductCardShimmer = () => {
  return (
    <div className="bg-white-100 text-umbra-100 border-1 p-5 shadow-sm md:h-auto md:w-full">
      <div className="flex h-full w-full flex-col items-start justify-between gap-5">
        <div className="self-start">
          <div className="space-y-3">
            <div className="mx-auto overflow-hidden md:h-auto md:w-[371px]">
              <Shimmer className="h-[292px] w-full rounded-lg" />
            </div>
            <div className="flex items-center justify-between gap-5">
              <Shimmer className="h-6 w-24 rounded" />
              <Shimmer className="h-6 w-32 rounded" />
            </div>
            <div className="space-y-1">
              <Shimmer className="h-10 w-48 rounded" />
              <Shimmer className="h-8 w-24 rounded" />
            </div>
            <div className="space-y-1">
              <Shimmer className="h-6 w-full rounded" />
              <Shimmer className="h-6 w-3/4 rounded" />
            </div>
            <div className="space-y-1">
              <Shimmer className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex w-full items-center justify-between gap-5 md:flex-row">
            <div className="flex items-center gap-2">
              <Shimmer className="h-10 w-10 rounded-full" />
              <Shimmer className="h-10 w-10 rounded" />
              <Shimmer className="h-10 w-10 rounded-full" />
            </div>
          </div>
          <Shimmer className="h-10 w-full rounded-full md:max-w-[132px]" />
        </div>
      </div>
    </div>
  );
};

export default WholesaleProductCardShimmer;
