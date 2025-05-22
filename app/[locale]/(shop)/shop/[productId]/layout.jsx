import ProductDetailsHero from '@/components/headers/ProductDetailsHero';
import { getProductDetails } from '@/services/get-product-details';

const ProductDetailsLayout = async ({ children, params }) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);

  return (
    <div className="">
      <ProductDetailsHero product={productDetails} />
      <main>{children}</main>
    </div>
  );
};

export default ProductDetailsLayout;
