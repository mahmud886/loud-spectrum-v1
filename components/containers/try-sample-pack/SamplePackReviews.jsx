import ReviewAndTestimonialCarouselWithProgress from '@/components/carousels/ReviewAndTestimonialCarouselWithProgress';
import ProductReviewCard from '@/components/product/ProductReviewCard';
import { getAllProductReviews } from '@/services/get-all-product-reviews';
import { getTranslations } from 'next-intl/server';

const SamplePackReviews = async () => {
  const t = await getTranslations('TrySamplePack');
  const productReviews = await getAllProductReviews();
  const filteredProductReviews = productReviews
    ?.filter((review) => review?.status === 'Active')
    ?.filter((review) => review?.category_slug === 'sample-packs');

  return (
    <>
      {filteredProductReviews?.length > 0 && (
        <div className={'container py-6 md:py-[80px]'}>
          <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal md:text-[44px]">
            {t('Reviews')} <span className="text-umbra-40">({filteredProductReviews?.length})</span>
          </h2>
          <div>
            <ReviewAndTestimonialCarouselWithProgress>
              {filteredProductReviews?.map((review) => (
                <ProductReviewCard key={review?._id} review={review} />
              ))}
            </ReviewAndTestimonialCarouselWithProgress>
          </div>
        </div>
      )}
    </>
  );
};

export default SamplePackReviews;
