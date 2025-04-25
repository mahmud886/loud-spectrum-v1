import React from 'react';
import CarouselWithProgress from '@/components/carousels/CarouselWithProgress';

const CarouselsPage = () => {
  return (
    <div className="mt-[200px] min-h-screen bg-neutral-800">
      <div className="container">
        <CarouselWithProgress />
      </div>
    </div>
  );
};

export default CarouselsPage;
