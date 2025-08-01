/**
 * Fetches Type Wise Products from the API with error handling and revalidation
 * @param {string} type - The type of product to fetch
 * @returns {Promise<Object>} Type Wise Products
 * @throws {Error} If the fetch fails
 */
export async function getTypeWiseProducts(type) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/type-wise-product/${type}`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch type wise products: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching type wise products:', error);
    throw new Error('Failed to fetch type wise products. Please try again later.');
  }
}
