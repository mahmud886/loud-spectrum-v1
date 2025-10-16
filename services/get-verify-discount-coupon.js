/**
 * Fetches verify discount coupon from the API with error handling and revalidation
 * @param {string} couponCode - The coupon code
 * @returns {Promise<Object>} The verify discount coupon data
 * @throws {Error} If the fetch fails or unauthorized
 */

'use server';
// import { cookies } from 'next/headers';

export const getVerifyDiscountCoupon = async (couponCode) => {
  try {
    // const cookieStore = await cookies();
    // const authToken = cookieStore.get('authToken')?.value;
    // if (!authToken) {
    //   throw new Error ('Unauthorized: Authentication token is required');
    // }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupons-public/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: authToken,
      },
      body: JSON.stringify({ coupon: couponCode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: true, message: errorData.message || 'Failed to verify coupon', data: null, notFound: false };
    }

    const data = await response.json();
    return { error: false, data, notFound: false };
  } catch (error) {
    console.error('Error verifying coupon:', error);
    return { error: true, message: error.message || 'Invalid coupon!', data: null, notFound: false };
  }
};
