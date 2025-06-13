/**
 * Fetches wholesaler products from the API with error handling and revalidation
 * @param {string} wholesalerId - The ID of the wholesaler
 * @param {string} authToken - The authentication token
 * @returns {Promise<Object>} The wholesaler products data
 * @throws {Error} If the fetch fails or unauthorized
 */
export const getWholesalerProducts = async (wholesalerId, authToken) => {
  if (!authToken) {
    throw new Error('Unauthorized: Authentication token is required');
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/wholesaler-products/prices?wholesaler_id=${wholesalerId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: authToken,
      },
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch wholesaler products: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching wholesaler products:', error);
    throw new Error('Failed to fetch wholesaler products. Please try again later.');
  }
};
