import Shimmer from '@/components/ui/shimmer';

const BlogHeaderShimmer = () => {
  return (
    <>
      <div className="flex items-end justify-between pb-6 md:pb-[80px]">
        <div className="flex w-full flex-col gap-4 md:max-w-[70%]">
          <div className="flex flex-wrap items-center gap-2">
            <Shimmer className="h-8 w-20 rounded-md" />
            {[...Array(3)].map((_, idx) => (
              <Shimmer key={idx} className="h-[30px] w-16 rounded-sm md:h-[38px]" />
            ))}
          </div>
          <Shimmer className="h-12 w-3/4 rounded md:h-16" />
          <Shimmer className="h-12 w-3/4 rounded md:h-16" />
        </div>
        <div className="hidden space-y-5 md:block">
          <Shimmer className="h-6 w-20 rounded" />
          <Shimmer className="h-6 w-24 rounded" />
        </div>
      </div>
      <div className="relative h-[400px] w-full md:h-[631px] md:w-[1280px]">
        <Shimmer className="h-full w-full rounded object-cover" />
        {/* Left white box */}
        <div className="absolute bottom-[-1px] left-[-1px] h-[27px] w-[95px] bg-white md:bottom-0 md:left-0 md:block md:h-[105px] md:w-[363px]"></div>
        {/* Right white box */}
        <div className="absolute right-[-1px] bottom-[-1px] h-[27px] w-[56px] bg-white md:right-0 md:bottom-0 md:block md:h-[105px] md:w-[217px]"></div>
      </div>
    </>
  );
};

export default BlogHeaderShimmer;
