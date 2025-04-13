import Hero from '@/components/Hero';
import ExploreTheSpectrum from '@/components/containers/ExploreTheSpectrum';
import ExploreTerpeneGuide from '@/components/containers/ExploreTerpeneGuide';
import QualityPromise from '@/components/containers/QualityPromise';
import InTheLab from '@/components/containers/InTheLab';
import TransitionAnimation from '@/components/containers/TransitionAnimation';
import ShopByMood from '@/components/containers/ShopByMood';

export default function Home() {
  return (
    <div className="">
      <Hero />
      <ExploreTheSpectrum />
      <ExploreTerpeneGuide />
      <QualityPromise />
      <InTheLab />
      <TransitionAnimation />
      <ShopByMood />
    </div>
  );
}
