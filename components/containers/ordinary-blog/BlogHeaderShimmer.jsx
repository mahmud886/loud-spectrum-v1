import Shimmer from '@/components/ui/shimmer';

const BlogHeaderShimmer = () => {
  return (
    <>
      <div className="flex items-end justify-between pb-6 xl:pb-[80px]">
        <div className="flex w-full flex-col gap-4 xl:max-w-[70%]">
          <div className="flex flex-wrap items-center gap-2">
            <Shimmer className="h-8 w-20 rounded-md" />
            {[...Array(3)].map((_, idx) => (
              <Shimmer key={idx} className="h-[30px] w-16 rounded-sm xl:h-[38px]" />
            ))}
          </div>
          <Shimmer className="h-12 w-3/4 rounded xl:h-16" />
          <Shimmer className="h-12 w-3/4 rounded xl:h-16" />
        </div>
        <div className="hidden space-y-5 xl:block">
          <Shimmer className="h-6 w-20 rounded" />
          <Shimmer className="h-6 w-24 rounded" />
        </div>
      </div>
      <div className="relative h-[400px] w-full xl:h-[631px] xl:w-[1280px]">
        <Shimmer className="h-full w-full rounded object-cover" />
        {/* Left white box */}
        <div className="absolute bottom-[-1px] left-[-1px] h-[27px] w-[95px] bg-white xl:bottom-0 xl:left-0 xl:block xl:h-[105px] xl:w-[363px]"></div>
        {/* Right white box */}
        <div className="absolute right-[-1px] bottom-[-1px] h-[27px] w-[56px] bg-white xl:right-0 xl:bottom-0 xl:block xl:h-[105px] xl:w-[217px]"></div>
      </div>
    </>
  );
};

export default BlogHeaderShimmer;
