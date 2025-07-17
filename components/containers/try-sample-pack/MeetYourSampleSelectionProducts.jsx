import ProductCarouselWithProgress from '@/components/carousels/ProductCarouselWithProgress';
import SamplePackCard from '@/components/product/SamplePackCard';
import { CarouselItem } from '@/components/ui/carousel';
import { getCategoryProducts } from '@/services/get-category-products';

const MeetYourSampleSelectionProducts = async ({ samplePackCategory }) => {
  const listOfProducts = await getCategoryProducts();

  const filteredSamplePackProducts =
    (await listOfProducts?.data?.filter((product) =>
      samplePackCategory?.some((category) => product.category_id === category._id),
    )) || [];

  console.log('filteredSamplePackProducts', filteredSamplePackProducts);
  return (
    <div className="container py-[60px] pt-[60px] md:py-[160px] md:pt-[160]">
      <div className="space-y-4 md:space-y-6">
        <h6 className="text-umbra-40 font-sans text-[14px] leading-[100%] font-normal tracking-normal uppercase md:text-[16px]">
          What’s Included
        </h6>
        <h5 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal tracking-normal md:text-[44px]">
          Meet Your Sample Selection
        </h5>
      </div>
      <div className="mt-3 md:mt-6">
        <ProductCarouselWithProgress>
          {filteredSamplePackProducts?.slice(0, 20).map((product) => (
            <CarouselItem
              key={product._id}
              className="pl-2 sm:basis-1 md:basis-1/2 md:pl-2 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/4"
            >
              <SamplePackCard product={product} />
            </CarouselItem>
          ))}
        </ProductCarouselWithProgress>
      </div>
    </div>
  );
};

export default MeetYourSampleSelectionProducts;
