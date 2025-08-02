import TrySamplePackHero from '@/components/headers/TrySamplePackHero';
import { getCategories } from '@/services/get-categories';

const ProductDetailsLayout = async ({ children }) => {
  const categories = await getCategories();

  const samplePackCategory = categories?.data?.categories?.filter((category) => category.name.includes('Sample Pack'));
  return (
    <div className="">
      <TrySamplePackHero samplePackCategory={samplePackCategory} />
      <main>{children}</main>
    </div>
  );
};

export default ProductDetailsLayout;
