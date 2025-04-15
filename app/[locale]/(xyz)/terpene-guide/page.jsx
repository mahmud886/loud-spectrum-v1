import React from 'react';
import TerpeneGuideHero from '@/components/headers/TerpeneGuideHero';
import WhatAreTerpenes from '@/components/containers/terpene-guide/WhatAreTerpenes';
import WhatAreTerpenesSlider from '@/components/containers/terpene-guide/WhatAreTerpenesSlider';
import PickYourPace from '@/components/containers/terpene-guide/PickYourPace';

const TerpeneGuidePage = () => {
  return (
    <>
      <TerpeneGuideHero />
      <WhatAreTerpenes />
      <WhatAreTerpenesSlider />
      <PickYourPace />
    </>
  );
};

export default TerpeneGuidePage;
