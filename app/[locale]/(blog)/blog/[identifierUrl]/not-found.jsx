import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function BlogNotFound() {
  const t = useTranslations('BlogPage');

  return (
    <div className="container mx-auto mt-[200px] px-4 py-16">
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
          {t('notFound.title', { defaultValue: 'Blog Post Not Found' })}
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          {t('notFound.description', {
            defaultValue: "Sorry, the blog post you're looking for doesn't exist or may have been moved.",
          })}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/blog"
            className="bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('notFound.backToBlog', { defaultValue: 'Back to Blog' })}
          </Link>

          <Link
            href="/"
            className="focus:ring-primary inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {t('notFound.backToHome', { defaultValue: 'Back to Home' })}
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 rounded-lg bg-gray-50 p-6">
          <h3 className="mb-3 text-lg font-medium text-gray-900">
            {t('notFound.searchSuggestion.title', { defaultValue: 'Looking for something specific?' })}
          </h3>
          <p className="mb-4 text-gray-600">
            {t('notFound.searchSuggestion.description', {
              defaultValue:
                "Try browsing our blog categories or use the search function to find what you're looking for.",
            })}
          </p>
          <Link href="/blog" className="text-primary hover:text-primary/80 inline-flex items-center font-medium">
            {t('notFound.searchSuggestion.browseBlog', { defaultValue: 'Browse all blog posts' })}
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
