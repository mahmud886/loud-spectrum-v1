import React from 'react';
import SamplePackCard from '@/components/product/SamplePackCard';
import ProductCarouselWithProgress from '@/components/carousels/ProductCarouselWithProgress';

const MeetYourSampleSelectionProducts = () => {
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
          <SamplePackCard />
        </ProductCarouselWithProgress>
      </div>
    </div>
  );
};

export default MeetYourSampleSelectionProducts;
