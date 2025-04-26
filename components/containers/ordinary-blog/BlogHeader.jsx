import Image from 'next/image';

const BlogHeader = () => {
  return (
    <>
      <div className="flex items-end justify-between pb-6 md:pb-[80px]">
        <div className="flex w-full flex-col gap-4 md:max-w-[70%]">
          <div className="flex gap-2">
            <button className="main-button-black border-umbra-100 !md:text-[16px] rounded-md border-1 px-2 py-1 !text-[14px] md:px-4 md:py-2">
              Featured
            </button>
            <button className="outline-button-white !md:text-[16px] !bg-white-100 border-umbra-100 rounded-sm border-1 px-2 py-0 !text-[14px] md:px-4 md:py-2">
              Tag
            </button>
          </div>
          <h2 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal tracking-normal md:text-[60px]">
            Terpene-Infused Products that You Can Make at Home: Oils, and Candles
          </h2>
        </div>
        <div className="hidden space-y-5 md:block">
          <p className="text-umbra-40 text-[20px] leading-[140%] font-normal">Published</p>
          <p className="text-umbra-100 text-[20px] leading-[140%] font-normal">March 7, 2025</p>
        </div>
      </div>
      <div>
        <Image
          alt="blog"
          src="/assets/images/blog/single-blog1.png"
          width={1280}
          height={631}
          className="h-[400px] w-full md:h-[631px] md:w-[1280px]"
        />
      </div>
    </>
  );
};

export default BlogHeader;
