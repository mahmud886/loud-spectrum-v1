import ProductDetailsHero from '@/components/headers/ProductDetailsHero';

const ProductDetailsLayout = ({ children }) => {
  return (
    <div className="">
      <ProductDetailsHero />
      <main>{children}</main>
    </div>
  );
};

export default ProductDetailsLayout;
