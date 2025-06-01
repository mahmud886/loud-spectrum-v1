import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/signup`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const apiResponse = await fetch(url, options);
    const { data, message, status } = await apiResponse.json();

    if (!apiResponse.ok) {
      if (apiResponse.status === 409) return NextResponse.json({ message: message }, { status: apiResponse.status });
      return NextResponse.json({ message: 'Authentication failed' }, { status: apiResponse.status });
    }

    const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); //3 days
    const cookieStore = await cookies();
    await cookieStore.set({
      name: 'authToken',
      secure: process.env.NODE_ENV === 'production',
      value: data?.token,
      httpOnly: true,
      path: '/',
      expires: expires,
    });

    return NextResponse.json({ message: 'Registration successful', data: data });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
