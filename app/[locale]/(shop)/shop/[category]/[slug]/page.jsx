import SpectrumAccordion from '@/components/containers/SpectrumAccordion';
import AddAReview from '@/components/containers/product/AddAReview';
import ProductReviews from '@/components/containers/product/ProductReviews';
import RelatedProducts from '@/components/containers/product/RelatedProducts';
import { getProductDetails } from '@/services/get-product-details';
import { cookies } from 'next/headers';

const ProductDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const productDetails = await getProductDetails(slug);
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');

  const accordionData = [
    {
      title: 'About the Product',
      description: productDetails?.meta_description,
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
      description: productDetails?.description,
    },
    {
      title: 'Certificate of Analysis',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    },
  ];

  return (
    <div className="md:mt-[160px]">
      <SpectrumAccordion items={accordionData} />
      <ProductReviews productId={productDetails?._id} />
      <AddAReview productId={productDetails?._id} authToken={authToken?.value} />
      <RelatedProducts productDetails={productDetails} />
    </div>
  );
};

export default ProductDetailsPage;
