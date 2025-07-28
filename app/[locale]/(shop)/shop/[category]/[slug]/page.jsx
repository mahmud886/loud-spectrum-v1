import SpectrumAccordion from '@/components/containers/SpectrumAccordion';
import SpectrumAccordionShimmer from '@/components/containers/SpectrumAccordionShimmer';
import AddAReview from '@/components/containers/product/AddAReview';
import AddAReviewShimmer from '@/components/containers/product/AddAReviewShimmer';
import ProductReviews from '@/components/containers/product/ProductReviews';
import ProductReviewsShimmer from '@/components/containers/product/ProductReviewsShimmer';
import RelatedProducts from '@/components/containers/product/RelatedProducts';
import RelatedProductsShimmer from '@/components/containers/product/RelatedProductsShimmer';
import { getProductDetails } from '@/services/get-product-details';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Async component for spectrum accordion
async function SpectrumAccordionContent({ productDetails }) {
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

  return <SpectrumAccordion items={accordionData} />;
}

// Async component for product reviews
async function ProductReviewsContent({ productId }) {
  return <ProductReviews productId={productId} />;
}

// Async component for add a review
async function AddAReviewContent({ productId, authToken }) {
  return <AddAReview productId={productId} authToken={authToken} />;
}

// Async component for related products
async function RelatedProductsContent({ productDetails }) {
  return <RelatedProducts productDetails={productDetails} />;
}

// Main async component that fetches product data
async function ProductDetailsContent({ params }) {
  const { slug } = await params;

  // Validate the product (category is already validated in layout)
  const productDetails = await getProductDetails(slug);
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');

  // Check for API errors or not found responses for product
  if (!productDetails || productDetails.error || productDetails.notFound) {
    notFound();
  }

  return (
    <div className="md:mt-[160px]">
      <Suspense fallback={<SpectrumAccordionShimmer />}>
        <SpectrumAccordionContent productDetails={productDetails} />
      </Suspense>

      <Suspense fallback={<ProductReviewsShimmer />}>
        <ProductReviewsContent productId={productDetails._id} />
      </Suspense>

      <Suspense fallback={<AddAReviewShimmer />}>
        <AddAReviewContent productId={productDetails._id} authToken={authToken?.value} />
      </Suspense>

      <Suspense fallback={<RelatedProductsShimmer />}>
        <RelatedProductsContent productDetails={productDetails} />
      </Suspense>
    </div>
  );
}

const ProductDetailsPage = async ({ params }) => {
  return (
    <Suspense
      fallback={
        <div className="md:mt-[160px]">
          <SpectrumAccordionShimmer />
          <ProductReviewsShimmer />
          <AddAReviewShimmer />
          <RelatedProductsShimmer />
        </div>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
};

export default ProductDetailsPage;
