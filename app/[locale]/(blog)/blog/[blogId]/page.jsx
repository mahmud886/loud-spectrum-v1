import BlogHeader from '@/components/containers/ordinary-blog/BlogHeader';
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
import BlogContents from '../../../../../components/containers/ordinary-blog/BlogContents';

const BlogPage = async ({ params }) => {
  const { blogId } = await params;

  return (
    <div className="">
      <div className="pb-10">
        <DynamicBreadcrumb />
      </div>
      <BlogHeader />
      <BlogContents />
    </div>
  );
};

export default BlogPage;
