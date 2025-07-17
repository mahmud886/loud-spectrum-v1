import NewPageHero from '@/components/headers/NewPageHero';
import { getCategoryProducts } from '@/services/get-category-products';

const NewTerpeneLayout = async ({ children }) => {
  const categoryProducts = await getCategoryProducts('all');
  return (
    <div>
      <NewPageHero categoryProducts={categoryProducts?.data} />
      {children}
    </div>
  );
};

export default NewTerpeneLayout;
