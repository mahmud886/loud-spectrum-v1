import BlogCard from '@/components/containers/ordinary-blog/BlogCard';
import BlogFilter from '@/components/containers/ordinary-blog/BlogFilter';
import BlogPagination from '@/components/containers/ordinary-blog/BlogPagination';
import FeaturedBlog from '@/components/containers/ordinary-blog/FeaturedBlog';
import SideBlogs from '@/components/containers/ordinary-blog/SideBlogs';

const OrdinaryBlogSection = () => {
  return (
    <div className="mb-[100px]">
      <div className="my-10 grid grid-cols-1 gap-x-10 md:grid-cols-[53.52%_42.58%]">
        <FeaturedBlog />
        <div className="">
          <SideBlogs />
        </div>
      </div>
      <div className="border-1"></div>

      <div className="my-10">
        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row">
          <BlogFilter />
          <button className="text-umbra-10 font-mono text-[16px] font-normal uppercase">
            232 results for <span className="text-umbra-100">all</span>
          </button>
        </div>
      </div>

      <div className="mb-[50px] grid grid-cols-1 gap-6 gap-x-4 md:grid-cols-3 md:gap-y-20">
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
