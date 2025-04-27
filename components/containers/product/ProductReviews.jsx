import React from 'react';
import ReviewAndTestimonialCarouselWithProgress from '@/components/carousels/ReviewAndTestimonialCarouselWithProgress';
import ProductReviewCard from '@/components/product/ProductReviewCard';

const ProductReviews = () => {
  return (
    <div className={'container pb-6 md:pb-[80px]'}>
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

export default ProductReviews;
