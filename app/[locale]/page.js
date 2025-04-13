import Hero from '@/components/Hero';
import ExploreTheSpectrum from '@/components/containers/ExploreTheSpectrum';
import ExploreTerpeneGuide from '@/components/containers/ExploreTerpeneGuide';
import QualityPromise from '@/components/containers/QualityPromise';

export default function Home() {
  return (
    <div className="">
      <Hero />
      <ExploreTheSpectrum />
      <ExploreTerpeneGuide />
      <QualityPromise />
    </div>
  );
}
