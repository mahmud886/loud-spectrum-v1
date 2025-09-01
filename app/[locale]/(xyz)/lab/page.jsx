import TransitionAnimation from '@/components/containers/TransitionAnimation';
import BehindTheProccess from '@/components/containers/the-lab/BehindTheProccess';
import IngradientQualityPromise from '@/components/containers/the-lab/IngradientQualityPromise';

const LabPage = () => {
  return (
    <div>
      <TransitionAnimation />
      <BehindTheProccess />
      <IngradientQualityPromise />
    </div>
  );
};

export default LabPage;
