/**
 * Fetches Product Types counts from the API with error handling and revalidation
 * @returns {Promise<Object>} Product Types counts
 * @throws {Error} If the fetch fails
 */
export async function getProductTypesCounts() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/product-type/counts`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product types counts: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product types counts:', error);
    throw new Error('Failed to fetch product types counts. Please try again later.');
  }
}
