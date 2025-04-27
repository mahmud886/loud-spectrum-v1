import Image from 'next/image';
import SamplePackHeroCard from '@/components/containers/try-sample-pack/SamplePackHeroCard';

const TrySamplePackHero = () => {
  return (
    <>
      <div className="hidden h-[619px] overflow-hidden bg-black md:relative md:block md:h-[1082px]">
        <Image
          src="/assets/images/sample-pack/sample-pack-hero.png"
          alt="Background"
          width={1440}
          height={797}
          className="absolute top-0 left-1/2 z-0 hidden h-full w-[1440px] -translate-x-1/2 object-cover md:block"
          priority
        />

        <div className="absolute inset-0 z-10 container hidden h-[987px] w-full overflow-hidden md:block">
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-[40px]">
            <div className="flex w-full items-start justify-between gap-[40px]">
              <SamplePackHeroCard />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 z-20 hidden w-[1440px] -translate-x-1/2 md:block">
          <Image
            src="/assets/images/hero-section-mask.png"
            alt="Shop Hero"
            width={1440}
            height={195}
            className="w-full object-cover"
          />
        </div>
      </div>

      <div className="relative block h-[619px] overflow-hidden bg-black md:hidden">
        <Image
          src="/assets/images/sample-pack/sample-pack-hero-mobile.png"
          alt="Background"
          width={375}
          height={619}
          className="absolute top-0 left-1/2 z-0 h-[619px] w-full -translate-x-1/2 object-cover"
          priority
        />
      </div>

      {/*Mobile Mode*/}
      <div className="flex justify-center py-8 md:hidden">
        <SamplePackHeroCard />
      </div>
    </>
  );
};

export default TrySamplePackHero;
