import PickYourPace from '@/components/containers/terpene-guide/PickYourPace';
import WhatAreTerpenes from '@/components/containers/terpene-guide/WhatAreTerpenes';
import WhatAreTerpenesSlider from '@/components/containers/terpene-guide/WhatAreTerpenesSlider';
import TerpeneGuideHero from '@/components/headers/TerpeneGuideHero';

const TerpeneGuidePage = () => {
  return (
    <>
      <TerpeneGuideHero />
      <WhatAreTerpenes />
      <div className="hidden xl:block">
        <WhatAreTerpenesSlider />
      </div>
      {/*<WhatAreTerpeneCarousel />*/}
      <PickYourPace />
    </>
  );
};

export default TerpeneGuidePage;
