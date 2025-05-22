import { getCategories } from '@/services/get-categories';
import { getCategoryProducts } from '@/services/get-category-products';

export default async function sitemap() {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';
  const locales = ['en', 'es', 'fr', 'de', 'ja', 'ru'];
  const currentDate = new Date().toISOString();

  // Get all categories and products
  const [categories, products] = await Promise.all([getCategories(), getCategoryProducts('all')]);

  // Generate static routes
  const staticRoutes = [
    {
      url: websiteUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${websiteUrl}/shop`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${websiteUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Generate localized routes
  const localizedRoutes = locales.flatMap((locale) => [
    {
      url: `${websiteUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${websiteUrl}/${locale}/shop`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${websiteUrl}/${locale}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/${locale}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/${locale}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]);

  // Generate category routes
  const categoryRoutes =
    categories?.data?.categories?.flatMap((category) =>
      locales.map((locale) => ({
        url: `${websiteUrl}/${locale}/shop/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      })),
    ) || [];

  // Generate product routes
  const productRoutes =
    products?.data?.flatMap((product) =>
      locales.map((locale) => ({
        url: `${websiteUrl}/${locale}/shop/${product.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      })),
    ) || [];

  // Combine all routes
  return [...staticRoutes, ...localizedRoutes, ...categoryRoutes, ...productRoutes];
}
