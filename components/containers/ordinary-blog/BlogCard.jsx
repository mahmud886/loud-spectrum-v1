import { formatDate } from '@/helpers/get-formated-date';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const BlogCard = ({ blog }) => {
  const imageUrl = blog?.image || '/assets/images/blog/single-blog.png';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const fullImageUrl = blog?.image && !blog.image.startsWith('http') ? `${baseUrl}${blog.image}` : imageUrl;

  return (
    <div className="group flex flex-col justify-between space-y-6">
      <div className="relative">
        <div>
          <div className="overflow-hidden">
            <Link href={`/blog/${blog?._id}`} className="group w-full">
              <Image
                // src={fullImageUrl}
                src="/assets/images/blog/single-blog.png"
                alt={blog?.alt_tag || blog?.title || 'blog-image-featuted'}
                width={413}
                height={380}
                className="block h-auto w-[413px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Link>
          </div>
          <div className="absolute top-[8%] right-[5%]">
            <Link
              href={`/blog/${blog?._id}`}
              className="outline-button-black !md:text-[17px] cursor-pointer rounded-full px-3 py-1 !text-[14px] md:px-6 md:py-2"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button className="outline-button-white !md:text-[16px] !bg-white-100 border-umbra-100 rounded-sm border-1 px-2.5 py-1 !text-[14px] md:px-4 md:py-2">
              {blog?.tags || 'Tag'}
            </button>
            <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">
              {blog?.created_at ? formatDate(blog.created_at) : ''}
            </p>
          </div>
        </div>
      </div>
      <Link href={`/blog/${blog?._id}`} className="group w-full">
        <h2 className="text-umbra-100 group-hover:text-umbra-40 font-sans text-[18px] leading-[130%] font-normal tracking-normal transition-colors duration-300 md:text-[28px]">
          {blog?.title}
        </h2>
      </Link>
    </div>
  );
};

export default BlogCard;
