import RefundEmail from '@/components/emails/RefundEmail';
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
      RefundEmail({
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
      subject: `Refund Processed for Your Order`,
      html: emailHtml,
      // Optional: Add plain text version for better compatibility
      text: `
        Refund Processed for Your Order

        Hi ${recipientName || orderData.customer_name || 'Customer'},

        We wanted to let you know that your refund for Order #${orderData.code} has been successfully processed. The refunded amount should appear in your original payment method within 3–5 business days, depending on your bank or payment provider.

        Order Details:
        - Order Number: ${orderData.code}
        - Refund Amount: $${parseFloat(orderData.total || 0).toFixed(2)}
        - Order Date: ${orderData.created_at ? new Date(orderData.created_at).toLocaleDateString() : 'N/A'}

        If you have any questions or need further assistance, feel free to reply to this email — we're happy to help.

        Thank you for your understanding and patience.

        Best regards,
        Loud Spectrum Team
      `,
    });

    if (error) {
      console.error('Failed to send refund email:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Refund email sent successfully',
        emailId: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending refund email:', error);
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
      ws_products: [],
      sub_total: 129.98,
      tax_amount: 10.4,
      shipping_amount: 15.0,
      discount_amount: 5.0,
      total: 150.38,
      payment_type: 'CARD',
      payment_status: 'refunded',
      order_status: 'refunded',
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
      RefundEmail({
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
    console.error('Error generating refund email preview:', error);
    return NextResponse.json({ error: 'Failed to generate email preview', details: error.message }, { status: 500 });
  }
}
