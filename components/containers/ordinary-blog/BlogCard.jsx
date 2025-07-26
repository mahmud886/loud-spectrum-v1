import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/helpers/get-formated-date';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const BlogCard = ({ blog }) => {
  return (
    <div className="group flex flex-col space-y-6">
      <div className="relative">
        <div>
          <div className="overflow-hidden">
            <Link href={`/blog/${blog?._id}`} className="group w-full">
              <div className="h-[380px] w-[413px]">
                <Image
                  src={
                    blog?.image
                      ? `${process.env.NEXT_PUBLIC_API_URL}/public${blog?.image}`
                      : '/assets/images/blog/single-blog.png'
                  }
                  alt={blog?.alt_tag || blog?.title || 'blog-image-featuted'}
                  width={413}
                  height={380}
                  className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
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
        <div className="flex items-start justify-between">
          <div className="flex max-w-[80%] flex-wrap items-center gap-2">
            {blog?.tags?.split(',').map((tag, idx) => (
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
            {blog?.created_at ? formatDate(blog.created_at) : ''}
          </p>
        </div>
      </div>
      <Link href={`/blog/${blog?._id}`} className="group w-full">
        <h2 className="text-umbra-100 group-hover:text-umbra-40 font-sans text-[18px] leading-[130%] font-normal tracking-normal transition-colors duration-300 md:text-[22px]">
          {blog?.title}
        </h2>
      </Link>
    </div>
  );
};

export default BlogCard;
