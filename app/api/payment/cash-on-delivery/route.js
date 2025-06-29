import { config } from 'dotenv';
import { cookies } from 'next/headers';

config(); // Load environment variables from .env file

// Function to handle BigInt serialization
const serializeBigInt = (key, value) => {
  return typeof value === 'bigint' ? value.toString() : value;
};

export const POST = async (req) => {
  const { data } = await req.json();
  // console.log(data)
  // const orderPayload = {
  //   ...data,
  //   payment_info : {}
  // }

  const serializedOrderPayload = JSON.stringify(data, serializeBigInt);

  console.log(serializedOrderPayload);

  const authToken = cookies().get('authToken').value;

  console.log('authToken' + authToken);
  const baseUrl = process.env.API_URL;
  const url = `${baseUrl}/api/orders${data?.products[0]?.product_type === 'Wholesale' ? '/wholesale' : ''}`;

  //
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`, // Add the token here
    },
    body: serializedOrderPayload,
  });

  if (res.ok) {
    const orderRes = await res.json();
    if (!orderRes.error) {
      const serializedData = JSON.stringify(orderRes, serializeBigInt);
      return new Response(serializedData, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // redirect('/order-success'); // Redirect to a protected route
  }

  return new Response('Payment failed', {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET = async () => {
  return new Response('Method GET Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
};
