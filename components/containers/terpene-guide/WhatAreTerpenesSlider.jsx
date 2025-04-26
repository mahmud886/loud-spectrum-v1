// import React from 'react';
// import Image from 'next/image';
// import { Link } from '@/i18n/navigation';
// import { useTranslations } from 'next-intl';

// const WhatAreTerpenesSlider = () => {
//   const t = useTranslations('WhatAreTerpenesSlider.classic');

//   return (
//     <div className="container">
//       <div className="pb-[200px]">
//         <section className="from-classic relative w-full bg-gradient-to-b to-black text-white">
//           <div className="min-h-[644px] p-10">
//             <div className="flex min-h-[564px] max-w-[550px] flex-col justify-between">
//               <div className="flex flex-col space-y-10">
//                 <p className="text-white-100 font-mono text-[20px] leading-[140%] font-normal">{t('description')}</p>
//                 <div>
//                   <p className="text-white-100 mb-2 font-mono text-[20px] leading-[140%] font-normal">
//                     {t('quickFacts')}
//                   </p>
//                   <ul className="text-white-40 space-y-1 font-mono text-[16px] leading-[140%] font-normal">
//                     {t.raw('facts').map((fact, index) => (
//                       <li key={index}>{fact}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               <div>
//                 <Link href="/shop" className="outline-button-black mt-4 inline-block rounded-full px-6 py-2">
//                   {t('shop')}
//                 </Link>
//               </div>
//             </div>

//             <p className="absolute right-0 bottom-[18%] origin-bottom rotate-270 text-5xl text-white">{t('label')}</p>
//             <div className="absolute right-[15%] bottom-[-25%]">
//               <Image
//                 src="/assets/images/Alive_Bottle_Simple_BG copiar 3.png"
//                 alt={t('label')}
//                 width={525}
//                 height={656}
//                 className="h-[656px] w-[525px] object-contain"
//               />
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default WhatAreTerpenesSlider;

'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as React from 'react';

const WhatAreTerpenesSlider = () => {
  const t = useTranslations('WhatAreTerpenesSlider');
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const slides = [
    {
      description: t('alive.description'),
      quickFactsTitle: t('alive.quickFacts'),
      facts: t.raw('alive.facts'),
      label: t('alive.label'),
      image: '/assets/images/terpene-guide/alive-slider.png',
      link: '/shop',
      buttonLabel: t('alive.shop'),
    },
    {
      description: t('dank.description'),
      quickFactsTitle: t('dank.quickFacts'),
      facts: t.raw('dank.facts'),
      label: t('dank.label'),
      image: '/assets/images/terpene-guide/dank-slider.png',
      link: '/shop',
      buttonLabel: t('dank.shop'),
    },
    {
      description: t('sweet.description'),
      quickFactsTitle: t('sweet.quickFacts'),
      facts: t.raw('sweet.facts'),
      label: t('sweet.label'),
      image: '/assets/images/terpene-guide/sweet-slider.png',
      link: '/shop',
      buttonLabel: t('sweet.shop'),
    },
    {
      description: t('classic.description'),
      quickFactsTitle: t('classic.quickFacts'),
      facts: t.raw('classic.facts'),
      label: t('classic.label'),
      image: '/assets/images/terpene-guide/classic-slider.png',
      link: '/shop',
      buttonLabel: t('classic.shop'),
    },
  ];

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="container">
      <div className="relative pb-[200px]">
        {/* Dots */}
        <div className="absolute top-5 right-10 z-20 flex items-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-3.5 w-3.5 rounded-full border-2 ${
                current === index + 1 ? 'border-white bg-white' : 'border-white/40'
              }`}
            />
          ))}
        </div>

        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {slides.map((slide, index) => {
              const labelLower = slide.label.toLowerCase();
              return (
                <CarouselItem key={index}>
                  <section className={cn('relative w-full bg-gradient-to-b to-black text-white', `from-${labelLower}`)}>
                    <div className="min-h-[644px] p-10">
                      <div className="flex min-h-[564px] max-w-[550px] flex-col justify-between">
                        <div className="flex flex-col space-y-10">
                          <p className="text-white-100 font-mono text-[20px] leading-[140%] font-normal">
                            {slide.description}
                          </p>
                          <div>
                            <p className="text-white-100 mb-2 font-mono text-[20px] leading-[140%] font-normal">
                              {slide.quickFactsTitle}
                            </p>
                            <ul className="text-white-40 space-y-1 font-mono text-[16px] leading-[140%] font-normal">
                              {slide.facts.map((fact, idx) => (
                                <li key={idx}>{fact}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <Link
                            href={slide.link}
                            className={`outline-button-black mt-4 inline-block rounded-full px-6 py-2`}
                          >
                            {slide.buttonLabel}
                          </Link>
                        </div>
                      </div>

                      <p className="absolute right-0 bottom-[18%] origin-bottom rotate-270 text-5xl text-white">
                        {slide.label}
                      </p>

                      <div className="absolute right-[15%] bottom-[-25%]">
                        <Image
                          src={slide.image}
                          alt={slide.label}
                          width={525}
                          height={656}
                          className="h-[656px] w-[525px] object-contain"
                        />
                      </div>
                    </div>
                  </section>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default WhatAreTerpenesSlider;

{
  /* Prev/Next Buttons */
}
{
  /*
          <CarouselPrevious className="top-[calc(100%+1rem)] left-0 translate-y-0" />
          <CarouselNext className="top-[calc(100%+1rem)] left-2 translate-x-full translate-y-0" />
          */
}
