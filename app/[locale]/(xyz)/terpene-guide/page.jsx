import PickYourPace from '@/components/containers/terpene-guide/PickYourPace';
import WhatAreTerpenes from '@/components/containers/terpene-guide/WhatAreTerpenes';
import WhatAreTerpenesMobile from '@/components/containers/terpene-guide/WhatAreTerpenesMobile';
import WhatAreTerpenesSlider from '@/components/containers/terpene-guide/WhatAreTerpenesSlider';
import TerpeneGuideHero from '@/components/headers/TerpeneGuideHero';

const TerpeneGuidePage = () => {
  return (
    <>
      <TerpeneGuideHero />
      <WhatAreTerpenes />
      <div className="block md:block lg:hidden xl:hidden">
        <WhatAreTerpenesMobile />
      </div>
      <div className="hidden lg:block xl:block">
        <WhatAreTerpenesSlider />
      </div>
      {/*<WhatAreTerpeneCarousel />*/}
      <PickYourPace />
    </>
  );
};

export default TerpeneGuidePage;
