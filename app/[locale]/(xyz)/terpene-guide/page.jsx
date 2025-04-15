import React from 'react';
import TerpeneGuideHero from '@/components/headers/TerpeneGuideHero';
import WhatAreTerpenes from '@/components/containers/terpene-guide/WhatAreTerpenes';
import WhatAreTerpenesSlider from '@/components/containers/terpene-guide/WhatAreTerpenesSlider';

const TerpeneGuidePage = () => {
  return (
    <>
      <TerpeneGuideHero />
      <WhatAreTerpenes />
      <WhatAreTerpenesSlider />
    </>
  );
};

export default TerpeneGuidePage;
