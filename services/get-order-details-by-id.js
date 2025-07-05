'use server';

import { cookies } from 'next/headers';

/**
 * Fetches order details by product ID
 * @param {string} productId - The ID of the product to fetch details for
 * @returns {Promise<Object>} The order details data
 * @throws {Error} If the fetch fails
 */
export const getOrderDetails = async (orderId) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    if (!authToken) {
      throw new Error('Authentication token not found');
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
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching order details:', error);
    return { error: true, message: error.message, data: {} };
  }
};
