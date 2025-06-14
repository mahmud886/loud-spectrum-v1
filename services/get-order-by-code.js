/**
 * Fetches order by code from the API with error handling and revalidation
 * @param {string} orderCode - The code of the order to fetch
 * @returns {Promise<Object>} The order data
 * @throws {Error} If the fetch fails
 */

export const getOrderByCode = async (orderCode, token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders-by-code/${orderCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { error: false, data: data?.data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { error: true, message: error.message, data: { order: [] } };
  }
};
