import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import { routing } from '@/i18n/routing';
import { adelphiSans, neueHaasUnicaW1GMono } from '@/lib/fonts';
import { ReduxProvider } from '@/lib/providers/ReduxProvider';
import { ToastProvider } from '@/lib/providers/ToastProvider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import '../../styles/globals.css';

const TIDIO_KEY = process.env.NEXT_PUBLIC_TIDIO_KEY;

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
          url: `${websiteUrl}/api/og`,
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
      images: [`${websiteUrl}/api/og`],
    },
    alternates: {
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
      google: 'OiUikAqP3lwMz8PYTIvvQ2wwRwAlXptRobZdKge4NYQ',
      yandex: 'your-yandex-verification',
      bing: 'your-bing-verification',
    },
    manifest: '/manifest.json',
    icons: {
      icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
      apple: [{ url: '/apple-touch-icon.png' }],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
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
    logo: `${websiteUrl}/assets/svgs/logos/logo-dark.svg`,
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
        <meta name="google-site-verification" content="OiUikAqP3lwMz8PYTIvvQ2wwRwAlXptRobZdKge4NYQ" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WQ8K7XPB');`}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script
          id="ga4-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-SR3YV7PRR7"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SR3YV7PRR7');`}
        </Script>
      </head>
      <body className={`bg-white-100 ${adelphiSans.variable} ${neueHaasUnicaW1GMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WQ8K7XPB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ReduxProvider>
          <ToastProvider />
          <ScrollToTop>
            <NextIntlClientProvider locale={locale}>
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
        {/* Tidio Live Chat */}
        {TIDIO_KEY && <Script src={`//code.tidio.co/${TIDIO_KEY}.js`} strategy="lazyOnload" />}
      </body>
    </html>
  );
}
