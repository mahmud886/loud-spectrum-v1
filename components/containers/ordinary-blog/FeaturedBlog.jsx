import React from 'react';
import Image from 'next/image';

const FeaturedBlog = () => {
  return (
    <div className="flex flex-col justify-between space-y-6">
      <div className="group relative">
        <div className="">
          <div className="overflow-hidden transition-transform duration-500">
            <Image
              src="/assets/images/blog/blog-image-featuted.png"
              alt="blog-image-featuted"
              width={685}
              height={380}
              className="block h-auto w-[685px] object-cover group-hover:scale-110"
            />
          </div>
          <div className="absolute top-[8%] right-[5%]">
            <button className="outline-button-black rounded-full px-6 py-2">Read More</button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="main-button-black border-umbra-100 rounded-md border-1 px-4 py-2">Featured</button>
            <button className="outline-button-white !bg-white-100 border-umbra-100 rounded-sm border-1 px-4 py-2">
              Tag
            </button>
          </div>
          <p className="text-umbra-100 font-mono text-[14px] leading-[130%] font-normal">March 7, 2025</p>
        </div>
      </div>
      <h2 className="text-umbra-100 font-sans text-[28px] leading-[130%] font-normal tracking-normal">
        Terpene-Infused Products That You Can Make At Home: Oils, And Candles
      </h2>
    </div>
  );
};

export default FeaturedBlog;
