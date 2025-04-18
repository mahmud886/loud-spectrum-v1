'use client';

import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const SpectrumAccordion = ({ items }) => {
  const [activeItem, setActiveItem] = useState(items?.[0]?.title || '');

  return (
    <div className="container pt-[160px] pb-[80px]">
      <Accordion
        type="single"
        collapsible
        value={activeItem}
        onValueChange={(value) => setActiveItem(value)}
        className="w-full"
      >
        {items.map((item, index) => (
          <AccordionItem key={index} value={item.title}>
            <AccordionTrigger
              className={cn(
                'font-sans text-[22px] leading-[130%] font-normal',
                activeItem === item.title ? 'text-umbra-100' : 'text-umbra-40',
              )}
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-umbra-100 max-w-4/5 font-mono text-[16px] leading-[140%] font-normal">
              {item.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SpectrumAccordion;
