export const BlogDetailsDynamicContent = ({ content }) => {
  return (
    <div
      className="blog-content prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        color: '#1a1a1a',
        fontFamily: 'var(--font-sans)',
        fontSize: '16px',
        lineHeight: '140%',
        fontWeight: 'normal',
        letterSpacing: 'normal',
      }}
    />
  );
};
