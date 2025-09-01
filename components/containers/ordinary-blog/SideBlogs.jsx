import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/helpers/get-formated-date';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const SideBlogs = ({ blogs }) => {
  const t = useTranslations('BlogPage');

  // Validate blogs array
  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{t('sideBlogs.noRecentPosts.title')}</h3>
          <p className="text-gray-600">{t('sideBlogs.noRecentPosts.description')}</p>
        </div>
      </div>
    );
  }

  // Filter out invalid blog posts
  const validBlogs = blogs.filter((blog) => blog && blog._id && blog.title);

  if (validBlogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{t('sideBlogs.noValidPosts.title')}</h3>
          <p className="text-gray-600">{t('sideBlogs.noValidPosts.description')}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {validBlogs.map((blog, index) => (
        <div key={index} className={`group mt-10 xl:mt-0 ${index !== 0 ? 'border-umbra-40 border-t py-5' : 'pb-5'}`}>
          <div className="flex flex-col items-start gap-5 overflow-hidden bg-white transition-all duration-300 lg:items-center xl:flex-row">
            <Link href={`/blog/${blog?.identifier_url}`} className="w-full overflow-hidden xl:w-[177px]">
              {/* <Link href={`/blog/${blog?._id}`} className="w-full overflow-hidden xl:w-[177px]"> */}
              <div className="h-[380px] w-full lg:h-[150px] lg:w-[177px]">
                <Image
                  width={177}
                  height={150}
                  src={
                    blog?.image
                      ? `${process.env.NEXT_PUBLIC_API_URL}/public${blog?.image}`
                      : '/assets/images/blog/side-blog.png'
                  }
                  alt={blog?.alt_tag || blog?.title || 'blog-image-featuted'}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-115"
                />
              </div>
            </Link>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex flex-col justify-between gap-5">
                <div className="mb-2 flex items-center gap-5">
                  {blog?.tags?.split(',').map((tag, idx) => (
                    <Badge
                      variant="outline"
                      key={idx}
                      className="!bg-white-100 border-umbra-100 h-[18px] rounded-sm border-1 px-2 py-0 !text-[10px] font-normal xl:h-[22px] xl:px-2"
                    >
                      {tag.trim()}
                    </Badge>
                  ))}

                  <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
                    {blog?.created_at ? formatDate(blog.created_at) : ''}
                  </p>
                </div>
                <Link href={`/blog/${blog?.identifier_url}`} className="group w-full">
                  {/* <Link href={`/blog/${blog?._id}`} className="group w-full"> */}
                  <h2 className="text-umbra-100 group-hover:text-umbra-40 font-sans text-[18px] leading-[130%] font-normal tracking-normal transition-colors duration-300 xl:text-[22px]">
                    {blog?.title}
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBlogs;
