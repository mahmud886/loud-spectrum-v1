import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const apiResponse = await fetch(url, options);

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || 'Failed to send password reset email' },
        { status: apiResponse.status },
      );
    }

    const { data, message } = await apiResponse.json();

    return NextResponse.json({ message: message || 'Password reset email sent successfully', data }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
