import ProductCard from '@/components/product/ProductCard';
import { getCategories } from '@/services/get-categories';
import { getCategoryProducts } from '@/services/get-category-products';
import { getTranslations } from 'next-intl/server';

const RelatedProducts = async ({ productDetails }) => {
  const categories = await getCategories();
  const exactCategory = categories?.data?.categories?.find((category) => category._id === productDetails?.category._id);
  const t = await getTranslations('TerpeneShop');

  let relatedProducts = [];
  if (exactCategory) {
    const products = await getCategoryProducts(exactCategory?._id);
    relatedProducts = products?.data;
  }
  return (
    <div className="container pt-20 pb-20 md:pb-[160px]">
      <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] tracking-normal">{t('RelatedProducts')}</h2>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
        {relatedProducts?.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
