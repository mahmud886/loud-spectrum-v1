/**
 * Fetches order by id from the API with error handling (Works on both client and server side)
 * @param {string} orderId - The id of the order to fetch
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} The order data
 */
export const getOrderById = async (orderId, token) => {
  try {
    if (!token) {
      return { authError: true, message: 'Authentication token not found', data: {} };
    }

    if (!orderId) {
      return { error: true, message: 'Order ID is required', data: {} };
    }

    // Get API URL - works on both client and server side
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

    if (!apiUrl) {
      console.error('API URL not configured');
      return { error: true, message: 'API configuration error', data: {} };
    }

    const url = `${apiUrl}/api/orders/${orderId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 401) {
        return { authError: true, message: 'Authentication failed', data: {} };
      } else if (response.status === 404) {
        return { notFound: true, message: 'Order not found', data: {} };
      } else if (response.status >= 500) {
        return { serverError: true, message: `Server error: ${response.status}`, data: {} };
      } else {
        return { error: true, message: `HTTP error! status: ${response.status}`, data: {} };
      }
    }

    const data = await response.json();

    // Validate the API response structure
    if (!data || !data.data) {
      return { notFound: true, message: 'Invalid API response', data: {} };
    }

    // Check if we have valid order data
    const orderData = data.data;

    // If order data is empty or invalid, return not found
    if (!orderData || Object.keys(orderData).length === 0) {
      return { notFound: true, message: 'Order not found', data: {} };
    }

    // Additional validation: check if the order has at least basic identifying information
    if (!orderData._id) {
      return { notFound: true, message: 'Invalid order data', data: {} };
    }

    return { error: false, data: orderData, notFound: false };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return { error: true, message: error.message || 'Network error occurred', data: {}, notFound: false };
  }
};
