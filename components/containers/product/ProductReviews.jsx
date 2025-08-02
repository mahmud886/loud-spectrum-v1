import ReviewAndTestimonialCarouselWithProgress from '@/components/carousels/ReviewAndTestimonialCarouselWithProgress';
import ProductReviewCard from '@/components/product/ProductReviewCard';
import { getProductReviews } from '@/services/get-product-reviews';

const ProductReviews = async ({ productId }) => {
  const reviews = await getProductReviews(productId);
  return (
    <>
      {reviews?.length > 0 && (
        <>
          <div className={'container pb-6 md:pb-[80px]'}>
            <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal md:text-[44px]">
              Reviews <span className="text-umbra-40">({reviews?.length})</span>
            </h2>
            <div>
              <ReviewAndTestimonialCarouselWithProgress>
                {reviews?.map((review) => (
                  <ProductReviewCard key={review._id} review={review} />
                ))}
              </ReviewAndTestimonialCarouselWithProgress>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductReviews;
