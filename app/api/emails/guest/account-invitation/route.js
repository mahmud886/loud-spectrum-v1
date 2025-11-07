import GuestAccountInvitationEmail from '@/components/emails/GuestAccountInvitationEmail';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { orderData } = await request.json();

    // Validate required fields
    if (!orderData || !orderData.billing_details?.email) {
      return NextResponse.json({ error: 'Order data and recipient email are required' }, { status: 400 });
    }

    const recipientEmail = orderData.billing_details.email;
    const customerName = orderData.billing_details?.first_name
      ? `${orderData.billing_details.first_name}${orderData.billing_details.last_name ? ` ${orderData.billing_details.last_name}` : ''}`
      : 'Customer';

    // Render the email component to HTML
    const emailHtml = await render(
      GuestAccountInvitationEmail({
        orderData,
      }),
    );

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'loudspectrum.com <noreply@loudspectrum.com>',
      to: process.env.NODE_ENV === 'production' ? [recipientEmail] : ['web.amex19@gmail.com'],
      subject: 'Make Your Next Checkout Even Easier ✨',
      html: emailHtml,
      // Optional: Add plain text version for better compatibility
      text: `
Make Your Next Checkout Even Easier ✨

Hi ${customerName},

Thank you for your recent order — we're thrilled to have you with us! 🎉

You checked out as a guest this time, but next time, you can log in with the same email address to easily track your orders, view past purchases, and enjoy a faster checkout experience.

Ready to make things simpler?

👉 Create your account here: ${process.env.NEXT_PUBLIC_BASE_URL_EMAIL || 'http://localhost:3000'}/login?email=${encodeURIComponent(recipientEmail)}#register

Thank you for shopping with us — we can't wait to see you again soon! 💛

Order Reference: ${orderData.code}
Email: ${recipientEmail}

---
Loud Spectrum
Email: hi@loudspectrum.com
Phone: +1 714 905 9681
      `,
    });

    if (error) {
      console.error('Failed to send guest account invitation email:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Guest account invitation email sent successfully',
        emailId: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending guest account invitation email:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

// Optional: GET endpoint for testing the email template
export async function GET() {
  try {
    const testOrderData = {
      code: 'LS-P-00000714',
      billing_details: {
        first_name: 'Md. Iqbal',
        last_name: 'Mahmud',
        email: 'iqbal886mahmud@gmail.com',
        phone: '01670161693',
        city: 'Alameda',
        province: 'CA',
        country: 'US',
        post_code: '94501',
        street_address: 'Shahidbag, Mirpur 12, Pallabi',
      },
    };

    const emailHtml = await render(
      GuestAccountInvitationEmail({
        orderData: testOrderData,
      }),
    );

    return new NextResponse(emailHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error rendering test email:', error);
    return NextResponse.json({ error: 'Failed to render test email', details: error.message }, { status: 500 });
  }
}
