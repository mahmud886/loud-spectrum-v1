import React from 'react';
import SpectrumAccordion from '@/components/containers/SpectrumAccordion';

const WholesaleRegistrationFaq = () => {
  return (
    <>
      <div className="container pt-20">
        <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal">Frequently Asked Questions</h2>
      </div>
      <div className="pt-20">
        <SpectrumAccordion items={faqData} />
      </div>
    </>
  );
};

export default WholesaleRegistrationFaq;

const faqData = [
  {
    title: 'What is your production capacity?',
    description:
      'Whether you’re launching a new CBD line or an industry-leading manufacturer, we can handle your needs. That’s whether you’re a manufacturer, retailer, or formulator. Our operation is built to scale, ensuring every client—no matter their size—receives personalized attention and the exceptional service we’re known for. Let us handle the flavor and effect, so you can focus on growing your business.',
  },
  {
    title: 'Terpenes And CBD',
    description:
      'When combined with CBD, terpenes can work synergistically to enhance the effects, known as the “entourage effect.” Adding terpene profiles to CBD can improve the experience and allow for more control over desired effects.',
  },
  {
    title: 'What Are Strain Specific And Full Spectrum Profiles?',
    description:
      'Strain specific and full spectrum profiles mimic the exact aroma and effects of cannabis strains using naturally occurring terpenes to replicate their properties authentically.',
  },
  {
    title: 'Why Choose Sauce Terps And Medical Terpenes?',
    description:
      'Medical Terpenes has years of experience in delivering pure, high-quality terpene profiles with great customer service. They are committed to quality, authenticity, and customer care.',
  },
  {
    title: 'Do You Sell Samples?',
    description:
      'Yes. All terpene profiles are available in 1ml sample sizes. Sample packs are also offered for customers who want to explore a variety of profiles at a discounted price.',
  },
  {
    title: 'Do You Have A Store Front?',
    description: 'Yes. There is a pickup location at 1907 N Main St, Santa Ana, CA 92706. Contact: 714-905-9681.',
  },
  {
    title: 'What Are Shipping And Handling Times?',
    description:
      'Handling: 1–3 business days. Shipping: USPS 2–4 days, FedEx/UPS Ground 2–5 days. Alaska/Hawaii: 3–5 business days.',
  },
  {
    title: 'What Is The Difference Between Sauce Terps, Medical Terpenes, Ultra Candy, And 710?',
    description:
      'Sauce Terps: Loud, dank, cannabis-like aroma. Medical Terpenes: Slightly muted but flavorful. Ultra Candy: Candy/fruit flavors with no cannabis notes. 710: Budget-friendly with fewer isolates.',
  },
  {
    title: 'Are All Of Your Terpenes HDT, Or Do You Have A True CDT?',
    description:
      'Live Resin profiles are either HDT (botanical) or CDT (cannabis derived) and are labeled accordingly.',
  },
  {
    title: 'What Are The International Shipping Rates?',
    description: 'International shipping rates vary depending on the destination and order details.',
  },
  {
    title: 'Entourage Effect',
    description:
      'The entourage effect refers to how different terpenes work together to enhance the therapeutic effects of cannabis. Sauce Terps profiles include 100+ terpenes per blend.',
  },
  {
    title: 'Storage Direction',
    description: 'Store terpene profiles in a cool, dark place. Freezing is acceptable if needed.',
  },
  {
    title: 'Mixing Direction',
    description:
      'Recommended ratios: 1–10% for Medical Terpenes, 5–15% for Sauce Terps. Start small due to potency and adjust to taste.',
  },
  {
    title: 'Measuring Direction',
    description: 'Profiles come with a Euro dropper for accurate mixing. If removed, use glass pipettes.',
  },
  {
    title: 'Are There Wholesale / Bulk Options?',
    description: 'Yes. Both Sauce Terps and Medical Terpenes offer wholesale options via inquiry.',
  },
  {
    title: 'What Are My Shipping Options?',
    description: 'USPS First Class is the default. FedEx and UPS Ground are available upon request.',
  },
  {
    title: 'Returns / Refunds',
    description:
      'All sales are final due to the consumable nature of the products. Orders can be refunded if not fulfilled/shipped.',
  },
  {
    title: 'Which Profiles Are The Most Gassy Or Resemble Flower Best?',
    description: 'Live Resin or Sauce Terps profiles offer the most gassy, flower-like aromas.',
  },
  {
    title: 'Do You Have Lab Tests For The Terpenes?',
    description:
      'Yes. All terpene products have third-party COAs. They are tested for pesticides, heavy metals, and solvents in ISO and cGMP facilities.',
  },
];
