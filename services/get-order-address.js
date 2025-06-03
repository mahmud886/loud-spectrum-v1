import { cookies } from 'next/headers';

export const getOrderAddress = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/address`, {
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
    return { error: false, data: data?.data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { error: true, message: error.message, data: { address: [] } };
  }
};
