'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react';

export default function CustomerTestimonialsCarousel({ children }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const progress = count > 0 ? ((current + 1) * 100) / count : 0;

  useEffect(() => {
    if (!api) return;

    const snapList = api.scrollSnapList();
    setCount(snapList.length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="mx-auto overflow-hidden py-10">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-0 flex w-full gap-4 md:gap-8 xl:gap-6">
          {React.Children.map(children, (child, index) => (
            <CarouselItem
              key={index}
              className={`basis-[66.67%] pl-0 transition-opacity duration-300 sm:basis-[66.67%] md:basis-[66.67%] lg:basis-[40%] xl:basis-[40%] ${
                index === current ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="pt-2">
          <div className="py-2">
            <Progress value={progress} className="bg-white-20 my-4 w-full transition-all duration-300" />
          </div>
          <CarouselPrevious className="top-[calc(100%+0.5rem)] left-0 translate-y-0" />
          <CarouselNext className="top-[calc(100%+0.5rem)] left-2 translate-x-full translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
