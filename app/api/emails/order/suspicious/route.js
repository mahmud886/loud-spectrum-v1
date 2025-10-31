import SuspiciousOrderEmail from '@/components/emails/SuspiciousOrderEmail';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { orderData } = await request.json();

    // Validate required fields
    if (!orderData) {
      return NextResponse.json({ error: 'Order data is required' }, { status: 400 });
    }

    // Render the email component to HTML
    const emailHtml = await render(
      SuspiciousOrderEmail({
        orderData,
      }),
    );

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'loudspectrum.com <noreply@loudspectrum.com>',
      to:
        process.env.NODE_ENV === 'production'
          ? ['order@loudspectrum.com', 'hi@loudspectrum.com']
          : ['wafafatima66@gmail.com', 'web.amex19@gmail.com'],
      subject: `Suspicious Order from Loud Spectrum – Mismatched Addresses (Order #${orderData.code})`,
      html: emailHtml,
      // Optional: Add plain text version for better compatibility
      text: `
        Suspicious Order Alert - Loud Spectrum

        Order: ${orderData.code} | Customer: ${orderData.customer_name} | Total: $${parseFloat(orderData.total || 0).toFixed(2)}

        ADDRESS MISMATCH DETECTED:

        Billing: ${orderData.billing_details?.first_name} ${orderData.billing_details?.last_name}, ${orderData.billing_details?.city}, ${orderData.billing_details?.province}
        Shipping: ${orderData.shipping_details?.first_name} ${orderData.shipping_details?.last_name}, ${orderData.shipping_details?.city}, ${orderData.shipping_details?.province}

        Please review this order before processing.

        Loud Spectrum IT Team
      `,
    });

    if (error) {
      console.error('Failed to send suspicious order email:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Suspicious order email sent successfully',
        emailId: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending suspicious order email:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

// Optional: GET endpoint for testing the email template
export async function GET() {
  try {
    // Sample order data for testing with mismatched addresses
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
      ws_products: [],
      sub_total: 29.99,
      tax_amount: 2.4,
      shipping_amount: 15.0,
      discount_amount: 0,
      total: 47.39,
      payment_type: 'CARD',
      payment_status: 'paid',
      order_status: 'processing',
      type: 'regular',
      shipping_details: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        street_address: '123 Main St',
        city: 'New York',
        province: 'NY',
        post_code: '10001',
        country: 'United States',
      },
      billing_details: {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1987654321',
        street_address: '456 Oak Ave',
        city: 'Los Angeles',
        province: 'CA',
        post_code: '90210',
        country: 'United States',
      },
      created_at: new Date().toISOString(),
    };

    // Render the email component to HTML for preview
    const emailHtml = await render(
      SuspiciousOrderEmail({
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
    console.error('Error generating email preview:', error);
    return NextResponse.json({ error: 'Failed to generate email preview', details: error.message }, { status: 500 });
  }
}
