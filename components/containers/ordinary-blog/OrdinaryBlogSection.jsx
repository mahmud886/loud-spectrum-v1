import BlogCard from '@/components/containers/ordinary-blog/BlogCard';
import FeaturedBlog from '@/components/containers/ordinary-blog/FeaturedBlog';
import SideBlogs from '@/components/containers/ordinary-blog/SideBlogs';
import { Suspense } from 'react';
import BlogCardShimmer from './BlogCardShimmer';
import BlogFilter from './BlogFilter';
import FeaturedBlogShimmer from './FeaturedBlogShimmer';
import SideBlogsShimmer from './SideBlogsShimmer';

const OrdinaryBlogSection = ({ blogs }) => {
  return (
    <div className="mb-[100px]">
      <div className="my-10 grid grid-cols-1 gap-x-10 md:grid-cols-[53.52%_42.58%]">
        <Suspense fallback={<FeaturedBlogShimmer />}>
          <FeaturedBlog featuredBlog={blogs?.[0]} />
        </Suspense>
        <div className="">
          <Suspense fallback={<SideBlogsShimmer />}>
            <SideBlogs blogs={blogs?.slice(1, 4)} />
          </Suspense>
        </div>
      </div>
      <div className="border-1"></div>

      <div className="my-10">
        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row">
          <BlogFilter />
          <p className="text-umbra-10 font-mono text-[16px] font-normal uppercase">
            {blogs?.length} results for <span className="text-umbra-100">all</span>
          </p>
        </div>
      </div>

      <div className="mb-[50px] grid grid-cols-1 gap-6 gap-x-4 md:grid-cols-3 md:gap-y-20">
        <Suspense
          fallback={
            <>
              {[...Array(6)].map((_, idx) => (
                <BlogCardShimmer key={idx} />
              ))}
            </>
          }
        >
          {blogs?.map((blog) => (
            <BlogCard key={blog?.identifier_url} blog={blog} />
          ))}
        </Suspense>
      </div>
      <div className="border-1"></div>
      {/* <div className="py-16">
        <BlogPagination />
      </div> */}
    </div>
  );
};

export default OrdinaryBlogSection;
