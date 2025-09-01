'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const WhatAreTerpenesMobile = () => {
  const t = useTranslations('WhatAreTerpenesSlider');
  const [expandedCard, setExpandedCard] = useState(null);

  const colorMap = {
    alive: 'from-alive',
    sweet: 'from-sweet',
    dank: 'from-dank',
    classic: 'from-classic',
  };

  const cards = [
    {
      description: t('alive.description'),
      quickFactsTitle: t('alive.quickFacts'),
      facts: t.raw('alive.facts'),
      label: t('alive.label'),
      image: '/assets/images/terpene-guide/alive-slider.png',
      link: '/shop/alive',
      buttonLabel: t('alive.shop'),
      type: 'alive',
    },
    {
      description: t('sweet.description'),
      quickFactsTitle: t('sweet.quickFacts'),
      facts: t.raw('sweet.facts'),
      label: t('sweet.label'),
      image: '/assets/images/terpene-guide/sweet-slider.png',
      link: '/shop/sweet',
      buttonLabel: t('sweet.shop'),
      type: 'sweet',
    },
    {
      description: t('dank.description'),
      quickFactsTitle: t('dank.quickFacts'),
      facts: t.raw('dank.facts'),
      label: t('dank.label'),
      image: '/assets/images/terpene-guide/dank-slider.png',
      link: '/shop/dank',
      buttonLabel: t('dank.shop'),
      type: 'dank',
    },
    {
      description: t('classic.description'),
      quickFactsTitle: t('classic.quickFacts'),
      facts: t.raw('classic.facts'),
      label: t('classic.label'),
      image: '/assets/images/terpene-guide/classic-slider.png',
      link: '/shop/classic',
      buttonLabel: t('classic.shop'),
      type: 'classic',
    },
  ];

  const toggleExpanded = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="container px-4">
      <div className="space-y-4">
        {cards.map((card, index) => {
          const isExpanded = expandedCard === index;
          return (
            <div key={index} className="overflow-hidden">
              <div
                className={cn(
                  'relative bg-gradient-to-b to-black p-6 text-white transition-all duration-300 ease-in-out',
                  isExpanded ? 'min-h-[500px]' : 'min-h-[400px]',
                  colorMap[card.type],
                )}
              >
                {/* Content */}
                <div className="relative z-10">
                  {/* Title */}
                  <h2 className="mb-4 text-[50px] font-normal text-white">{card.label}</h2>

                  {/* Product Image */}
                  <div className="flex w-full items-center justify-center">
                    <div className="h-[226px] w-[295px]">
                      <Image
                        src={card.image}
                        alt={card.label}
                        width={295}
                        height={226}
                        className="h-[226px] w-[295px] object-contain"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="align-center mb-6 flex items-start gap-3">
                    <p className="flex-1 font-mono text-[14px] leading-relaxed text-white/90">
                      {isExpanded
                        ? card.description
                        : card.description.length > 100
                          ? `${card.description.substring(0, 100)}...`
                          : card.description}
                    </p>

                    {/* Plus/Minus Icon - Inline with description */}
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="flex-shrink-0 transition-transform duration-200 hover:scale-110"
                      aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-1 border-white/60 backdrop-blur-md hover:border-white/80">
                        {isExpanded ? (
                          <Minus size={20} className="text-white/60 transition-colors hover:text-white/80" />
                        ) : (
                          <Plus size={20} className="text-white/60 transition-colors hover:text-white/80" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Quick Facts - Always visible but with animation */}
                  <div
                    className={cn(
                      'mb-8 transition-all duration-300 ease-in-out',
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-32 opacity-100',
                    )}
                  >
                    <h3 className="mb-2 font-mono text-sm text-white">{card.quickFactsTitle}</h3>
                    <ul className="space-y-1 font-mono text-xs leading-relaxed text-white/60">
                      {card.facts.map((fact, idx) => (
                        <li
                          key={idx}
                          className={cn(
                            'transition-opacity duration-300',
                            isExpanded ? 'opacity-100' : idx < 3 ? 'opacity-100' : 'opacity-0',
                          )}
                        >
                          {fact}
                        </li>
                      ))}
                    </ul>
                    {/* {!isExpanded && card.facts.length > 3 && (
                      <p className="mt-2 font-mono text-xs text-white/40">+{card.facts.length - 3} more facts</p>
                    )} */}
                  </div>

                  {/* Shop Button */}
                  <Link
                    href={card.link}
                    className="outline-button-black inline-block w-full rounded-full px-6 py-2 text-center backdrop-blur-md transition-colors hover:bg-gray-700/80"
                  >
                    {card.buttonLabel}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatAreTerpenesMobile;
