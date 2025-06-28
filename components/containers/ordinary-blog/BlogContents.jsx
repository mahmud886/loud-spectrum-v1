import RightSlideLists from './RightSlideLists';

const BlogContents = ({ blogData }) => {
  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-between gap-20 py-[80px] md:flex-row md:gap-[160px]">
      <div className="md:max-w-[58%]">
        <div
          className="blog-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
          style={{
            color: '#1a1a1a',
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            lineHeight: '140%',
            fontWeight: 'normal',
            letterSpacing: 'normal',
          }}
        />
      </div>
      <div className="w-full md:max-w-[45%]">
        <RightSlideLists blogId={blogData?._id} />
      </div>
    </div>
  );
};

export default BlogContents;
