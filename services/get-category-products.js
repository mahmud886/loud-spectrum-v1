/**
 * Fetches category wise products from the API with error handling and revalidation
 * @returns {Promise<Object>} The category wise products data
 * @throws {Error} If the fetch fails
 */
export async function getCategoryProducts(categorySlug = 'all') {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories-wise-product/${categorySlug}`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      return {
        error: true,
        message: `Failed to fetch categories wise products: ${res.status} ${res.statusText}`,
        products: [],
      };
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching categories wise products:', error);
    return {
      error: true,
      message: `Failed to fetch categories wise products: ${error.message}`,
      products: [],
    };
  }
}
