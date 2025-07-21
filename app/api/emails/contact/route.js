import ContactSubmissionEmail from '@/components/emails/ContactSubmissionEmail';
import { validateContact } from '@/helpers/validations/contact-validation';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, subscribe } = body;
    const validation = validateContact({ name, email, message, subscribe });
    if (!validation.success) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 });
    }

    // Render the email component to HTML
    const emailHtml = await render(ContactSubmissionEmail({ name, email, message, subscribe }));

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'loudspectrum.com <no-reply@loudspectrum.com>',
      to: ['iqbal886mahmud@gmail.com', 'hi@loudspectrum.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
      text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\nSubscribe: ${subscribe}`,
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
