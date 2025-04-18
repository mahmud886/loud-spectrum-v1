import Image from 'next/image';
import SamplePackHeroCard from '@/components/containers/try-sample-pack/SamplePackHeroCard';

const TrySamplePackHero = () => {
  return (
    <div className="relative h-[1082px] overflow-hidden bg-black">
      <Image
        src="/assets/images/try-sample-pack-hero.jpeg"
        alt="Background"
        width={1440}
        height={797}
        className="absolute top-0 left-1/2 z-0 h-full w-[1440px] -translate-x-1/2 object-cover"
        priority
      />

      <div className="absolute inset-0 z-10 container h-[987px] w-full overflow-hidden">
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-[40px]">
          <div className="flex w-full items-start justify-between gap-[40px]">
            <SamplePackHeroCard />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 z-20 w-[1440px] -translate-x-1/2">
        <Image
          src="/assets/images/hero-section-mask.png"
          alt="Shop Hero"
          width={1440}
          height={195}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default TrySamplePackHero;
