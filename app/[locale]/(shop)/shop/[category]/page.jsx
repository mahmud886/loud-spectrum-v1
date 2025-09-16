import ShopQualityPromise from '@/components/containers/shop/ShopQualityPromise';
import ShopQualityPromiseShimmer from '@/components/containers/shop/ShopQualityPromiseShimmer';
import TerpeneProductsContainer from '@/components/containers/shop/TerpeneProductsContainer';
import TerpeneProductsContainerShimmer from '@/components/containers/shop/TerpeneProductsContainerShimmer';
import ShopHero from '@/components/headers/ShopHero';
import ShopHeroShimmer from '@/components/headers/ShopHeroShimmer';
import { decodeCategoryFromUrl } from '@/helpers/url-category-utils';
import { getCategories } from '@/services/get-categories';
import { getProductTypes } from '@/services/get-product-types';
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

  // Handle "all" category specially for metadata
  const isAllCategory = decodedCategory === 'all';
  const categoryName = isAllCategory ? 'All Products' : decodedCategory;
  const categoryUrl = isAllCategory ? `${websiteUrl}/shop/all` : `${websiteUrl}/shop/${decodedCategory}`;

  return {
    title: isAllCategory
      ? 'All Products | Loud Spectrum - Premium Terpene Products'
      : `${categoryName?.toUpperCase()} | Loud Spectrum - Premium Terpene Products`,
    description: isAllCategory
      ? 'Discover our complete collection of premium terpene products. Shop high-quality, lab-tested terpenes for enhanced flavor and experience. Free shipping on orders over $50.'
      : `Explore our premium ${categoryName.toLowerCase()} terpene products. Shop high-quality, lab-tested terpenes for enhanced flavor and experience. Free shipping on orders over $50.`,
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
      title: isAllCategory
        ? 'All Products | Loud Spectrum - Premium Terpene Products'
        : `${categoryName?.toUpperCase()} | Loud Spectrum - Premium Terpene Products`,
      description: isAllCategory
        ? 'Discover our complete collection of premium terpene products. Shop high-quality, lab-tested terpenes for enhanced flavor and experience. Free shipping on orders over $50.'
        : `Explore our premium ${categoryName?.toLowerCase()} terpene products. Shop high-quality, lab-tested terpenes for enhanced flavor and experience. Free shipping on orders over $50.`,
      type: 'website',
      url: categoryUrl,
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
      title: isAllCategory
        ? 'All Products | Loud Spectrum - Premium Terpene Products'
        : `${categoryName?.toUpperCase()} | Loud Spectrum - Premium Terpene Products`,
      description: isAllCategory
        ? 'Discover our complete collection of premium terpene products. Shop high-quality, lab-tested terpenes for enhanced flavor and experience. Free shipping on orders over $50.'
        : `Explore our premium ${categoryName?.toLowerCase()} terpene products. Shop high-quality, lab-tested terpenes for enhanced flavor and experience. Free shipping on orders over $50.`,
      creator: '@loudspectrum',
      images: [`${websiteUrl}/images/shop-twitter-image.jpg`],
    },
    alternates: {
      canonical: categoryUrl,
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

// Async component for a shop hero with category
async function ShopHeroContent({ category }) {
  return <ShopHero category={category} />;
}

// Async component for terpene products container with category
async function TerpeneProductsContainerContent({ categoryId, categories, productTypes, isProductType }) {
  return (
    <TerpeneProductsContainer
      categories={categories}
      categoryId={categoryId}
      productTypes={productTypes}
      isProductType={isProductType}
    />
  );
}

// Async component for shop quality promise
async function ShopQualityPromiseContent() {
  return <ShopQualityPromise />;
}

// Main async part that fetches category data
async function CategoryShopContent({ params }) {
  const { category } = await params;
  const decodedCategory = await decodeCategoryFromUrl(category);
  const [categories, productTypes] = await Promise.all([getCategories(), getProductTypes()]);

  const activeCategories = categories.data.categories.filter((category) => category.status === 'Active') || [];

  const activeProductTypes =
    productTypes?.data
      ?.filter((productType) => productType.status === 'Active' && productType.is_deleted === false)
      .map((productType) => ({
        name: productType.name,
        slug: productType.slug || productType.name,
        _id: productType._id,
        productCount: productType?.productCount || 0,
      })) || [];

  let isProductType = { type: false, name: null, slug: null, _id: null };
  for (const productType of activeProductTypes) {
    if (productType.name === decodedCategory || productType.slug === decodedCategory) {
      isProductType = { type: true, name: productType.name, slug: productType.slug, _id: productType._id };
      break;
    }
  }

  // Handle "all" category specially - it's not a real category but a filter
  if (decodedCategory === 'all') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

        <Suspense fallback={<ShopHeroShimmer />}>
          <ShopHeroContent category={{ name: 'All Products', slug: 'all' }} />
        </Suspense>

        <Suspense fallback={<TerpeneProductsContainerShimmer />}>
          <TerpeneProductsContainerContent
            categories={activeCategories}
            categoryId="all"
            isProductType={isProductType || { type: false, name: null, slug: null, _id: null }}
            productTypes={activeProductTypes || []}
          />
        </Suspense>

        <div className="container pt-20 pb-[160px]">
          <Suspense fallback={<ShopQualityPromiseShimmer />}>
            <ShopQualityPromiseContent />
          </Suspense>
        </div>
      </>
    );
  }

  // For real categories, find the exact category
  const exactCategory = activeCategories.find((category) => category.slug === decodedCategory);

  // Check if category exists, if not show 404
  if (!exactCategory && !isProductType?.type) {
    notFound();
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Suspense fallback={<ShopHeroShimmer />}>
        <ShopHeroContent category={exactCategory} />
      </Suspense>

      <Suspense fallback={<TerpeneProductsContainerShimmer />}>
        <TerpeneProductsContainerContent
          categories={activeCategories}
          categoryId={exactCategory?._id}
          isProductType={isProductType || { type: false, name: null, slug: null, _id: null }}
          productTypes={activeProductTypes || []}
        />
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
