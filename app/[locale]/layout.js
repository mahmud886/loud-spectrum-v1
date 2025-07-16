import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import { routing } from '@/i18n/routing';
import { adelphiSans, neueHaasUnicaW1GMono } from '@/lib/fonts';
import { ReduxProvider } from '@/lib/providers/ReduxProvider';
import { ToastProvider } from '@/lib/providers/ToastProvider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import '../../styles/globals.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

  return {
    metadataBase: new URL(websiteUrl),
    title: {
      default: 'Loud Spectrum - Premium Terpene Products',
      template: '%s | Loud Spectrum',
    },
    description:
      'Discover premium terpene products for enhanced flavor and experience. Shop high-quality, lab-tested terpenes with free shipping on orders over $50.',
    keywords: [
      'terpenes',
      'terpene products',
      'premium terpenes',
      'cannabis terpenes',
      'terpene shop',
      'terpene extracts',
      'terpene isolates',
      'terpene blends',
      'terpene profiles',
      'terpene flavors',
    ].join(', '),
    authors: [{ name: 'Loud Spectrum' }],
    creator: 'Loud Spectrum',
    publisher: 'Loud Spectrum',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      siteName: 'Loud Spectrum',
      locale: locale,
      url: websiteUrl,
      title: 'Loud Spectrum - Premium Terpene Products',
      description:
        'Discover premium terpene products for enhanced flavor and experience. Shop high-quality, lab-tested terpenes with free shipping on orders over $50.',
      images: [
        {
          url: `${websiteUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Loud Spectrum - Premium Terpene Products',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Loud Spectrum - Premium Terpene Products',
      description:
        'Discover premium terpene products for enhanced flavor and experience. Shop high-quality, lab-tested terpenes with free shipping on orders over $50.',
      creator: '@loudspectrum',
      site: '@loudspectrum',
      images: [`${websiteUrl}/images/twitter-image.jpg`],
    },
    alternates: {
      canonical: websiteUrl,
      languages: {
        'en-US': `${websiteUrl}/en`,
        'es-ES': `${websiteUrl}/es`,
        'fr-FR': `${websiteUrl}/fr`,
        'de-DE': `${websiteUrl}/de`,
        'ja-JP': `${websiteUrl}/ja`,
        'ru-RU': `${websiteUrl}/ru`,
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
    manifest: '/manifest.json',
    icons: {
      icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
      apple: [{ url: '/apple-icon.png' }],
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Generate structured data for the organization
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': websiteUrl,
    name: 'Loud Spectrum',
    url: websiteUrl,
    logo: `${websiteUrl}/images/logo.png`,
    sameAs: [
      'https://www.facebook.com/loudspectrum',
      'https://www.instagram.com/loudspectrum',
      'https://twitter.com/loudspectrum',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Russian'],
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`bg-white-100 ${adelphiSans.variable} ${neueHaasUnicaW1GMono.variable} antialiased`}>
        <ReduxProvider>
          <ToastProvider />
          <ScrollToTop>
            <NextIntlClientProvider>
              <NextTopLoader
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                color="var(--primary)"
                showSpinner={false}
              />
              <Navbar locale={locale} />
              {children}
              <Footer locale={locale} />
            </NextIntlClientProvider>
          </ScrollToTop>
        </ReduxProvider>
      </body>
    </html>
  );
}
