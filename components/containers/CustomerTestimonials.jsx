import { getAllProductReviews } from '@/services/get-all-product-reviews';
import { getTranslations } from 'next-intl/server';
import ReviewAndTestimonialCarouselWithProgress from '../carousels/ReviewAndTestimonialCarouselWithProgress';
import ProductReviewCard from '../product/ProductReviewCard';

const CustomerTestimonials = async () => {
  const t = await getTranslations('Testimonials');
  const reviews = await getAllProductReviews();
  return (
    <>
      {reviews?.length > 0 && (
        <>
          <div className="container">
            <div className="py-20 lg:px-[120px] xl:py-[120px]">
              <div className="pb-20">
                <h5 className="text-umbra-40 font-sans text-[16px] font-normal uppercase">{t('testimonials')}</h5>
                <h2 className="text-umbra-100 max-w-2/3 font-sans text-[44px] leading-[120%] font-normal">
                  {t('testimonialTitle')}
                </h2>
              </div>
              <div>
                <ReviewAndTestimonialCarouselWithProgress>
                  {reviews?.map((review) => (
                    <ProductReviewCard key={review._id} review={review} />
                  ))}
                </ReviewAndTestimonialCarouselWithProgress>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerTestimonials;
