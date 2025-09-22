const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

export default {
  defaultTitle: 'Loud Spectrum - Premium Terpene Products',
  titleTemplate: '%s | Loud Spectrum',
  description:
    'Discover premium terpene products for enhanced flavor and experience. Shop high-quality, lab-tested terpenes with free shipping on orders over $50.',
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Loud Spectrum',
    },
    {
      name: 'keywords',
      content:
        'terpenes, terpene products, premium terpenes, cannabis terpenes, terpene shop, terpene extracts, terpene isolates, terpene blends, terpene profiles, terpene flavors',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: websiteUrl,
    siteName: 'Loud Spectrum',
    images: [
      {
        url: `${websiteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: 'Loud Spectrum - Premium Terpene Products',
      },
    ],
  },
  twitter: {
    handle: '@loudspectrum',
    site: '@loudspectrum',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
  additionalMetaTags: [
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ],
  robotsProps: {
    nosnippet: false,
    notranslate: true,
    noimageindex: false,
    noarchive: false,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
};
