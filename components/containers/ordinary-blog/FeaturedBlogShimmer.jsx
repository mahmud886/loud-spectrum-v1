import Shimmer from '@/components/ui/shimmer';

const FeaturedBlogShimmer = () => {
  return (
    <div className="group flex flex-col justify-between space-y-6">
      <div className="relative overflow-hidden">
        <div className="h-[380px] w-[685px]">
          <Shimmer className="h-full w-full rounded object-cover" />
        </div>
        <div className="absolute top-[8%] right-[5%]">
          <Shimmer className="h-8 w-24 rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex items-start justify-between">
          <div className="flex max-w-[85%] flex-wrap items-center gap-2">
            <Shimmer className="h-[34px] w-20 rounded-md" />
            {[...Array(2)].map((_, idx) => (
              <Shimmer key={idx} className="h-[30px] w-16 rounded-sm" />
            ))}
          </div>
          <Shimmer className="h-5 w-20 rounded" />
        </div>
      </div>
      <Shimmer className="h-7 w-3/4 rounded xl:h-8" />
      <div className="center mt-10 flex w-full items-center justify-between pb-0 xl:hidden">
        <Shimmer className="h-12 w-full rounded-full" />
      </div>
    </div>
  );
};

export default FeaturedBlogShimmer;
