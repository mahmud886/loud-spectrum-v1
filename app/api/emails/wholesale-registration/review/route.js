import WholesaleRegistrationUnderReviewEmail from '@/components/emails/WholesaleRegistrationUnderReviewEmail';
import { render } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { registrationData, recipient } = await request.json();

    if (!registrationData || !recipient) {
      return NextResponse.json({ error: 'Registration data and recipient are required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Loud Spectrum <noreply@loudspectrum.com>',
      to: [recipient],
      subject: `Wholesale Registration Under Review - Thank You for Your Application`,
      react: WholesaleRegistrationUnderReviewEmail({ registrationData }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Wholesale registration under review email sent successfully',
      data,
    });
  } catch (error) {
    console.error('Error in wholesale registration under review email route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const preview = searchParams.get('preview');

    if (preview === 'true') {
      // Sample registration data for preview
      const sampleRegistrationData = {
        _id: '6751234567890123456789ef',
        company_name: 'Sunset Wellness Co.',
        contact_name: 'Emily Davis',
        email: 'emily@sunsetwellness.com',
        phone: '+1 (555) 321-9876',
        business_type: 'wellness',
        tax_id: '45-6789012',
        website: 'https://sunsetwellness.com',
        address: '789 Wellness Boulevard',
        city: 'Austin',
        state: 'Texas',
        zip_code: '78701',
        country: 'United States',
        annual_revenue: '$500,000 - $1,000,000',
        years_in_business: '4',
        primary_products: 'Wellness products, Aromatherapy',
        target_market: 'Wellness enthusiasts, Spa clients',
        distribution_channels: 'Spa retail, Online store',
        additional_info: 'Specializing in natural wellness products',
        status: 'under_review',
        created_at: new Date('2024-01-20T11:30:00Z').toISOString(),
        review_started_at: new Date('2024-01-21T09:00:00Z').toISOString(),
        reviewer_name: 'David Thompson',
        estimated_completion_date: new Date('2024-01-28T17:00:00Z').toISOString(),
        required_documents: ['Business license verification', 'Tax ID confirmation'],
        priority_level: 'Standard',
      };

      // Render the email component to HTML for preview
      const emailHtml = await render(
        WholesaleRegistrationUnderReviewEmail({
          registrationData: sampleRegistrationData,
        }),
      );

      // Return the HTML for preview
      return new Response(emailHtml, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    return NextResponse.json({
      message: 'Wholesale Registration Under Review Email API',
      endpoints: {
        POST: '/api/emails/wholesale-registration/review',
        GET: '/api/emails/wholesale-registration/review?preview=true',
      },
      description: 'Send wholesale registration under review emails',
      required_fields: ['registrationData', 'recipient'],
      sample_request: {
        registrationData: {
          _id: 'registration_id',
          company_name: 'Company Name',
          contact_name: 'Contact Person',
          email: 'contact@company.com',
          phone: '+1 (555) 123-4567',
          business_type: 'wellness',
          tax_id: '45-6789012',
          website: 'https://company.com',
          address: '123 Business St',
          city: 'City',
          state: 'State',
          zip_code: '12345',
          country: 'Country',
          status: 'under_review',
          created_at: '2024-01-20T11:30:00Z',
          review_started_at: '2024-01-21T09:00:00Z',
          reviewer_name: 'Reviewer Name',
          estimated_completion_date: '2024-01-28T17:00:00Z',
          required_documents: ['Document 1', 'Document 2'],
          priority_level: 'Standard',
        },
        recipient: 'contact@company.com',
      },
    });
  } catch (error) {
    console.error('Error in wholesale registration under review email GET route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
