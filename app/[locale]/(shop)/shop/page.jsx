import ShopQualityPromise from '@/components/containers/shop/ShopQualityPromise';
import TerpeneProductsContainer from '@/components/containers/shop/TerpeneProductsContainer';
import { getCategories } from '@/services/get-categories';
import { getCategoryProducts } from '@/services/get-category-products';
import ShopHero from '@/components/headers/ShopHero';
const ShopPage = async () => {
  const categories = await getCategories();
  const categoryProducts = await getCategoryProducts('all');
  return (
    <>
      <ShopHero />
      <TerpeneProductsContainer categories={categories?.data?.categories} categoryProducts={categoryProducts?.data} />
      <div className="container pt-20 pb-[160px]">
        <ShopQualityPromise />
      </div>
    </>
  );
};

export default ShopPage;
