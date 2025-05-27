/**
 * Fetches product details from the API with error handling and revalidation
 * @param {string} slug - The slug of the product to fetch
 * @returns {Promise<Object>} The product details data
 * @throws {Error} If the fetch fails
 */
export async function getProductDetails(productSlug) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/product/${productSlug}`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product details: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data?.data?.products?.[0];
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw new Error('Failed to fetch product details. Please try again later.');
  }
}
