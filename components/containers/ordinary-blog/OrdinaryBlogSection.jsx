import React from 'react';
import FeaturedBlog from '@/components/containers/ordinary-blog/FeaturedBlog';
import SideBlogs from '@/components/containers/ordinary-blog/SideBlogs';
import BlogFilter from '@/components/containers/ordinary-blog/BlogFilter';
import BlogCard from '@/components/containers/ordinary-blog/BlogCard';
import BlogPagination from '@/components/containers/ordinary-blog/BlogPagination';

const OrdinaryBlogSection = () => {
  return (
    <div className="mb-[100px]">
      <div className="my-10 grid grid-cols-[53.52%_42.58%] gap-x-10">
        <FeaturedBlog />
        <SideBlogs />
      </div>
      <div className="border-1"></div>

      <div className="my-10">
        <div className="flex items-start justify-between">
          <BlogFilter />
          <button className="text-umbra-10 font-mono text-[16px] font-normal uppercase">
            232 results for <span className="text-umbra-100">all</span>
          </button>
        </div>
      </div>

      <div className="mb-[50px] grid grid-cols-3 gap-x-4 gap-y-[80px]">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <div className="border-1"></div>
      <div className="py-16">
        <BlogPagination />
      </div>
    </div>
  );
};

export default OrdinaryBlogSection;
