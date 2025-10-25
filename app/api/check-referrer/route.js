import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const referer = request.headers.get('referer') || '';
    const isFromMedicalTerpenes = referer.includes('medicalterpenes.com');

    return NextResponse.json({
      isFromMedicalTerpenes,
      referer: referer || null,
    });
  } catch (error) {
    console.error('Error checking referrer:', error);
    return NextResponse.json(
      {
        isFromMedicalTerpenes: false,
        error: 'Failed to check referrer',
      },
      { status: 500 },
    );
  }
}
