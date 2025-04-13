import Hero from '@/components/Hero';
import ExploreTheSpectrum from '@/components/containers/ExploreTheSpectrum';
import ExploreTerpeneGuide from '@/components/containers/ExploreTerpeneGuide';
import QualityPromise from '@/components/containers/QualityPromise';
import InTheLab from '@/components/containers/InTheLab';

export default function Home() {
  return (
    <div className="">
      <Hero />
      <ExploreTheSpectrum />
      <ExploreTerpeneGuide />
      <QualityPromise />
      <InTheLab />
    </div>
  );
}
