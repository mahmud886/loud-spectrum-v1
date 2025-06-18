'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const SpectrumAccordion = ({ items }) => {
  const [activeItem, setActiveItem] = useState(items?.[0]?.title || '');

  return (
    <div className="container pb-20 md:pb-[160px]">
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
                'font-sans text-[18px] leading-[130%] font-normal !capitalize md:text-[22px]',
                activeItem === item.title ? 'text-umbra-100' : 'text-umbra-40',
              )}
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-umbra-100 max-w-full pb-8 font-mono text-[16px] leading-[140%] font-normal">
              {typeof item.description === 'string' ? (
                <span dangerouslySetInnerHTML={{ __html: item.description }} />
              ) : (
                item.description
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SpectrumAccordion;
