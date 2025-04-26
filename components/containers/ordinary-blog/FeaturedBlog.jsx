import Image from 'next/image';

const FeaturedBlog = () => {
  return (
    <div className="flex flex-col justify-between space-y-6">
      <div className="group relative overflow-hidden">
        <Image
          src="/assets/images/blog/blog-image-featuted.png"
          alt="blog-image-featuted"
          width={685}
          height={380}
          className="h-[380px] w-full transform object-cover transition-transform duration-500 group-hover:scale-110 md:w-[685px]"
        />
        <div className="absolute top-[8%] right-[5%]">
          <button className="outline-button-black !md:text-[17px] cursor-pointer rounded-full px-3 py-1 !text-[14px] md:px-6 md:py-2">
            Read More
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="main-button-black border-umbra-100 !md:text-[16px] rounded-md border-1 px-2 py-1 !text-[14px] md:px-4 md:py-2">
              Featured
            </button>
            <button className="outline-button-white !md:text-[16px] !bg-white-100 border-umbra-100 rounded-sm border-1 px-2 py-0 !text-[14px] md:px-4 md:py-2">
              Tag
            </button>
          </div>
          <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">March 7, 2025</p>
        </div>
      </div>
      <h2 className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal md:text-[28px]">
        Terpene-Infused Products That You Can Make At Home: Oils, And Candles
      </h2>

      <div className="center flex w-full items-center justify-between pb-0 md:hidden">
        <button className="main-button-black border-umbra-100 w-full rounded-full border-1 px-6 py-3 text-[17px]">
          Read featured article
        </button>
      </div>
    </div>
  );
};

export default FeaturedBlog;
