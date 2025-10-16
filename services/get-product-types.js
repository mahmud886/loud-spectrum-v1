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
      return { error: true, message: `Failed to fetch product types: ${res.status} ${res.statusText}`, types: [] };
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product types:', error);
    return { error: true, message: `Failed to fetch product types: ${error.message}`, types: [] };
  }
}
