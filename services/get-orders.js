/**
 * Fetches orders from the API with error handling and revalidation
 * @returns {Promise<Object>} The orders data
 * @throws {Error} If the fetch fails
 */

import { cookies } from 'next/headers';

export const getOrders = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { error: false, data: data?.data?.orders };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { error: true, message: error.message, data: { orders: [] } };
  }
};
