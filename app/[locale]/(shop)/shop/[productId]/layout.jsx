import ProductDetailsHero from '@/components/headers/ProductDetailsHero';
import { getProductDetails } from '@/services/get-product-details';

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = await getProductDetails(productId);

  const title = `${product?.name || 'Product'} | Loud Spectrum`;
  const description = product?.meta_description || 'Check out this amazing product on our store';
  const imageUrl = product?.images?.[0] || '';
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

  return {
    title,
    description,
    keywords: product?.tag?.join(', ') || '',
    alternates: {
      canonical: `${websiteUrl}/shop/${productId}`,
    },
    openGraph: {
      title,
      description,
      url: `${websiteUrl}/shop/${productId}`,
      siteName: 'Loud Spectrum',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: product?.name || 'Product Image',
            },
          ]
        : [],
      // type: 'product',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
      creator: '@loudspectrum',
      site: '@loudspectrum',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

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
