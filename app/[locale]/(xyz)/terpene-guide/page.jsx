import PickYourPace from '@/components/containers/terpene-guide/PickYourPace';
import WhatAreTerpenes from '@/components/containers/terpene-guide/WhatAreTerpenes';
import WhatAreTerpenesMobile from '@/components/containers/terpene-guide/WhatAreTerpenesMobile';
import WhatAreTerpenesSlider from '@/components/containers/terpene-guide/WhatAreTerpenesSlider';
import TerpeneGuideHero from '@/components/headers/TerpeneGuideHero';

const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

// Structured data for the terpene guide page
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${websiteUrl}/terpene-guide`,
  headline: 'Complete Guide to Terpenes - Understanding Flavor and Effects',
  description:
    'Learn everything about terpenes, their effects, and how they enhance flavor profiles. Discover the science behind terpenes and find your perfect match.',
  url: `${websiteUrl}/terpene-guide`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${websiteUrl}/terpene-guide`,
  },
  image: [
    {
      '@type': 'ImageObject',
      url: `${websiteUrl}/assets/images/terpene-guide-hero.jpeg`,
      width: 1920,
      height: 689,
    },
  ],
  author: {
    '@type': 'Organization',
    name: 'Loud Spectrum',
    url: websiteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Loud Spectrum',
    logo: {
      '@type': 'ImageObject',
      url: `${websiteUrl}/assets/svgs/logos/logo-dark.svg`,
    },
  },
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  articleSection: 'Education',
  keywords: [
    'terpenes',
    'terpene guide',
    'terpene effects',
    'terpene profiles',
    'cannabis terpenes',
    'flavor science',
    'aromatic compounds',
    'terpene education',
    'natural terpenes',
    'terpene benefits',
  ],
  about: [
    {
      '@type': 'Thing',
      name: 'Terpenes',
      description: 'Aromatic compounds found in many plants that contribute to flavor and potential effects',
    },
    {
      '@type': 'Thing',
      name: 'Flavor Science',
      description: 'The scientific study of how aromatic compounds contribute to taste and experience',
    },
  ],
  mentions: [
    {
      '@type': 'Product',
      name: 'Terpene Products',
      description: 'Premium quality terpene products for enhanced flavor experiences',
    },
  ],
};

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    title: 'Terpene Guide - Complete Guide to Terpenes | Loud Spectrum',
    description:
      'Learn everything about terpenes, their effects, and how they enhance flavor profiles. Discover the science behind terpenes, different terpene types, and find your perfect match with our comprehensive guide.',
    keywords: [
      'terpene guide',
      'what are terpenes',
      'terpene effects',
      'terpene profiles',
      'cannabis terpenes',
      'natural terpenes',
      'terpene science',
      'aromatic compounds',
      'flavor enhancement',
      'terpene education',
      'terpene benefits',
      'terpene types',
      'terpene isolates',
      'terpene blends',
    ].join(', '),
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
      title: 'Terpene Guide - Complete Guide to Terpenes | Loud Spectrum',
      description:
        'Learn everything about terpenes, their effects, and how they enhance flavor profiles. Discover the science behind terpenes and find your perfect match.',
      type: 'article',
      url: `${websiteUrl}/terpene-guide`,
      siteName: 'Loud Spectrum',
      locale: locale,
      images: [
        {
          url: `${websiteUrl}/assets/images/terpene-guide-hero.jpeg`,
          width: 1920,
          height: 689,
          alt: 'Loud Spectrum Terpene Guide - Learn About Terpenes',
        },
        {
          url: `${websiteUrl}/assets/images/terpene-guide-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Complete Terpene Guide by Loud Spectrum',
        },
      ],
      article: {
        publishedTime: '2024-01-01T00:00:00.000Z',
        modifiedTime: new Date().toISOString(),
        section: 'Education',
        authors: ['Loud Spectrum'],
        tags: ['terpenes', 'terpene guide', 'education', 'flavor science', 'cannabis', 'natural compounds'],
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Terpene Guide - Complete Guide to Terpenes | Loud Spectrum',
      description:
        'Learn everything about terpenes, their effects, and how they enhance flavor profiles. Discover the science behind terpenes.',
      creator: '@loudspectrum',
      site: '@loudspectrum',
      images: [`${websiteUrl}/assets/images/terpene-guide-twitter.jpg`],
    },
    alternates: {
      canonical: `${websiteUrl}/terpene-guide`,
      languages: {
        'en-US': `${websiteUrl}/en/terpene-guide`,
        'es-ES': `${websiteUrl}/es/terpene-guide`,
        'fr-FR': `${websiteUrl}/fr/terpene-guide`,
        'de-DE': `${websiteUrl}/de/terpene-guide`,
        'ja-JP': `${websiteUrl}/ja/terpene-guide`,
        'ru-RU': `${websiteUrl}/ru/terpene-guide`,
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
    category: 'Education',
    classification: 'Educational Content',
    other: {
      'article:section': 'Education',
      'article:tag': 'Terpenes, Education, Flavor Science',
    },
  };
}

const TerpeneGuidePage = () => {
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <TerpeneGuideHero />
      <WhatAreTerpenes />
      <div className="block md:block lg:hidden xl:hidden">
        <WhatAreTerpenesMobile />
      </div>
      <div className="hidden lg:block xl:block">
        <WhatAreTerpenesSlider />
      </div>
      {/*<WhatAreTerpeneCarousel />*/}
      <PickYourPace />
    </>
  );
};

export default TerpeneGuidePage;
