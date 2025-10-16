'use server';
import { cookies } from 'next/headers';

/**
 * Fetches order addresses from the API
 * @returns {Promise<Object>} The order addresses data
 * @throws {Error} If the fetch fails
 */
export const getOrderAddress = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      return { error: true, message: `HTTP error! status: ${response.status}`, data: { address: [] } };
    }

    const data = await response.json();
    return { error: false, data: data?.data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { error: true, message: error.message, data: { address: [] }, notFound: false };
  }
};
