import React from 'react';
import ProductReviewCard from '@/components/product/ProductReviewCard';
import ReviewAndTestimonialCarouselWithProgress from '@/components/carousels/ReviewAndTestimonialCarouselWithProgress';

const SamplePackReviews = () => {
  return (
    <div className={'container md:py-[80px]'}>
      <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal md:text-[44px]">
        Reviews <span className="text-umbra-40">(6)</span>
      </h2>
      <div>
        <ReviewAndTestimonialCarouselWithProgress>
          <ProductReviewCard />
        </ReviewAndTestimonialCarouselWithProgress>
      </div>
    </div>
  );
};

export default SamplePackReviews;
