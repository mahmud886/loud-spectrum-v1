'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItemWholesale,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

export default function WholesaleProductCarousel({ children }) {
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
    <div className="">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent className="!ml-[-2px] flex w-full">
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItemWholesale key={index} className="pl-1">
              {children}
            </CarouselItemWholesale>
          ))}
        </CarouselContent>

        <CarouselPrevious className="top-[calc(50%)] left-5 translate-y-0" />
        <CarouselNext className="top-[calc(50%)] right-5 translate-y-0" />

        <Progress value={progress} className="bg-white-20 w-full transition-all duration-300" />
      </Carousel>
    </div>
  );
}
