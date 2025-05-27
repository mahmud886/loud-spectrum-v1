import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const apiResponse = await fetch(url, options);

    if (!apiResponse.ok) {
      return NextResponse.json({ message: 'Authentication failed' }, { status: apiResponse.status });
    }

    const { data, error, message } = await apiResponse.json();

    if (!data) {
      return NextResponse.json({ message: message || 'Authentication failed' }, { status: 401 });
    }

    // Set cookie
    const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days
    const cookieStore = await cookies();
    await cookieStore.set({
      name: 'authToken',
      secure: process.env.NODE_ENV === 'production',
      value: data?.token,
      path: '/',
      expires: expires,
    });

    return NextResponse.json({ message: 'Authentication successful', data }, { status: 200 });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
