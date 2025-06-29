import { randomUUID } from 'crypto';
import { config } from 'dotenv';
import { cookies } from 'next/headers';
import { Client } from 'square';

config();

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'sandbox',
});

/**
 * Serializes BigInt values to strings
 * @param {string} key - The key of the value to serialize
 * @param {any} value - The value to serialize
 * @returns {string|any} The serialized value
 */
const serializeBigInt = (key, value) => {
  return typeof value === 'bigint' ? value.toString() : value;
};

/**
 * Handles the POST request for Square payment processing
 * @param {Request} req - The request object
 * @returns {Promise<Response>} The response object
 */
export const POST = async (req) => {
  const { sourceId, data } = await req.json();

  /**
   * Validates the sourceId parameter
   * @returns {Response} The response object
   */
  if (!sourceId) {
    return new Response(JSON.stringify({ error: 'sourceId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Creates a payment using the Square API
   * @returns {Promise<Object>} The payment result
   */
  const amountInCents = Math.round(data.total * 100);
  const { result } = await paymentsApi.createPayment({
    idempotencyKey: randomUUID(),
    sourceId: sourceId,
    amountMoney: {
      currency: 'USD',
      amount: amountInCents.toString(),
    },
  });

  const { id, orderId, locationId, approvedMoney, status, sourceType, createdAt } = result?.payment;

  /**
   * Creates an order payload for the payment
   * @returns {Object} The order payload
   */
  if (status === 'COMPLETED') {
    console.log('completed');
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

    /**
     * Gets the authentication token from the cookies
     */
    const authToken = cookies().get('authToken').value;

    /**
     * Gets the base URL from the environment variables
     */
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}/api/orders${data?.products[0]?.product_type === 'Wholesale' ? '/wholesale' : ''}`;

    /**
     * Fetches the order from the API
     * @returns {Promise<Response>} The response object
     */
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`, // Add the token here
      },
      body: serializedOrderPayload,
    });

    /**
     * Checks if the response is successful
     * @returns {Promise<Response>} The response object
     */
    if (res.ok) {
      const orderRes = await res.json();
      if (!orderRes.error) {
        /**
         * Serializes the order response
         * @returns {Response} The response object
         */
        const serializedData = JSON.stringify(orderRes, serializeBigInt);
        return new Response(serializedData, {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    /**
     * Returns the serialized order payload
     * @returns {Response} The response object
     */
    return new Response(serializedOrderPayload, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Returns a response indicating payment failure
   * @returns {Response} The response object
   */
  return new Response('Payment failed', {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

/**
 * Handles the GET request for Square payment processing
 * @returns {Response} The response object
 */
export const GET = async () => {
  return new Response('Method GET Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
};
