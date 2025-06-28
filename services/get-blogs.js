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
      throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data?.data?.posts || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Failed to fetch blogs. Please try again later.');
  }
}
