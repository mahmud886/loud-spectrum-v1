import { NextResponse } from 'next/server';

/**
 * Handles POST requests to fetch shipping rates from the DHL API.
 * This function acts as a secure backend proxy.
 * @param {Request} request The incoming request object from the frontend.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { shipperDetails, receiverDetails, packageDetails } = body;

    if (!shipperDetails || !receiverDetails || !packageDetails) {
      return NextResponse.json({ error: 'Missing required shipping details.' }, { status: 400 });
    }

    // Calculate next business day for pickup
    const getNextBusinessDay = () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // If tomorrow is Saturday (6) or Sunday (0), add days to get to Monday
      const dayOfWeek = tomorrow.getDay();
      if (dayOfWeek === 0) {
        // Sunday
        tomorrow.setDate(tomorrow.getDate() + 1); // Monday
      } else if (dayOfWeek === 6) {
        // Saturday
        tomorrow.setDate(tomorrow.getDate() + 2); // Monday
      }

      // Set time to 10:00 AM
      tomorrow.setHours(10, 0, 0, 0);
      return tomorrow.toISOString();
    };

    const dhlApiPayload = {
      customerDetails: {
        shipperDetails,
        receiverDetails,
      },
      accounts: [{ typeCode: 'shipper', number: process.env.DHL_ACCOUNT_NUMBER }],
      plannedShippingDateAndTime: getNextBusinessDay(),
      isCustomsDeclarable: false,
      unitOfMeasurement: 'metric',
      packages: [
        {
          weight: packageDetails.weight,
          dimensions: {
            length: packageDetails.length,
            width: packageDetails.width,
            height: packageDetails.height,
          },
        },
      ],
    };

    const apiKey = process.env.DHL_API_KEY;
    const apiSecret = process.env.DHL_API_SECRET;

    if (!apiKey || !apiSecret || !process.env.DHL_ACCOUNT_NUMBER) {
      console.error('API credentials or Account Number are not configured on the server.');
      return NextResponse.json({ error: 'API credentials or Account Number are not configured.' }, { status: 500 });
    }

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    // console.log('DHL Pickup Date:', dhlApiPayload.plannedShippingDateAndTime);

    const response = await fetch(`${process.env.NEXT_PUBLIC_DHL_API_URL}/rates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(dhlApiPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('DHL API Error:', data);
      return NextResponse.json({ error: 'Failed to get rates from DHL.', details: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
