'use server';

import { cookies } from 'next/headers';

export async function authenticateUser(prevState, formData) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    };

    const apiResponse = await fetch(url, options);

    if (!apiResponse.ok) {
      return {
        success: false,
        message: 'Authentication failed',
        status: apiResponse.status,
      };
    }

    const { data, error, message } = await apiResponse.json();

    if (!data) {
      return {
        success: false,
        message: message || 'Authentication failed',
        status: 401,
      };
    }

    // Set cookie
    const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days
    const cookieStore = cookies();
    cookieStore.set({
      name: 'authToken',
      secure: process.env.NODE_ENV === 'production',
      value: data?.token,
      path: '/',
      expires: expires,
    });

    return {
      success: true,
      message: 'Authentication successful',
      redirect: '/',
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      message: 'Server error',
      status: 500,
    };
  }
}
