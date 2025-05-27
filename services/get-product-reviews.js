/**
 * Fetches product reviews from the API with error handling and revalidation
 * @param {string} productId - The ID of the product to fetch reviews for
 * @returns {Promise<Object>} The product reviews data
 * @throws {Error} If the fetch fails
 */
export async function getProductReviews(productId) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/subproducts/review?product_id=${productId}`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product reviews: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data?.data?.reviews;
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    throw new Error('Failed to fetch product reviews. Please try again later.');
  }
}
