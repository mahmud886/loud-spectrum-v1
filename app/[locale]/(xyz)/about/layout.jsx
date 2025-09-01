import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

// Structured data for the about page
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${websiteUrl}/about`,
  name: 'About Loud Spectrum',
  description:
    'Learn about Loud Spectrum, our mission, vision, and commitment to delivering the highest quality terpene products. Discover our story, values, and expertise in the terpene industry.',
  url: `${websiteUrl}/about`,
  mainEntity: {
    '@type': 'Organization',
    '@id': websiteUrl,
    name: 'Loud Spectrum',
    url: websiteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${websiteUrl}/assets/svgs/logos/logo-dark.svg`,
    },
    description: 'The best in the terpene business, bar none. Premium quality terpene products and expertise.',
    foundingDate: '2020',
    numberOfEmployees: '11-50',
    industry: 'Terpene Products and Botanical Extracts',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Russian'],
    },
    sameAs: [
      'https://www.facebook.com/loudspectrum',
      'https://www.instagram.com/loudspectrum',
      'https://twitter.com/loudspectrum',
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Premium Terpene Products',
        description: 'High-quality, lab-tested terpene products for enhanced flavor and experience',
      },
    },
  },
  about: [
    {
      '@type': 'Thing',
      name: 'Terpene Innovation',
      description: 'Leading innovation in terpene product development and quality',
    },
    {
      '@type': 'Thing',
      name: 'Quality Standards',
      description: 'Commitment to the highest quality standards in terpene production',
    },
    {
      '@type': 'Thing',
      name: 'Customer Experience',
      description: 'Dedicated to providing exceptional customer experience and education',
    },
  ],
};

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    title: 'About Us - Loud Spectrum | Premium Terpene Products',
    description:
      'Learn about Loud Spectrum, our mission, vision, and commitment to delivering the highest quality terpene products. Discover our story, values, and expertise in the terpene industry.',
    keywords: [
      'about loud spectrum',
      'terpene company',
      'premium terpenes',
      'terpene expertise',
      'quality terpenes',
      'terpene innovation',
      'botanical extracts',
      'flavor science',
      'terpene research',
      'company mission',
      'terpene industry leader',
      'quality standards',
      'customer service',
      'terpene education',
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
      title: 'About Us - Loud Spectrum | Premium Terpene Products',
      description:
        'Learn about Loud Spectrum, our mission, vision, and commitment to delivering the highest quality terpene products. The best in the terpene business, bar none.',
      type: 'website',
      url: `${websiteUrl}/about`,
      siteName: 'Loud Spectrum',
      locale: locale,
      images: [
        {
          url: `${websiteUrl}/assets/images/about-us/about-hero.png`,
          width: 1440,
          height: 771,
          alt: 'About Loud Spectrum - Premium Terpene Products',
        },
        {
          url: `${websiteUrl}/assets/images/about-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Loud Spectrum - About Our Company',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Us - Loud Spectrum | Premium Terpene Products',
      description:
        'Learn about Loud Spectrum, our mission, vision, and commitment to delivering the highest quality terpene products.',
      creator: '@loudspectrum',
      site: '@loudspectrum',
      images: [`${websiteUrl}/assets/images/about-twitter.jpg`],
    },
    alternates: {
      canonical: `${websiteUrl}/about`,
      languages: {
        'en-US': `${websiteUrl}/en/about`,
        'es-ES': `${websiteUrl}/es/about`,
        'fr-FR': `${websiteUrl}/fr/about`,
        'de-DE': `${websiteUrl}/de/about`,
        'ja-JP': `${websiteUrl}/ja/about`,
        'ru-RU': `${websiteUrl}/ru/about`,
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
    category: 'Company',
    classification: 'About Page',
    other: {
      'business:contact_data:street_address': 'Contact us for address information',
      'business:contact_data:locality': 'United States',
      'business:contact_data:country_name': 'United States',
    },
  };
}

const AboutLayout = async ({ children, params }) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <div>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </div>
  );
};

export default AboutLayout;
