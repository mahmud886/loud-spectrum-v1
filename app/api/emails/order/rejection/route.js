import OrderRejectionEmail from '@/components/emails/OrderRejectionEmail';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { orderData, recipientEmail, recipientName, rejectionReason } = await request.json();

    // Validate required fields
    if (!orderData || !recipientEmail) {
      return NextResponse.json({ error: 'Order data and recipient email are required' }, { status: 400 });
    }

    // Render the email component to HTML
    const emailHtml = await render(
      OrderRejectionEmail({
        orderData: {
          ...orderData,
          customer_name: recipientName || orderData.customer_name || 'Customer',
        },
        rejectionReason,
      }),
    );

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'loudspectrum.com <noreply@loudspectrum.com>',
      // to: [recipientEmail],
      to: process.env.NODE_ENV === 'production' ? [recipientEmail] : ['web.amex19@gmail.com'],
      // cc: ['iqbal886mahmud@gmail.com', 'wafafatima66@gmail.com', 'web.amex19@gmail.com'],
      subject: `Order Rejected - ${orderData.code}`,
      html: emailHtml,
      text: `
        Order Rejected

        We're sorry, ${recipientName || orderData.customer_name || 'Customer'}.

        Your order has been rejected and cannot be processed at this time.

        Order Details:
        - Order Number: ${orderData.code}
        - Total: $${parseFloat(orderData.total || 0).toFixed(2)}
        - Status: Rejected
        - Payment: Not Charged

        ${rejectionReason ? `Reason: ${rejectionReason}` : ''}

        If you believe this rejection was made in error, please contact our support team immediately.
        We're here to help resolve any issues and clarify our policies.

        No charges have been made to your payment method.

        Thank you for choosing Loud Spectrum!
      `,
    });

    if (error) {
      console.error('Failed to send order rejection email:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order rejection email sent successfully',
        emailId: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending order rejection email:', error);
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
      payment_status: 'rejected',
      order_status: 'rejected',
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
      OrderRejectionEmail({
        orderData: sampleOrderData,
        rejectionReason: 'Order rejected due to security concerns. The billing address could not be verified.',
      }),
    );

    // Return the HTML for preview
    return new Response(emailHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error generating order rejection email preview:', error);
    return NextResponse.json({ error: 'Failed to generate email preview', details: error.message }, { status: 500 });
  }
}
