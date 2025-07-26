import { BlogDetailsDynamicContent } from './BlogDetailsDynamicContent';
import RightSlideLists from './RightSlideLists';

const BlogContents = ({ blogData }) => {
  return (
    <div className="flex flex-col justify-between gap-20 py-[80px] md:flex-row md:gap-[160px]">
      <div className="md:max-w-[58%]">
        <BlogDetailsDynamicContent content={blogData.content} />
      </div>
      <div className="w-full md:max-w-[45%]">
        <RightSlideLists blogId={blogData?._id} />
      </div>
    </div>
  );
};

export default BlogContents;
