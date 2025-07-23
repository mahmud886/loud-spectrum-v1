/**
 * Fetches search products from the API with error handling and revalidation
 * @param {string} query - The query to search for
 * @returns {Promise<Object>} The search products data
 * @throws {Error} If the fetch fails
 */
export const getSearchProducts = async (query) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search-product?search=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching search products:', error);
    return { error: true, message: error.message, data: { products: [], count: 0 } };
  }
};
