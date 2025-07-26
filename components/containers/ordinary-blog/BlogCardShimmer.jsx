import Shimmer from '@/components/ui/shimmer';

const BlogCardShimmer = () => {
  return (
    <div className="group flex flex-col space-y-6">
      <div className="relative">
        <div>
          <div className="overflow-hidden">
            <div className="h-[380px] w-[413px]">
              <Shimmer className="h-full w-full rounded object-cover" />
            </div>
          </div>
          <div className="absolute top-[8%] right-[5%]">
            <Shimmer className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-start justify-between">
          <div className="flex max-w-[80%] flex-wrap items-center gap-2">
            {[...Array(2)].map((_, idx) => (
              <Shimmer key={idx} className="h-[30px] w-16 rounded-sm" />
            ))}
          </div>
          <Shimmer className="h-5 w-20 rounded" />
        </div>
      </div>
      <Shimmer className="h-6 w-3/4 rounded md:h-7" />
    </div>
  );
};

export default BlogCardShimmer;
