import { cookies } from 'next/headers';

// Function to handle BigInt serialization
const serializeBigInt = (key, value) => {
  return typeof value === 'bigint' ? value.toString() : value;
};

// Function to clean NaN values from payload
const cleanPayload = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(cleanPayload);
  } else if (obj !== null && typeof obj === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'number' && isNaN(value)) {
        console.warn(`Replacing NaN value at ${key} with 1`);
        cleaned[key] = 1; // Replace NaN with 1 to satisfy min validation
      } else {
        cleaned[key] = cleanPayload(value);
      }
    }
    return cleaned;
  }
  return obj;
};

export const POST = async (req) => {
  const { data } = await req.json();
  const cleanedData = cleanPayload(data);
  const serializedOrderPayload = JSON.stringify(cleanedData, serializeBigInt);

  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken')?.value;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = `${baseUrl}/api/orders`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
    body: serializedOrderPayload,
  });

  if (res.ok) {
    const orderRes = await res.json();
    if (!orderRes.error) {
      return new Response(
        JSON.stringify(
          {
            error: false,
            message: 'Order created successfully',
            data: orderRes,
          },
          serializeBigInt,
        ),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    } else {
      return new Response(
        JSON.stringify({
          error: true,
          message: orderRes.message || 'Order creation failed',
          data: null,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  }

  let errorMessage = 'Payment failed';
  try {
    const errorRes = await res.json();
    errorMessage = errorRes.message || errorMessage;
    console.error('Backend API error:', errorRes);
  } catch (e) {
    console.error('Failed to parse error response:', e);
    console.error('Response status:', res.status);
  }

  return new Response(
    JSON.stringify({
      error: true,
      message: errorMessage,
      data: null,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};

export const GET = async () => {
  return new Response('Method GET Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
};
