import Shimmer from '@/components/ui/shimmer';

const ProductDetailsHeroShimmer = () => {
  return (
    <>
      <div className="relative hidden h-[1082px] overflow-hidden bg-black md:block">
        <Shimmer className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 object-cover md:w-[1920px]" />

        <div className="absolute inset-0 z-10 container h-[987px] w-full overflow-hidden">
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-[40px]">
            <div className="flex w-full items-start justify-between gap-[40px]">
              {/* Left Card Shimmer */}
              <div className="bg-white-100 text-umbra-100 p-5 md:h-[587px] md:w-[413px]">
                <div className="flex h-full w-full flex-col items-start justify-between gap-5">
                  <div className="w-full self-start">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-5">
                        <Shimmer className="h-8 w-20 rounded-md" />
                        <div className="flex items-center gap-2">
                          <Shimmer className="h-4 w-16 rounded" />
                          <Shimmer className="h-4 w-12 rounded" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Shimmer className="h-8 w-3/4 rounded" />
                        <Shimmer className="h-6 w-1/2 rounded" />
                      </div>
                      <div className="space-y-2">
                        <Shimmer className="h-4 w-full rounded" />
                        <Shimmer className="h-4 w-3/4 rounded" />
                        <Shimmer className="h-4 w-5/6 rounded" />
                      </div>
                      <div className="space-y-3">
                        <Shimmer className="h-12 w-full rounded-lg" />
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

              {/* Right Card Shimmer */}
              <div className="bg-white-100 text-umbra-100 p-5 md:h-[587px] md:w-[413px]">
                <div className="flex h-full w-full flex-col items-start justify-between gap-5">
                  <div className="w-full self-start">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-5">
                        <Shimmer className="h-8 w-20 rounded-md" />
                        <div className="flex items-center gap-2">
                          <Shimmer className="h-4 w-16 rounded" />
                          <Shimmer className="h-4 w-12 rounded" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Shimmer className="h-8 w-3/4 rounded" />
                        <Shimmer className="h-6 w-1/2 rounded" />
                      </div>
                      <div className="space-y-2">
                        <Shimmer className="h-4 w-full rounded" />
                        <Shimmer className="h-4 w-3/4 rounded" />
                        <Shimmer className="h-4 w-5/6 rounded" />
                      </div>
                      <div className="space-y-3">
                        <Shimmer className="h-12 w-full rounded-lg" />
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
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 z-20 w-[1440px] -translate-x-1/2">
          <Shimmer className="w-full object-cover" />
        </div>
      </div>

      {/* Mobile Shimmer */}
      <div className="relative block h-[619px] overflow-hidden bg-black md:hidden">
        <Shimmer className="absolute top-0 left-1/2 z-0 h-[619px] w-full -translate-x-1/2 object-cover" />
      </div>

      <div className="flex justify-center py-8 md:hidden">
        <div className="bg-white-100 text-umbra-100 p-5 md:h-[587px] md:w-[413px]">
          <div className="flex h-full w-full flex-col items-start justify-between gap-5">
            <div className="w-full self-start">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-5">
                  <Shimmer className="h-8 w-20 rounded-md" />
                  <div className="flex items-center gap-2">
                    <Shimmer className="h-4 w-16 rounded" />
                    <Shimmer className="h-4 w-12 rounded" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Shimmer className="h-8 w-3/4 rounded" />
                  <Shimmer className="h-6 w-1/2 rounded" />
                </div>
                <div className="space-y-2">
                  <Shimmer className="h-4 w-full rounded" />
                  <Shimmer className="h-4 w-3/4 rounded" />
                  <Shimmer className="h-4 w-5/6 rounded" />
                </div>
                <div className="space-y-3">
                  <Shimmer className="h-12 w-full rounded-lg" />
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
      </div>
    </>
  );
};

export default ProductDetailsHeroShimmer;
