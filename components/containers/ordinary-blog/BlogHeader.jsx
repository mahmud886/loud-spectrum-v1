import Image from 'next/image';

const BlogHeader = () => {
  return (
    <>
      <div className="flex items-end justify-between pb-[80px]">
        <div className="flex max-w-[70%] flex-col gap-4">
          <div className="flex gap-2">
            <button className="main-button-black border-umbra-100 rounded-md border-1 px-6 py-2 !text-[16px]">
              Featured
            </button>
            <button className="outline-button-white !bg-white-100 border-umbra-100 rounded-sm border-1 px-6 py-2 !text-[16px]">
              Tag
            </button>
          </div>
          <h2 className="text-umbra-100 font-sans text-[60px] leading-[120%] font-normal tracking-normal">
            Terpene-Infused Products that You Can Make at Home: Oils, and Candles
          </h2>
        </div>
        <div className="space-y-5">
          <p className="text-umbra-40 text-[20px] leading-[140%] font-normal">Published</p>
          <p className="text-umbra-100 text-[20px] leading-[140%] font-normal">March 7, 2025</p>
        </div>
      </div>
      <div>
        <Image alt="blog" src="/assets/images/blog/single-blog1.png" width={1000} height={500} className="w-full" />
      </div>
    </>
  );
};

export default BlogHeader;
