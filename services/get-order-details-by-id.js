'use server';

import { cookies } from 'next/headers';

/**
 * Fetches order details by order ID
 * @param {string} orderId - The ID of the order to fetch details for
 * @returns {Promise<Object>} The order details data
 * @throws {Error} If the fetch fails
 */
export const getOrderDetails = async (orderId) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    if (!authToken) {
      return { authError: true, message: 'Authentication token not found' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      // Handle different HTTP status codes
      if (response.status === 401) {
        return { authError: true, message: 'Authentication failed' };
      } else if (response.status === 404) {
        return { notFound: true, message: 'Order not found' };
      } else if (response.status >= 500) {
        return { serverError: true, message: `Server error: ${response.status}` };
      } else {
        return { error: true, message: `HTTP error! status: ${response.status}, message: ${errorMessage}` };
      }
    }

    const data = await response.json();

    // Validate the API response structure
    if (!data || !data.data) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Invalid API response structure for orderId: ${orderId}`, data);
      }
      return { notFound: true, message: 'Invalid API response' };
    }

    // Check if we have valid order data
    const orderData = data.data;

    // Debug logging in development
    // if (process.env.NODE_ENV === 'development') {
    //   console.log(`Order data for orderId: ${orderId}`, orderData);
    //   console.log(`Order data keys:`, Object.keys(orderData || {}));
    // }

    // If order data is empty or invalid, return not found
    if (!orderData || Object.keys(orderData).length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Order not found for orderId: ${orderId}`);
      }
      return { notFound: true, message: 'Order not found' };
    }

    // Additional validation: check if the order has at least basic identifying information
    if (!orderData._id) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Invalid order data - missing _id for orderId: ${orderId}`, orderData);
      }
      return { notFound: true, message: 'Invalid order data' };
    }

    return data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return { error: true, message: error.message, data: {} };
  }
};
