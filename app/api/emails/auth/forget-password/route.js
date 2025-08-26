import ForgotPasswordEmail from '@/components/emails/ForgotPasswordEmail';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, token, locale } = body;

    // Validate required fields
    if (!email || !token) {
      return NextResponse.json({ success: false, message: 'Email and reset token are required' }, { status: 400 });
    }

    const emailHtml = await render(ForgotPasswordEmail({ email, token, locale }));

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'loudspectrum.com <noreply@loudspectrum.com>',
      to: email,
      subject: `Reset Password`,
      html: emailHtml,
      text: `Reset Password\n\nEmail: ${email}\nToken: ${token}\nLocale: ${locale}`,
    });

    if (error) {
      console.error('Failed to send forget password email:', error);
      return NextResponse.json({ success: false, message: 'Failed to send email', details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Your message has been sent.', emailId: data?.id });
  } catch (error) {
    console.error('Error in forget password form API:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
