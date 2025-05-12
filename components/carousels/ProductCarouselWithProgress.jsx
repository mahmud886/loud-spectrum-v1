'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

export default function ProductCarouselWithProgress({ children }) {
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
    <div className="mx-auto py-6">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent className="flex w-full gap-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-2 sm:basis-1 md:basis-1/2 md:pl-2 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/4"
            >
              {children}
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="pt-8">
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
