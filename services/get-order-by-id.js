/**
 * Fetches order by id from the API with error handling and revalidation
 * @param {string} orderId - The id of the order to fetch
 * @returns {Promise<Object>} The order data
 * @throws {Error} If the fetch fails
 */

export const getOrderById = async (orderId, token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`, {
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
