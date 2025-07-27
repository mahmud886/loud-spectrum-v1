import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/helpers/get-formated-date';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const FeaturedBlog = ({ featuredBlog }) => {
  const t = useTranslations('BlogPage');

  // Validate featuredBlog
  if (!featuredBlog || !featuredBlog._id || !featuredBlog.title) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-20">
        <div className="text-center">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">{t('featured.noFeaturedBlog.title')}</h3>
          <p className="text-gray-600">{t('featured.noFeaturedBlog.description')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="group flex flex-col justify-between space-y-6">
        <div className="relative overflow-hidden">
          <Link href={`/blog/${featuredBlog?.identifier_url}`} className="group w-full">
            {/* <Link href={`/blog/${featuredBlog?._id}`} className="group w-full"> */}
            <div className="h-[380px] w-[685px]">
              <Image
                src={
                  featuredBlog?.image
                    ? `${process.env.NEXT_PUBLIC_API_URL}/public${featuredBlog.image}`
                    : '/assets/images/blog/blog-image-featuted.png'
                }
                alt={featuredBlog?.alt_tag || featuredBlog?.title || 'blog-image-featured'}
                width={685}
                height={380}
                className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </Link>
          <div className="absolute top-[8%] right-[5%]">
            <Link
              href={`/blog/${featuredBlog?.identifier_url}`}
              // href={`/blog/${featuredBlog?._id}`}
              className="outline-button-black !md:text-[17px] cursor-pointer rounded-full px-3 py-1 !text-[14px] md:px-6 md:py-2"
            >
              {t('featured.readMore')}
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <div className="flex max-w-[85%] flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="main-button-black border-umbra-100 !md:text-[16px] !max-h-[34px] rounded-md border-1 px-2 py-1 !text-[14px] md:px-4 md:py-2"
              >
                {t('featured.featured')}
              </Badge>
              {featuredBlog?.tags?.split(',').map((tag, idx) => (
                <Badge
                  variant="outline"
                  key={idx}
                  className="!bg-white-100 border-umbra-100 h-[30px] rounded-sm border-1 px-2 py-0 !text-[12px] font-normal md:h-[34px] md:px-4"
                >
                  {tag.trim()}
                </Badge>
              ))}
            </div>
            <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
              {featuredBlog?.created_at ? formatDate(featuredBlog.created_at) : ''}
            </p>
          </div>
        </div>
        <Link href={`/blog/${featuredBlog?.identifier_url}`} className="group w-full">
          {/* <Link href={`/blog/${featuredBlog?._id}`} className="group w-full"> */}
          <h2 className="text-umbra-100 group-hover:text-umbra-40 font-sans text-[18px] leading-[130%] font-normal tracking-normal transition-colors duration-300 md:text-[28px]">
            {featuredBlog?.title}
          </h2>
        </Link>
      </div>

      <div className="center mt-10 flex w-full items-center justify-between pb-0 md:hidden">
        <Link
          href={`/blog/${featuredBlog?.identifier_url}`}
          // href={`/blog/${featuredBlog?._id}`}
          className="main-button-black border-umbra-100 flex w-full items-center justify-center rounded-full border-1 px-6 py-3 text-[17px]"
        >
          {t('featured.readFeaturedArticle')}
        </Link>
      </div>
    </>
  );
};

export default FeaturedBlog;
