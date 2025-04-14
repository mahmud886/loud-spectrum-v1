import React from 'react';
import AboutHero from '@/components/headers/AboutHero';
import TerpeneProfile from '@/components/containers/TerpeneProfile';
import FlavorScience from '@/components/containers/FlavorScience';
import WhyLoudSpectrum from '@/components/containers/WhyLoudSpectrum';
import OurVision from '@/components/containers/OurVision';
import FlavorThatSetsYouApart from '@/components/containers/FlavorThatSetsYouApart';

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <TerpeneProfile />
      <FlavorScience />
      <WhyLoudSpectrum />
      <OurVision />
      <FlavorThatSetsYouApart />
    </>
  );
};

export default AboutPage;
