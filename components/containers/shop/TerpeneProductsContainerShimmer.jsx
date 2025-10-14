import ProductGridCardShimmer from '@/components/product/ProductGridCardShimmer';
import { Skeleton } from '@/components/ui/skeleton';

const TerpeneProductsContainerShimmer = () => {
  return (
    <div className="container pt-[100px]">
      <div className="flex flex-col items-start justify-between gap-12 xl:flex-row">
        <div className="w-full xl:w-[20%]">
          <div className="mb-6 xl:mb-12">
            <Skeleton className="h-7 w-32 rounded xl:h-8 xl:w-40" />
          </div>
          <div className="block xl:hidden">
            <Skeleton className="h-12 w-full rounded" />
          </div>
          <div className="hidden xl:block">
            <div className="space-y-3">
              {[...Array(6)].map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full rounded" />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full space-y-10 xl:w-[75%]">
          <div className="grid grid-cols-2 gap-3 space-y-8 lg:grid-cols-3 lg:gap-2 xl:grid-cols-3 xl:gap-5 xl:space-y-16">
            {Array.from({ length: 9 }).map((_, index) => (
              <ProductGridCardShimmer key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerpeneProductsContainerShimmer;
