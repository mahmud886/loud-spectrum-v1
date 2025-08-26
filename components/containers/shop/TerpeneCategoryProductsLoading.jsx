import ProductGridCardShimmer from '@/components/product/ProductGridCardShimmer';

const TerpeneCategoryProductsLoading = () => {
  return (
    <div className="w-full space-y-10 xl:w-[75%]">
      <div className="grid grid-cols-2 gap-3 space-y-8 xl:grid-cols-3 xl:gap-5 xl:space-y-16">
        {Array.from({ length: 9 }).map((_, index) => (
          <ProductGridCardShimmer key={index} />
        ))}
      </div>
    </div>
  );
};

export default TerpeneCategoryProductsLoading;
