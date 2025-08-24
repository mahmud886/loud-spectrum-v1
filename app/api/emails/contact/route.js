import ContactSubmissionEmail from '@/components/emails/ContactSubmissionEmail';
import { validateContact } from '@/helpers/validations/contact-validation';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, is_subscriber } = body;
    const validation = validateContact({ name, email, message, is_subscriber });
    if (!validation.success) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 });
    }

    const emailHtml = await render(
      ContactSubmissionEmail({ name, email, message, is_subscriber: is_subscriber ? 'Yes' : 'No' }),
    );

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'loudspectrum.com <noreply@loudspectrum.com>',
      to: process.env.NODE_ENV === 'production' ? ['info@medicalterpenes.com'] : ['web.amex19@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
      text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\nIs Subscriber: ${is_subscriber}`,
    });

    if (error) {
      console.error('Failed to send contact email:', error);
      return NextResponse.json({ success: false, message: 'Failed to send email', details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Your message has been sent.', emailId: data?.id });
  } catch (error) {
    console.error('Error in contact form API:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
