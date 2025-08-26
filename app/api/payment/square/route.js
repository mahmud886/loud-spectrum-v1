'use server';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { Client } from 'square';

const { paymentsApi } = new Client({
  accessToken: 'EAAAlySOp8rRv9UJuEmBUXMV4Szhxk7oMPNPYBl0_hIHg53xpRxzVaPK3WqfaJzt',
  environment: 'sandbox',
});

// Function to handle BigInt serialization
const serializeBigInt = (key, value) => {
  return typeof value === 'bigint' ? value.toString() : value;
};

export const POST = async (req) => {
  try {
    const { sourceId, data } = await req.json();

    // Basic validation
    if (!sourceId) {
      return new Response(JSON.stringify({ error: 'sourceId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!data || !data.total) {
      return new Response(JSON.stringify({ error: 'Payment data and total are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const amountInCents = Math.round(data.total * 100);

    // Use the same approach as your working old codebase
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        currency: 'USD',
        amount: amountInCents.toString(), // Use string like in old codebase
      },
    });

    // console.log('Square Payment Result:', result);

    const { id, orderId, locationId, approvedMoney, status, sourceType, createdAt } = result?.payment;

    if (status === 'COMPLETED') {
      // console.log('Payment completed successfully');

      const orderPayload = {
        ...data,
        payment_status: 'Paid',
        payment_info: {
          transection_id: id,
          order_id: orderId,
          location_id: locationId,
          approved_money: approvedMoney,
          card_details: {
            // Card details can be added here if needed
          },
          status: status,
          source_type: sourceType,
          created_at: createdAt,
        },
      };

      const serializedOrderPayload = JSON.stringify(orderPayload, serializeBigInt);
      console.log('Order payload:', serializedOrderPayload);

      // Get auth token - allow guest users
      const cookieStore = await cookies();
      const authToken = cookieStore.get('authToken')?.value;

      // For guest users, we don't require auth token
      const isGuestCheckout = data.guest_checkout === true;

      if (!authToken && !isGuestCheckout) {
        console.error('No auth token found in cookies and not guest checkout');
        return new Response(
          JSON.stringify({
            error: 'Authentication token not found',
            success: false,
          }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      console.log('Auth token found:', !!authToken);

      // Get API URL
      const baseUrl = process.env.API_URL;
      if (!baseUrl) {
        console.error('API_URL environment variable not set');
        return new Response(
          JSON.stringify({
            error: 'Server configuration error',
            success: false,
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      // const url = `${baseUrl}/api/orders${data?.products?.[0]?.product_type === 'Wholesale' ? '/wholesale' : ''}`;
      const url = `${baseUrl}/orders`;
      // console.log('Sending order to:', url);

      try {
        // Prepare headers - only include Authorization if we have a token
        const headers = {
          'Content-Type': 'application/json',
        };

        if (authToken) {
          headers.Authorization = `${authToken}`;
        }

        const res = await fetch(url, {
          method: 'POST',
          headers,
          body: serializedOrderPayload,
        });

        // console.log('Order API Response Status:', res.status);

        if (res.ok) {
          try {
            const orderRes = await res.json();
            // console.log('Order API Response:', orderRes);

            if (!orderRes.error) {
              const serializedData = JSON.stringify(orderRes, serializeBigInt);
              return new Response(serializedData, {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              });
            } else {
              console.error('Order API returned error:', orderRes.error);
              return new Response(
                JSON.stringify({
                  error: orderRes.error || 'Order creation failed',
                  success: false,
                }),
                {
                  status: 400,
                  headers: { 'Content-Type': 'application/json' },
                },
              );
            }
          } catch (jsonError) {
            console.error('Failed to parse order API response as JSON:', jsonError);
            const responseText = await res.text();
            console.error('Order API Response Text:', responseText);
            return new Response(
              JSON.stringify({
                error: 'Invalid response from order API',
                success: false,
              }),
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
              },
            );
          }
        } else {
          const errorText = await res.text();
          console.error('Order API Error Response:', res.status, errorText);
          return new Response(
            JSON.stringify({
              error: `Order API error: ${res.status}`,
              success: false,
            }),
            {
              status: res.status,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }
      } catch (fetchError) {
        console.error('Failed to fetch order API:', fetchError);
        return new Response(
          JSON.stringify({
            error: 'Failed to create order',
            success: false,
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }
    } else {
      console.error('Payment not completed. Status:', status);
      return new Response(
        JSON.stringify({
          error: `Payment failed with status: ${status}`,
          success: false,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  } catch (error) {
    console.error('Square Payment Route Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        success: false,
        details: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
};

export const GET = async () => {
  return new Response(
    JSON.stringify({
      message: 'Square API endpoint',
      squareClientInitialized: !!paymentsApi,
      hasAccessToken: true,
      squareVersion: '43.0.0',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
