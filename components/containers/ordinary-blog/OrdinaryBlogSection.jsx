import BlogCard from '@/components/containers/ordinary-blog/BlogCard';
import FeaturedBlog from '@/components/containers/ordinary-blog/FeaturedBlog';
import SideBlogs from '@/components/containers/ordinary-blog/SideBlogs';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import BlogCardShimmer from './BlogCardShimmer';
import BlogFilter from './BlogFilter';
import FeaturedBlogShimmer from './FeaturedBlogShimmer';
import SideBlogsShimmer from './SideBlogsShimmer';

const OrdinaryBlogSection = ({ blogs }) => {
  const t = useTranslations('BlogPage');

  // Validate blogs data
  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return (
      <div className="mb-[100px]">
        <div className="my-10 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t('content.noBlogsAvailable.title')}</h2>
          <p className="mb-8 text-gray-600">{t('content.noBlogsAvailable.description')}</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {t('content.noBlogsAvailable.backToHome')}
            </Link>
            <Link
              href="/contact"
              className="focus:ring-primary inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {t('content.noBlogsAvailable.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter out invalid blog posts
  const validBlogs = blogs.filter((blog) => blog && blog._id && blog.title);

  if (validBlogs.length === 0) {
    return (
      <div className="mb-[100px]">
        <div className="my-10 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t('content.noValidBlogs.title')}</h2>
          <p className="mb-8 text-gray-600">{t('content.noValidBlogs.description')}</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {t('content.noValidBlogs.backToHome')}
            </Link>
            <Link
              href="/contact"
              className="focus:ring-primary inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {t('content.noValidBlogs.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-[100px]">
      <div className="my-10 grid grid-cols-1 gap-x-10 xl:grid-cols-[53.52%_42.58%]">
        <Suspense fallback={<FeaturedBlogShimmer />}>
          <FeaturedBlog featuredBlog={validBlogs[0]} />
        </Suspense>
        <div className="">
          <Suspense fallback={<SideBlogsShimmer />}>
            <SideBlogs blogs={validBlogs.slice(1, 4)} />
          </Suspense>
        </div>
      </div>
      <div className="border-1"></div>

      <div className="my-10">
        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row">
          <BlogFilter />
          <p className="text-umbra-10 font-mono text-[16px] font-normal uppercase">
            {validBlogs.length} {t('content.resultsCount')} <span className="text-umbra-100">{t('content.all')}</span>
          </p>
        </div>
      </div>

      <div className="mb-[50px] grid grid-cols-1 gap-6 gap-x-4 xl:grid-cols-3 xl:gap-y-20">
        <Suspense
          fallback={
            <>
              {[...Array(6)].map((_, idx) => (
                <BlogCardShimmer key={idx} />
              ))}
            </>
          }
        >
          {validBlogs.map((blog) => (
            <BlogCard key={blog?.identifier_url} blog={blog} />
          ))}
        </Suspense>
      </div>
      <div className="border-1"></div>
      {/* <div className="py-16">
        <BlogPagination />
      </div> */}
    </div>
  );
};

export default OrdinaryBlogSection;
