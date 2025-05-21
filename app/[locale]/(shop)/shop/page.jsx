import ShopQualityPromise from '@/components/containers/shop/ShopQualityPromise';
import TerpeneProductsContainer from '@/components/containers/shop/TerpeneProductsContainer';
import ShopHero from '@/components/headers/ShopHero';
import { getCategories } from '@/services/get-categories';
import { getCategoryProducts } from '@/services/get-category-products';

const ShopPage = async () => {
  const [categories, categoryProducts] = await Promise.all([getCategories(), getCategoryProducts('all')]);

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
