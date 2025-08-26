'use client';

import ProductCard from '@/components/product/ProductCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

export default function CarouselWithProgress() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const progress = (current * 100) / count;

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/4 xl:basis-1/4">
              <ProductCard />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ✅ Gradient Progress Bar with white overlay for unfilled portion */}
        <div className="bg-gradient-four-colors relative mt-4 h-2 w-full overflow-hidden rounded-full">
          <div
            className="absolute top-0 right-0 h-full bg-white transition-all duration-300"
            style={{ width: `${100 - progress}%` }}
          />
        </div>

        <div className="mt-10">
          <CarouselPrevious className="top-[calc(100%+0.5rem)] left-0 translate-y-0" />
          <CarouselNext className="top-[calc(100%+0.5rem)] left-2 translate-x-full translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
