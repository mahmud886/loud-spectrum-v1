import OrderConfirmationEmail from '@/components/emails/OrderConfirmationEmail';
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
      OrderConfirmationEmail({
        orderData: {
          ...orderData,
          customer_name: recipientName || orderData.customer_name || 'Customer',
        },
      }),
    );

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'loudspectrum.com <test@loudspectrum.com>',
      // to: [recipientEmail],
      to: ['iqbal886mahmud@gmail.com'],
      subject: `Order Confirmation - ${orderData.code}`,
      html: emailHtml,
      // Optional: Add plain text version for better compatibility
      text: `
        Order Confirmation

        Thank you for your order, ${recipientName || orderData.customer_name || 'Customer'}!

        Order Details:
        - Order Number: ${orderData.code}
        - Total: $${parseFloat(orderData.total || 0).toFixed(2)}
        - Status: ${orderData.order_status}
        - Payment: ${orderData.payment_status}

        We'll send you a shipping confirmation once your order is dispatched.

        Thank you for choosing Loud Spectrum!
      `,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        emailId: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
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
      ws_products: [
        {
          _id: '507f1f77bcf86cd799439013',
          product: {
            name: 'Wholesale Terpene Pack',
            sku: 'WTP-001',
          },
          quantity: 1,
          selectedVolume: 50,
          attribute: JSON.stringify({ flavor: 'Mixed' }),
          total: 99.99,
        },
      ],
      sub_total: 129.98,
      tax_amount: 10.4,
      shipping_amount: 15.0,
      discount_amount: 5.0,
      total: 150.38,
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
      created_at: new Date().toISOString(),
    };

    // Render the email component to HTML for preview
    const emailHtml = await render(
      OrderConfirmationEmail({
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
