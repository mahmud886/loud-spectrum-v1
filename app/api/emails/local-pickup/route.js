import LocalPickupEmail from '@/components/emails/LocalPickupEmail';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { orderData, recipientEmail, recipientName } = await request.json();

    // Validate required fields
    if (!orderData || !recipientEmail) {
      return NextResponse.json({ error: 'Order data and recipient email are required' }, { status: 400 });
    }

    // Render the email component to HTML
    const emailHtml = await render(
      LocalPickupEmail({
        orderData: {
          ...orderData,
          customer_name: recipientName || orderData.customer_name || 'Customer',
        },
      }),
    );

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'loudspectrum.com <noreply@loudspectrum.com>',
      to: process.env.NODE_ENV === 'production' ? [recipientEmail] : ['web.amex19@gmail.com'],
      subject: `Local Pickup Ready - ${orderData.code}`,
      html: emailHtml,
      // Optional: Add plain text version for better compatibility
      text: `
        Local Pickup Ready

        Thank you for your order with Loud Spectrum, ${recipientName || orderData.customer_name || 'Customer'}!

        Order Details:
        - Order Number: ${orderData.code}
        - Total: $${parseFloat(orderData.total || 0).toFixed(2)}
        - Status: Ready for pickup

        Pickup Location:
        1907 N Main St
        Santa Ana, CA 92706

        Your order is ready for pickup. Please bring a valid ID and your order confirmation.

        If you have any questions, please contact us.

        Thank you for choosing Loud Spectrum!
      `,
    });

    if (error) {
      console.error('Failed to send local pickup email:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    const res = NextResponse.json(
      {
        success: true,
        message: 'Local pickup email sent successfully',
        emailId: data?.id,
      },
      { status: 200 },
    );

    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return res;
  } catch (error) {
    console.error('Error sending local pickup email:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

// Optional: GET endpoint for testing the email template
export async function GET() {
  try {
    // Sample order data for testing
    const sampleOrderData = {
      _id: '507f1f77bcf86cd799439011',
      code: 'ORD-12345',
      customer_name: 'John Doe',
      products: [
        {
          _id: '507f1f77bcf86cd799439012',
          product: {
            name: 'Terpene Blend - Classic',
            sku: 'TB-CLASSIC-001',
          },
          quantity: 2,
          selectedVolume: 10,
          attribute: JSON.stringify({ flavor: 'Citrus' }),
          total: 29.99,
        },
      ],
      sub_total: 29.99,
      tax_amount: 2.4,
      total: 32.39,
      payment_type: 'CARD',
      payment_status: 'paid',
      order_status: 'ready_for_pickup',
      type: 'local_pickup',
      pickup_details: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      },
      created_at: new Date().toISOString(),
    };

    // Render the email component to HTML for preview
    const emailHtml = await render(
      LocalPickupEmail({
        orderData: sampleOrderData,
      }),
    );

    // Return the HTML for preview
    return new Response(emailHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error generating local pickup email preview:', error);
    return NextResponse.json({ error: 'Failed to generate email preview', details: error.message }, { status: 500 });
  }
}
