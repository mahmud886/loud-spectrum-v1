import React from 'react';
import { Star } from 'lucide-react';

const ProductReviewCard = () => {
  return (
    <div className="h-full w-full px-2 md:min-h-[300px] md:w-[450px]">
      <div className="flex h-full flex-col items-start justify-between gap-6">
        <div className="space-y-6">
          <div>
            <span className={'flex items-center justify-start'}>
              <Star size={15} fill={'#00000'} />
              <Star size={15} fill={'#00000'} />
              <Star size={15} fill={'#00000'} />
              <Star size={15} fill={'#00000'} />
              <Star size={15} fill={'#00000'} />
            </span>
          </div>
          <div className="max-w-[95%]">
            <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal">
              Wow, best terps in town. Live resin terpenes are so dank it’s unreal. No need to shop anywhere else.
              Medical terpenes/sauce terps are the best supplier in the business with top notch terpene profiles and the
              best customer service and support.
            </p>
          </div>
        </div>
        <div>
          <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal">Bill</p>
          <p className="text-umbra-40 font-mono text-[20px] leading-[140%] font-normal">August 10, 2021</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
