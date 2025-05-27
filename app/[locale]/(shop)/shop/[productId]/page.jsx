import SpectrumAccordion from '@/components/containers/SpectrumAccordion';
import AddAReview from '@/components/containers/product/AddAReview';
import ProductReviews from '@/components/containers/product/ProductReviews';
import RelatedProducts from '@/components/containers/product/RelatedProducts';
import { getProductDetails } from '@/services/get-product-details';

const ProductDetailsPage = async ({ params }) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);
  return (
    <div className="md:mt-[160px]">
      <SpectrumAccordion items={accordionData} />
      <ProductReviews productId={productId} />
      <AddAReview productId={productId} />
      <RelatedProducts />
    </div>
  );
};

export default ProductDetailsPage;

const accordionData = [
  {
    title: 'About the Product',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'Features & Benefits',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'How to Use',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'Details',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'Certificate of Analysis',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
];
