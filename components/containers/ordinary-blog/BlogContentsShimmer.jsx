import Shimmer from '@/components/ui/shimmer';

const BlogContentsShimmer = () => {
  const shimmerConfigs = [
    { width: 'w-full', height: 'h-4' },
    { width: 'w-5/6', height: 'h-4' },
    { width: 'w-3/4', height: 'h-4' },
    { width: 'w-full', height: 'h-4' },
    { width: 'w-4/5', height: 'h-4' },
    { width: 'w-2/3', height: 'h-4' },
    { width: 'w-full', height: 'h-4' },
    { width: 'w-7/8', height: 'h-4' },
    { width: 'w-3/5', height: 'h-4' },
    { width: 'w-full', height: 'h-4' },
    { width: 'w-4/6', height: 'h-4' },
    { width: 'w-5/7', height: 'h-4' },
  ];

  return (
    <div className="flex flex-col justify-between gap-20 py-[80px] xl:flex-row xl:gap-[160px]">
      <div className="xl:max-w-[58%]">
        <div className="space-y-4">
          {shimmerConfigs.map((config, idx) => (
            <div key={idx} className="space-y-2">
              <Shimmer className={`${config.height} ${config.width} rounded`} />
              <Shimmer className={`${config.height} ${config.width} rounded`} />
              <Shimmer className={`${config.height} ${config.width} rounded`} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full xl:max-w-[45%]">
        <div>
          <div className="mb-5">
            <Shimmer className="h-7 w-32 rounded" />
          </div>
          <div>
            {[...Array(4)].map((_, index) => (
              <div key={index} className="group border-umbra-40 border-t py-5">
                <div className="flex w-full flex-col items-center gap-5 overflow-hidden bg-white xl:flex-row">
                  <div className="w-[170px] overflow-hidden">
                    <div className="h-[102px] w-[120px] overflow-hidden">
                      <Shimmer className="h-full w-full rounded object-cover" />
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-between gap-3 py-2">
                    <div className="mb-2 flex items-center gap-5">
                      <div className="block xl:hidden">
                        <Shimmer className="h-6 w-16 rounded-sm" />
                      </div>
                      <Shimmer className="h-5 w-16 rounded" />
                    </div>
                    <Shimmer className="h-6 w-3/4 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContentsShimmer;
