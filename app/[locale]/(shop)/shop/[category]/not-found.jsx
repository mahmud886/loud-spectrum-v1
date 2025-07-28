import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function ShopCategoryNotFound() {
  const t = useTranslations('ShopPage');

  return (
    <div className="container mx-auto my-[100px]">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          {t('categoryNotFound.title', { defaultValue: 'Category Not Found' })}
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          {t('categoryNotFound.description', {
            defaultValue: "Sorry, the product category you're looking for doesn't exist or may have been moved.",
          })}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="main-button-black inline-flex items-center rounded-full px-6 py-3 text-base font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('categoryNotFound.backToShop', { defaultValue: 'Back to Shop' })}
          </Link>

          <Link
            href="/contact"
            className="outline-button-white inline-flex items-center rounded-full px-6 py-3 text-base font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('categoryNotFound.contactUs', { defaultValue: 'Contact Us' })}
          </Link>
        </div>

        {/* Explore Other Sections */}
        <div className="mt-12 rounded-lg bg-gray-50 p-6">
          <h3 className="mb-3 text-lg font-medium text-gray-900">
            {t('categoryNotFound.explore.title', { defaultValue: 'Explore Our Shop' })}
          </h3>
          <p className="mb-4 text-gray-600">
            {t('categoryNotFound.explore.description', {
              defaultValue: "While you're here, why not explore our other product categories?",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="text-primary hover:text-primary/80 inline-flex items-center font-medium">
              {t('categoryNotFound.explore.allProducts', { defaultValue: 'All Products' })}
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/blog" className="text-primary hover:text-primary/80 inline-flex items-center font-medium">
              {t('categoryNotFound.explore.blog', { defaultValue: 'Blog' })}
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/about" className="text-primary hover:text-primary/80 inline-flex items-center font-medium">
              {t('categoryNotFound.explore.about', { defaultValue: 'About Us' })}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
