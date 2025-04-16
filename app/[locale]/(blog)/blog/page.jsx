import OrdinaryBlogSection from '@/components/containers/ordinary-blog/OrdinaryBlogSection';

const BlogPage = () => {
  return (
    <div className="container mt-[200px]">
      <div className="space-y-10">
        <h1 className="text-umbra-100 font-sans text-[60px] leading-[120%] font-normal tracking-normal">
          Beyond Ordinary Blog
        </h1>
        <div className="border-1"></div>
      </div>
      <main className="">
        <OrdinaryBlogSection />
      </main>
    </div>
  );
};

export default BlogPage;
