import ProductDetailsHero from '@/components/headers/ProductDetailsHero';
import ProductDetailsHeroShimmer from '@/components/headers/ProductDetailsHeroShimmer';
import { decodeCategoryFromUrl } from '@/helpers/url-category-utils';
import { getCategories } from '@/services/get-categories';
import { getProductDetails } from '@/services/get-product-details';
import { getProductTypes } from '@/services/get-product-types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// export async function generateMetadata({ params }) {
//   const { category, slug } = await params;

//   // First, validate the category
//   const decodedCategory = await decodeCategoryFromUrl(category);
//   const categories = await getCategories();

//   // Check for API errors or not found responses for categories
//   if (!categories || categories.error || categories.notFound) {
//     notFound();
//   }

//   const activeCategories = categories.data.categories.filter((cat) => cat.status === 'Active') || [];
//   const exactCategory = activeCategories.find((cat) => cat.slug === decodedCategory);

//   // Check if category exists, if not show 404
//   if (!exactCategory) {
//     notFound();
//   }

//   // For metadata, we'll try to get the product but won't fail if it doesn't exist
//   // The page component will handle product validation
//   const product = await getProductDetails(slug);

//   // If product doesn't exist, return fallback metadata
//   if (!product || product.error || product.notFound) {
//     return {
//       title: 'Product Not Found | Loud Spectrum',
//       description: 'The requested product could not be found.',
//     };
//   }

//   const title = `${product.name || 'Product'} | Loud Spectrum`;
//   const description = product.meta_description || 'Check out this amazing product on our store';
//   const imageUrl = product.images?.[0] || '';
//   const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

//   return {
//     title,
//     description,
//     keywords: product.tag?.join(', ') || '',
//     alternates: {
//       canonical: `${websiteUrl}/shop/${slug}`,
//       languages: {
//         'en-US': `${websiteUrl}/en/shop/${slug}`,
//         'ja-JP': `${websiteUrl}/ja/shop/${slug}`,
//         'es-ES': `${websiteUrl}/es/shop/${slug}`,
//         'fr-FR': `${websiteUrl}/fr/shop/${slug}`,
//         'de-DE': `${websiteUrl}/de/shop/${slug}`,
//         'ru-RU': `${websiteUrl}/ru/shop/${slug}`,
//       },
//     },
//     openGraph: {
//       title,
//       description,
//       url: `${websiteUrl}/shop/${slug}`,
//       siteName: 'Loud Spectrum',
//       images: imageUrl
//         ? [
//             {
//               url: imageUrl,
//               width: 1200,
//               height: 630,
//               alt: product.name || 'Product Image',
//             },
//           ]
//         : [],
//       // type: 'product',
//       locale: 'en_US',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: imageUrl ? [imageUrl] : [],
//       creator: '@loudspectrum',
//       site: '@loudspectrum',
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         'max-video-preview': -1,
//         'max-image-preview': 'large',
//         'max-snippet': -1,
//       },
//     },
//   };
// }

// Async component for product details hero
async function ProductDetailsHeroContent({ category, slug }) {
  // First, validate the category
  const decodedCategory = await decodeCategoryFromUrl(category);
  const [categories, productTypes] = await Promise.all([getCategories(), getProductTypes()]);

  const activeCategories = categories.data.categories.filter((category) => category.status === 'Active') || [];

  // Check for API errors or not found responses for categories
  if (!categories || categories.error || categories.notFound) {
    notFound();
  }

  // For normal categories, use the existing logic
  const exactCategory = activeCategories.find((cat) => cat.slug === decodedCategory);

  // Check if category exists, if not show 404
  if (!exactCategory) {
    notFound();
  }

  // For the hero component, we'll try to get the product but won't fail if it doesn't exist
  // The page component will handle product validation
  const productDetails = await getProductDetails(slug);

  // If product doesn't exist, return null or a placeholder
  if (!productDetails || productDetails.error || productDetails.notFound) {
    return null; // Let the page component handle the not-found case
  }

  return <ProductDetailsHero product={productDetails} />;
}

const ProductDetailsLayout = async ({ children, params }) => {
  const { category, slug } = await params;

  return (
    <div className="">
      <Suspense fallback={<ProductDetailsHeroShimmer />}>
        <ProductDetailsHeroContent category={category} slug={slug} />
      </Suspense>
      <main>{children}</main>
    </div>
  );
};

export default ProductDetailsLayout;
