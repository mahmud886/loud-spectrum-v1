import Shimmer from '@/components/ui/shimmer';

const SideBlogsShimmer = () => {
  return (
    <div>
      {[...Array(3)].map((_, index) => (
        <div key={index} className={`group mt-10 md:mt-0 ${index !== 0 ? 'border-umbra-40 border-t py-5' : 'pb-5'}`}>
          <div className="flex flex-col items-center gap-5 overflow-hidden bg-white transition-all duration-300 md:flex-row">
            <div className="w-full overflow-hidden md:w-[177px]">
              <div className="h-[150px] w-[177px]">
                <Shimmer className="h-full w-full rounded object-cover" />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex flex-col justify-between gap-5">
                <div className="mb-2 flex items-center gap-5">
                  {[...Array(2)].map((_, idx) => (
                    <Shimmer key={idx} className="h-[18px] w-10 rounded-sm md:h-[22px]" />
                  ))}
                  <Shimmer className="h-5 w-16 rounded" />
                </div>
                <Shimmer className="h-6 w-3/4 rounded md:h-7" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBlogsShimmer;
