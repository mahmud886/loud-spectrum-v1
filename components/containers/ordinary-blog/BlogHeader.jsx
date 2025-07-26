import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/helpers/get-formated-date';
import Image from 'next/image';

const BlogHeader = ({ blogData }) => {
  return (
    <>
      <div className="flex items-end justify-between pb-6 md:pb-[80px]">
        <div className="flex w-full flex-col gap-4 md:max-w-[70%]">
          <div className="flex flex-wrap items-center gap-2">
            <button className="main-button-black border-umbra-100 !md:text-[16px] rounded-md border-1 px-2 py-1 !text-[14px] md:px-4 md:py-2">
              {blogData.status}
            </button>
            {blogData.tags && (
              <>
                {blogData?.tags?.split(',').map((tag, idx) => (
                  <Badge
                    variant="outline"
                    key={idx}
                    className="!bg-white-100 border-umbra-100 h-[30px] rounded-sm border-1 px-2 py-0 !text-[12px] font-normal md:h-[38px] md:px-4"
                  >
                    {tag.trim()}
                  </Badge>
                ))}
              </>
            )}
          </div>
          <h1 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal tracking-normal md:text-[60px]">
            {blogData.title}
          </h1>
        </div>
        <div className="hidden space-y-5 md:block">
          <p className="text-umbra-40 text-[20px] leading-[140%] font-normal">Published</p>
          <p className="text-umbra-100 text-[20px] leading-[140%] font-normal">{formatDate(blogData.created_at)}</p>
        </div>
      </div>
      <div className="relative h-[400px] w-full md:h-[631px] md:w-[1280px]">
        {blogData.image && (
          <Image
            alt={blogData.title}
            src={
              blogData?.image
                ? `${process.env.NEXT_PUBLIC_API_URL}/public${blogData.image}`
                : '/assets/images/blog/blog-image-featuted.png'
            }
            width={1280}
            height={631}
            className="h-[400px] w-full object-cover md:h-[631px] md:w-[1280px]"
          />
        )}
        {/* Left white box */}
        <div className="absolute bottom-[-1px] left-[-1px] h-[27px] w-[95px] bg-white md:bottom-0 md:left-0 md:block md:h-[105px] md:w-[363px]"></div>
        {/* Right white box */}
        <div className="absolute right-[-1px] bottom-[-1px] h-[27px] w-[56px] bg-white md:right-0 md:bottom-0 md:block md:h-[105px] md:w-[217px]"></div>
      </div>
    </>
  );
};

export default BlogHeader;
