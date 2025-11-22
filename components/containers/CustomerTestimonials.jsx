import { getAllProductReviews } from '@/services/get-all-product-reviews';
import { getTranslations } from 'next-intl/server';
import CustomerTestimonialsCarousel from '../carousels/CustomerTestimonialsCarousel';
import CustomerTestimonialsCard from './CustomerTestimonialsCard';

const CustomerTestimonials = async () => {
  const t = await getTranslations('Testimonials');
  const reviews = await getAllProductReviews();
  return (
    <>
      {reviews?.length > 0 && (
        <>
          <div className="container">
            <div className="py-20 lg:px-[120px] xl:py-[120px]">
              <div className="pb-10 md:pb-20">
                <h5 className="text-umbra-40 font-sans text-[16px] font-normal uppercase">{t('testimonials')}</h5>
                <h2 className="text-umbra-100 max-w-2/3 font-sans text-[24px] leading-[120%] font-normal md:text-[44px]">
                  {t('testimonialTitle')}
                </h2>
              </div>
              <div>
                <CustomerTestimonialsCarousel>
                  {reviews?.map((review) => (
                    <CustomerTestimonialsCard key={review._id} review={review} />
                  ))}
                </CustomerTestimonialsCarousel>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerTestimonials;
