import TrySamplePackHero from '@/components/headers/TrySamplePackHero';

const ProductDetailsLayout = ({ children }) => {
  return (
    <div className="">
      <TrySamplePackHero />
      <main>{children}</main>
    </div>
  );
};

export default ProductDetailsLayout;
