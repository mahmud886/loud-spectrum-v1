/**
 * Fetches blog details from the API with error handling and revalidation
 * @param {string} identifierUrl - The identifierUrl of the blog to fetch details for
 * @returns {Promise<Object>} The blog details data
 * @throws {Error} If the fetch fails
 */
export async function getBlogDetailsBySlug(identifierUrl) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/get-all-post?identifier_url=${identifierUrl}`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    // Validate the API response structure
    if (!data || !data.data || !Array.isArray(data.data.posts)) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Invalid API response structure for identifierUrl: ${identifierUrl}`, data);
      }
      return { notFound: true, message: 'Invalid API response' };
    }

    // Check if we have a valid blog post
    const blogPost = data.data.posts[0];

    // If posts array is empty or no blog post found, return not found
    if (data.data.posts.length === 0 || !blogPost || Object.keys(blogPost).length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Blog post not found for identifierUrl: ${identifierUrl}`);
      }
      return { notFound: true, message: 'Blog post not found' };
    }

    // Additional validation: check if the blog post has required fields
    if (!blogPost._id || !blogPost.title) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Invalid blog post data for identifierUrl: ${identifierUrl}`, blogPost);
      }
      return { notFound: true, message: 'Invalid blog post data' };
    }

    return blogPost;
  } catch (error) {
    console.error('Error fetching blog details:', error);
    return { error: true, message: error.message, data: { blog: [], count: 0 } };
  }
}
