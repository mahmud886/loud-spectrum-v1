export default function robots() {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/checkout/',
        '/account/',
        '/*?*', // Disallow URLs with query parameters
        '/*/print', // Disallow print versions
        '/*/pdf', // Disallow PDF versions
      ],
    },
    sitemap: `${websiteUrl}/sitemap.xml`,
    host: websiteUrl,
  };
}
