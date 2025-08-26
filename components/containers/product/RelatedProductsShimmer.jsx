import ProductGridCardShimmer from '@/components/product/ProductGridCardShimmer';
import Shimmer from '@/components/ui/shimmer';

const RelatedProductsShimmer = () => {
  return (
    <div className="container pt-20 pb-20 xl:pb-[160px]">
      <Shimmer className="mb-12 h-10 w-64 rounded xl:h-12 xl:w-80" />
      <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <ProductGridCardShimmer key={index} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsShimmer;
