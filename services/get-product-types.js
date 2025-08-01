/**
 * Fetches Product Types from the API with error handling and revalidation
 * @returns {Promise<Object>} Product Type
 * @throws {Error} If the fetch fails
 */
export async function getProductTypes() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/product-type`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product types: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product types:', error);
    throw new Error('Failed to fetch product types. Please try again later.');
  }
}
