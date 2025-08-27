import WireTransferApprovedEmail from '@/components/emails/WireTransferApprovedEmail';
import WireTransferRejectedEmail from '@/components/emails/WireTransferRejectedEmail';
import WireTransferUnderReviewEmail from '@/components/emails/WireTransferUnderReviewEmail';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { emailType, orderData, recipientEmail, recipientName, transactionDetails } = await request.json();

    // Validate required fields
    if (!emailType || !orderData || !recipientEmail) {
      return NextResponse.json({ error: 'Email type, order data, and recipient email are required' }, { status: 400 });
    }

    // Validate email type
    const validEmailTypes = ['under_review', 'rejected', 'approved'];
    if (!validEmailTypes.includes(emailType)) {
      return NextResponse.json(
        { error: 'Invalid email type. Must be: under_review, rejected, or approved' },
        { status: 400 },
      );
    }

    let EmailComponent;
    let subject;
    let textContent;

    // Select appropriate email component and content based on type
    switch (emailType) {
      case 'under_review':
        EmailComponent = WireTransferUnderReviewEmail;
        subject = `Payment Under Review - ${orderData.code}`;
        textContent = `
          Payment Under Review

          Thank you for your payment, ${recipientName || orderData.customer_name || 'Customer'}!

          Your transaction is currently under review. We are verifying the transaction ID and will confirm your order shortly.

          Order Details:
          - Order Number: ${orderData.code}
          - Total: $${parseFloat(orderData.total || 0).toFixed(2)}
          - Status: Under Review

          Once the review is complete, you will receive a confirmation email with your order details.

          If you have any questions, feel free to contact our support team.

          Thank you for your patience and trust.
        `;
        break;

      case 'rejected':
        EmailComponent = WireTransferRejectedEmail;
        subject = `Payment Not Approved - ${orderData.code}`;
        textContent = `
          Payment Not Approved

          Dear ${recipientName || orderData.customer_name || 'Customer'},

          We attempted to process your payment, but unfortunately, it was not approved.

          Order Details:
          - Order Number: ${orderData.code}
          - Total: $${parseFloat(orderData.total || 0).toFixed(2)}

          To help us resolve this issue, please share:
          - Transaction details (Transaction ID, date, and payment method)
          - A screenshot of the payment confirmation from your side

          Once we receive this information, we will re-check and update you regarding your order.

          We apologize for the inconvenience and appreciate your quick response.
        `;
        break;

      case 'approved':
        EmailComponent = WireTransferApprovedEmail;
        subject = `Payment Approved - Order Confirmed ${orderData.code}`;
        textContent = `
          Payment Approved - Order Confirmed

          Dear ${recipientName || orderData.customer_name || 'Customer'},

          We are pleased to inform you that your payment has been successfully approved and your order is now confirmed.

          Order Details:
          - Order Number: ${orderData.code}
          - Total: $${parseFloat(orderData.total || 0).toFixed(2)}
          - Status: Confirmed

          Your order has been dispatched and can be tracked using the provided tracking details.

          Thank you for choosing Loud Spectrum!
        `;
        break;
    }

    // Render the email component to HTML
    const emailHtml = await render(
      EmailComponent({
        orderData: {
          ...orderData,
          customer_name: recipientName || orderData.customer_name || 'Customer',
        },
        transactionDetails,
      }),
    );

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'loudspectrum.com <noreply@loudspectrum.com>',
      to: process.env.NODE_ENV === 'production' ? [recipientEmail] : ['web.amex19@gmail.com'],
      subject,
      html: emailHtml,
      text: textContent,
    });

    if (error) {
      console.error('Failed to send wire transfer email:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: `Wire transfer ${emailType} email sent successfully`,
        emailId: data?.id,
        emailType,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending wire transfer email:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

// Optional: GET endpoint for testing the email templates
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const emailType = searchParams.get('type') || 'under_review';

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
        {
          _id: '507f1f77bcf86cd799439013',
          product: {
            name: 'Premium Terpene Mix',
            sku: 'PTM-002',
          },
          quantity: 1,
          selectedVolume: 5,
          attribute: JSON.stringify({ flavor: 'Pine' }),
          total: 19.99,
        },
      ],
      sub_total: 49.98,
      tax_amount: 4.0,
      shipping_amount: 10.0,
      total: 63.98,
      payment_type: 'WIRE_TRANSFER',
      payment_status: emailType === 'approved' ? 'paid' : 'pending',
      order_status: emailType === 'approved' ? 'confirmed' : 'pending',
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
      created_at: new Date().toISOString(),
    };

    const sampleTransactionDetails = {
      transactionId: 'TXN-789123456',
      date: new Date().toISOString(),
      method: 'Wire Transfer',
      trackingNumber: emailType === 'approved' ? 'TRK-WT-001234' : null,
    };

    let EmailComponent;
    switch (emailType) {
      case 'rejected':
        EmailComponent = WireTransferRejectedEmail;
        break;
      case 'approved':
        EmailComponent = WireTransferApprovedEmail;
        break;
      default:
        EmailComponent = WireTransferUnderReviewEmail;
    }

    // Render the email component to HTML for preview
    const emailHtml = await render(
      EmailComponent({
        orderData: sampleOrderData,
        transactionDetails: sampleTransactionDetails,
      }),
    );

    // Return the HTML for preview
    return new Response(emailHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error generating wire transfer email preview:', error);
    return NextResponse.json({ error: 'Failed to generate email preview', details: error.message }, { status: 500 });
  }
}
