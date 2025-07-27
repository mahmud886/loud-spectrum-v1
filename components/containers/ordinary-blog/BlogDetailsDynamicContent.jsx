export const BlogDetailsDynamicContent = ({ content }) => {
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    // console.log('BlogDetailsDynamicContent - content type:', typeof content);
    // console.log('BlogDetailsDynamicContent - content value:', content);
  }

  // Validate and sanitize content
  const sanitizedContent = content && typeof content === 'string' ? content.trim() : '';

  // If no content, return a placeholder
  if (!sanitizedContent) {
    if (process.env.NODE_ENV === 'development') {
      // console.warn('BlogDetailsDynamicContent - No valid content provided');
    }
    return (
      <div className="blog-content prose prose-lg max-w-none">
        <p className="text-gray-500 italic">No content available</p>
      </div>
    );
  }

  // Additional safety check to ensure content is not just whitespace
  if (sanitizedContent.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('BlogDetailsDynamicContent - Content is empty after trimming');
    }
    return (
      <div className="blog-content prose prose-lg max-w-none">
        <p className="text-gray-500 italic">No content available</p>
      </div>
    );
  }

  return (
    <div
      className="blog-content prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
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
