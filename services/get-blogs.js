/**
 * Fetches blogs from the API with error handling and revalidation
 * @returns {Promise<Object>} The blogs data
 * @throws {Error} If the fetch fails
 */
export async function getBlogs() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/get-all-post`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      return { error: true, message: `Failed to fetch blogs: ${res.status} ${res.statusText}`, blogs: [], count: 0 };
    }

    const data = await res.json();

    // Validate the API response structure
    if (!data || !data.data || !Array.isArray(data.data.posts)) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Invalid API response structure for blogs:', data);
      }
      return { error: true, message: 'Invalid API response', blogs: [] };
    }

    const blogs = data.data.posts;

    // Check if we have any valid blogs
    if (!blogs || blogs.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('No blogs found in API response');
      }
      return { notFound: true, message: 'No blogs available', blogs: [] };
    }

    // Filter out invalid blog posts
    const validBlogs = blogs.filter((blog) => blog && blog.identifier_url && blog.title);

    if (validBlogs.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('No valid blogs found after filtering');
      }
      return { notFound: true, message: 'No valid blogs available', blogs: [] };
    }

    return { blogs: validBlogs, count: validBlogs.length };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { error: true, message: error.message, blogs: [] };
  }
}
