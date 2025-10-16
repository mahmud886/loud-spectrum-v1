/**
 * Fetches blog details from the API with error handling and revalidation
 * @param {string} blogId - The ID of the blog to fetch details for
 * @returns {Promise<Object>} The blog details data
 * @throws {Error} If the fetch fails
 */
export async function getBlogDetails(blogId) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/post-details/${blogId}`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });
    if (!res.ok) {
      return {
        error: true,
        message: `HTTP error! status: ${res.status}`,
        data: [],
        notFound: false,
      };
    }
    const data = await res.json();
    return { error: false, data: data?.data || [], notFound: false };
  } catch (error) {
    console.error('Error fetching blog details:', error);
    return { error: true, message: error.message, data: [], notFound: false };
  }
}
