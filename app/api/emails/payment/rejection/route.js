import PaymentRejectionEmail from '@/components/emails/PaymentRejectionEmail';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { orderData, paymentData, recipientEmail, recipientName, rejectionReason } = await request.json();

    // Validate required fields
    if (!orderData || !paymentData || !recipientEmail) {
      return NextResponse.json(
        { error: 'Order data, payment data, and recipient email are required' },
        { status: 400 },
      );
    }

    // Render the email component to HTML
    const emailHtml = await render(
      PaymentRejectionEmail({
        orderData: {
          ...orderData,
          customer_name: recipientName || orderData.customer_name || 'Customer',
        },
        paymentData,
        rejectionReason,
      }),
    );

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'loudspectrum.com <test@loudspectrum.com>',
      // to: [recipientEmail],
      to: ['iqbal886mahmud@gmail.com'],
      subject: `Payment Rejected - ${orderData.code}`,
      html: emailHtml,
      // Optional: Add plain text version for better compatibility
      text: `
        Payment Rejected

        We're sorry, ${recipientName || orderData.customer_name || 'Customer'}.

        We were unable to process your payment for your order.

        Payment Details:
        - Transaction ID: ${paymentData.transaction_id || 'N/A'}
        - Order Number: ${orderData.code}
        - Attempted Amount: $${parseFloat(paymentData.payment_amount || orderData.total || 0).toFixed(2)}
        - Payment Method: ${paymentData.payment_method || orderData.payment_type}
        - Status: Rejected

        ${rejectionReason ? `Reason: ${rejectionReason}` : ''}

        Please try again with a different payment method or contact our support team for assistance.
        Your order is still reserved and waiting for payment.

        No charges have been made to your payment method.

        Thank you for choosing Loud Spectrum!
      `,
    });

    if (error) {
      console.error('Failed to send payment rejection email:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Payment rejection email sent successfully',
        emailId: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending payment rejection email:', error);
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
      payment_status: 'failed',
      order_status: 'pending',
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

    // Sample payment data for testing
    const samplePaymentData = {
      transaction_id: 'txn_failed_1234567890',
      payment_method: 'Credit Card',
      payment_amount: 150.38,
      payment_date: new Date().toISOString(),
      last_four_digits: '4242',
      card_brand: 'Visa',
      processing_fee: 4.36,
      decline_reason: 'Insufficient funds',
      error_code: 'CARD_DECLINED',
    };

    // Render the email component to HTML for preview
    const emailHtml = await render(
      PaymentRejectionEmail({
        orderData: sampleOrderData,
        paymentData: samplePaymentData,
        rejectionReason: 'Payment was declined by your bank due to insufficient funds.',
      }),
    );

    // Return the HTML for preview
    return new Response(emailHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error generating payment rejection email preview:', error);
    return NextResponse.json({ error: 'Failed to generate email preview', details: error.message }, { status: 500 });
  }
}
