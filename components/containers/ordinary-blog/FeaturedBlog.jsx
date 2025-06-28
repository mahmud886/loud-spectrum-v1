import { formatDate } from '@/helpers/get-formated-date';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const FeaturedBlog = ({ featuredBlog }) => {
  // Format date to be more readable

  // Get the image URL - use the actual image from blog data or fallback
  const imageUrl = featuredBlog?.image || '/assets/images/blog/blog-image-featuted.png';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const fullImageUrl =
    featuredBlog?.image && !featuredBlog.image.startsWith('http') ? `${baseUrl}${featuredBlog.image}` : imageUrl;

  return (
    <>
      <div className="group flex flex-col justify-between space-y-6">
        <div className="relative overflow-hidden">
          <Link href={`/blog/${featuredBlog?._id}`} className="group w-full">
            <Image
              // src={fullImageUrl}
              src="/assets/images/blog/blog-image-featuted.png"
              alt={featuredBlog?.alt_tag || featuredBlog?.title || 'blog-image-featured'}
              width={685}
              height={380}
              className="h-[380px] w-full transform object-cover transition-transform duration-500 group-hover:scale-110 md:w-[685px]"
            />
          </Link>
          <div className="absolute top-[8%] right-[5%]">
            <Link
              href={`/blog/${featuredBlog?._id}`}
              className="outline-button-black !md:text-[17px] cursor-pointer rounded-full px-3 py-1 !text-[14px] md:px-6 md:py-2"
            >
              Read More
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="main-button-black border-umbra-100 !md:text-[16px] rounded-md border-1 px-2 py-1 !text-[14px] md:px-4 md:py-2">
                Featured
              </button>
              <button className="outline-button-white !md:text-[16px] !bg-white-100 border-umbra-100 rounded-sm border-1 px-2 py-0 !text-[14px] md:px-4 md:py-2">
                {featuredBlog?.tags}
              </button>
            </div>
            <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
              {featuredBlog?.created_at ? formatDate(featuredBlog.created_at) : ''}
            </p>
          </div>
        </div>
        <Link href={`/blog/${featuredBlog?._id}`} className="group w-full">
          <h2 className="text-umbra-100 group-hover:text-umbra-40 font-sans text-[18px] leading-[130%] font-normal tracking-normal transition-colors duration-300 md:text-[28px]">
            {featuredBlog?.title}
          </h2>
        </Link>
      </div>

      <div className="center mt-10 flex w-full items-center justify-between pb-0 md:hidden">
        <Link
          href={`/blog/${featuredBlog?._id}`}
          className="main-button-black border-umbra-100 flex w-full items-center justify-center rounded-full border-1 px-6 py-3 text-[17px]"
        >
          Read featured article
        </Link>
      </div>
    </>
  );
};

export default FeaturedBlog;
