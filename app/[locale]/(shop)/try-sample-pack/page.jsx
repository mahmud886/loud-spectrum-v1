import React from 'react';
import MeetYourSampleSelectionProducts from '@/components/containers/try-sample-pack/MeetYourSampleSelectionProducts';
import SpectrumAccordion from '@/components/containers/SpectrumAccordion';
import SamplePackAddAReview from '@/components/containers/try-sample-pack/SamplePackAddAReview';
import SamplePackReviews from '@/components/containers/try-sample-pack/SamplePackReviews';
import RelatedProducts from '@/components/containers/product/RelatedProducts';

const TrySamplePackPage = () => {
  return (
    <>
      <MeetYourSampleSelectionProducts />
      <SpectrumAccordion items={accordionData} />
      <SamplePackReviews />
      <SamplePackAddAReview />
      <RelatedProducts />
    </>
  );
};

export default TrySamplePackPage;

const accordionData = [
  {
    title: 'About the Product',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'Features & Benefits',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'How to Use',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'Details',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'Certificate of Analysis',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
];
