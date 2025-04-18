import SpectrumAccordion from '@/components/containers/SpectrumAccordion';
import ProductReviews from '@/components/containers/product/ProductReviews';
import AddAReview from '@/components/containers/product/AddAReview';
import RelatedProducts from '@/components/containers/product/RelatedProducts';

const ProductDetailsPage = () => {
  return (
    <div>
      <SpectrumAccordion items={accordionData} />
      <ProductReviews />
      <AddAReview />
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
