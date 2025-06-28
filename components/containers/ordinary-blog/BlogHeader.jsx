import { formatDate } from '@/helpers/get-formated-date';
import Image from 'next/image';

const BlogHeader = ({ blogData }) => {
  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-end justify-between pb-6 md:pb-[80px]">
        <div className="flex w-full flex-col gap-4 md:max-w-[70%]">
          <div className="flex gap-2">
            <button className="main-button-black border-umbra-100 !md:text-[16px] rounded-md border-1 px-2 py-1 !text-[14px] md:px-4 md:py-2">
              {blogData.status}
            </button>
            {blogData.tags && (
              <button className="outline-button-white !md:text-[16px] !bg-white-100 border-umbra-100 rounded-sm border-1 px-2 py-0 !text-[14px] md:px-4 md:py-2">
                {blogData.tags}
              </button>
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
      <div>
        {blogData.image && (
          <Image
            alt={blogData.title}
            // src={blogData.image}
            src="/assets/images/blog/single-blog.png"
            width={1280}
            height={631}
            className="h-[400px] w-full object-cover md:h-[631px] md:w-[1280px]"
          />
        )}
      </div>
    </>
  );
};

export default BlogHeader;
