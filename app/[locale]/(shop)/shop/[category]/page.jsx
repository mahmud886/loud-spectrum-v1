import ShopQualityPromise from '@/components/containers/shop/ShopQualityPromise';
import ShopQualityPromiseShimmer from '@/components/containers/shop/ShopQualityPromiseShimmer';
import TerpeneProductsContainer from '@/components/containers/shop/TerpeneProductsContainer';
import TerpeneProductsContainerShimmer from '@/components/containers/shop/TerpeneProductsContainerShimmer';
import ShopHero from '@/components/headers/ShopHero';
import ShopHeroShimmer from '@/components/headers/ShopHeroShimmer';
import { decodeCategoryFromUrl } from '@/helpers/url-category-utils';
import { getCategories } from '@/services/get-categories';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': `${websiteUrl}/shop`,
  name: 'Loud Spectrum Shop',
  description: 'Premium terpene products and accessories',
  url: `${websiteUrl}/shop`,
  logo: `${websiteUrl}/images/logo.png`,
  image: `${websiteUrl}/images/shop-banner.jpg`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Your Street Address',
    addressLocality: 'Your City',
    addressRegion: 'Your State',
    postalCode: 'Your ZIP',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 'YOUR_LATITUDE',
    longitude: 'YOUR_LONGITUDE',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${websiteUrl}/shop?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  sameAs: [
    'https://www.facebook.com/loudspectrum',
    'https://www.instagram.com/loudspectrum',
    'https://twitter.com/loudspectrum',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
  },
};

export async function generateMetadata({ params }) {
  const { category } = await params;

  const decodedCategory = await decodeCategoryFromUrl(category);

  return {
    title: 'Shop | Loud Spectrum - Premium Terpene Products',
    description:
      'Discover our premium collection of terpene products. Shop high-quality, lab-tested terpenes for enhanced flavor and experience. Free shipping on orders over $50.',
    keywords:
      'terpenes, terpene products, premium terpenes, cannabis terpenes, terpene shop, terpene extracts, terpene isolates, terpene blends, terpene profiles, terpene flavors',
    authors: [{ name: 'Loud Spectrum' }],
    creator: 'Loud Spectrum',
    publisher: 'Loud Spectrum',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(websiteUrl),
    openGraph: {
      title: 'Shop | Loud Spectrum - Premium Terpene Products',
      description:
        'Discover our premium collection of terpene products. Shop high-quality, lab-tested terpenes for enhanced flavor and experience. Free shipping on orders over $50.',
      type: 'website',
      url: `${websiteUrl}/shop/${decodedCategory}`,
      siteName: 'Loud Spectrum',
      locale: 'en_US',
      images: [
        {
          url: `${websiteUrl}/images/shop-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Loud Spectrum Shop - Premium Terpene Products',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shop | Loud Spectrum - Premium Terpene Products',
      description:
        'Discover our premium collection of terpene products. Shop high-quality, lab-tested terpenes for enhanced flavor and experience. Free shipping on orders over $50.',
      creator: '@loudspectrum',
      images: [`${websiteUrl}/images/shop-twitter-image.jpg`],
    },
    alternates: {
      canonical: `${websiteUrl}/shop/${decodedCategory}`,
      languages: {
        'en-US': `${websiteUrl}/en/shop/${decodedCategory}`,
        'es-ES': `${websiteUrl}/es/shop/${decodedCategory}`,
        'fr-FR': `${websiteUrl}/fr/shop/${decodedCategory}`,
        'de-DE': `${websiteUrl}/de/shop/${decodedCategory}`,
        'ja-JP': `${websiteUrl}/ja/shop/${decodedCategory}`,
        'ru-RU': `${websiteUrl}/ru/shop/${decodedCategory}`,
      },
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
    verification: {
      google: 'your-google-site-verification',
      yandex: 'your-yandex-verification',
      bing: 'your-bing-verification',
    },
  };
}

// Async component for shop hero with category
async function ShopHeroContent({ category }) {
  return <ShopHero category={category} />;
}

// Async component for terpene products container with category
async function TerpeneProductsContainerContent({ categoryId, categories }) {
  return <TerpeneProductsContainer categories={categories} categoryId={categoryId} />;
}

// Async component for shop quality promise
async function ShopQualityPromiseContent() {
  return <ShopQualityPromise />;
}

// Main async component that fetches category data
async function CategoryShopContent({ params }) {
  const { category } = await params;
  const decodedCategory = await decodeCategoryFromUrl(category);
  const categories = await getCategories();

  // Check for API errors or not found responses
  if (!categories || categories.error || categories.notFound) {
    notFound();
  }

  const activeCategories = categories.data.categories.filter((category) => category.status === 'Active') || [];
  const exactCategory = activeCategories.find((category) => category.slug === decodedCategory);

  // Check if category exists, if not show 404
  if (!exactCategory) {
    notFound();
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Suspense fallback={<ShopHeroShimmer />}>
        <ShopHeroContent category={exactCategory} />
      </Suspense>

      <Suspense fallback={<TerpeneProductsContainerShimmer />}>
        <TerpeneProductsContainerContent categories={activeCategories} categoryId={exactCategory._id} />
      </Suspense>

      <div className="container pt-20 pb-[160px]">
        <Suspense fallback={<ShopQualityPromiseShimmer />}>
          <ShopQualityPromiseContent />
        </Suspense>
      </div>
    </>
  );
}

const CategoryShopPage = async ({ params }) => {
  return (
    <Suspense
      fallback={
        <>
          <ShopHeroShimmer />
          <TerpeneProductsContainerShimmer />
          <div className="container pt-20 pb-[160px]">
            <ShopQualityPromiseShimmer />
          </div>
        </>
      }
    >
      <CategoryShopContent params={params} />
    </Suspense>
  );
};

export default CategoryShopPage;
