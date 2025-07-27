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
    return data?.data?.posts?.[0] || {};
  } catch (error) {
    console.error('Error fetching blog details:', error);
    return { error: true, message: error.message, data: { blog: [], count: 0 } };
  }
}
