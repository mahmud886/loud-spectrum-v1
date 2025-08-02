import WholesaleRegistrationRejectionEmail from '@/components/emails/WholesaleRegistrationRejectionEmail';
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
      to: process.env.NODE_ENV === 'production' ? [recipient] : ['web.amex19@gmail.com'],
      subject: `Wholesale Registration Update - Application Status`,
      react: WholesaleRegistrationRejectionEmail({ registrationData }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Wholesale registration rejection email sent successfully',
      data,
    });
  } catch (error) {
    console.error('Error in wholesale registration rejection email route:', error);
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
        _id: '6751234567890123456789cd',
        company_name: 'Mountain Peak Retail',
        contact_name: 'Michael Chen',
        email: 'michael@mountainpeakretail.com',
        phone: '+1 (555) 456-7890',
        business_type: 'retail',
        tax_id: '98-7654321',
        website: 'https://mountainpeakretail.com',
        address: '456 Commerce Drive',
        city: 'Phoenix',
        state: 'Arizona',
        zip_code: '85001',
        country: 'United States',
        annual_revenue: '$250,000 - $500,000',
        years_in_business: '2',
        primary_products: 'CBD products, Wellness items',
        target_market: 'Health-conscious consumers',
        distribution_channels: 'Retail store, Online marketplace',
        additional_info: 'New to the terpene market',
        status: 'rejected',
        created_at: new Date('2024-01-10T09:00:00Z').toISOString(),
        rejected_at: new Date('2024-01-17T16:45:00Z').toISOString(),
        rejection_reason: 'Minimum business experience requirement not met',
        rejection_notes:
          'We require a minimum of 3 years in business for our wholesale program. Please consider reapplying once you meet this requirement.',
        reviewer_name: 'Amanda Rodriguez',
      };

      // Render the email component to HTML for preview
      const emailHtml = await render(
        WholesaleRegistrationRejectionEmail({
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
      message: 'Wholesale Registration Rejection Email API',
      endpoints: {
        POST: '/api/emails/wholesale-registration/rejection',
        GET: '/api/emails/wholesale-registration/rejection?preview=true',
      },
      description: 'Send wholesale registration rejection emails',
      required_fields: ['registrationData', 'recipient'],
      sample_request: {
        registrationData: {
          _id: 'registration_id',
          company_name: 'Company Name',
          contact_name: 'Contact Person',
          email: 'contact@company.com',
          phone: '+1 (555) 123-4567',
          business_type: 'retail',
          tax_id: '98-7654321',
          website: 'https://company.com',
          address: '123 Business St',
          city: 'City',
          state: 'State',
          zip_code: '12345',
          country: 'Country',
          status: 'rejected',
          created_at: '2024-01-10T09:00:00Z',
          rejected_at: '2024-01-17T16:45:00Z',
          rejection_reason: 'Reason for rejection',
          rejection_notes: 'Additional notes about the rejection',
          reviewer_name: 'Reviewer Name',
        },
        recipient: 'contact@company.com',
      },
    });
  } catch (error) {
    console.error('Error in wholesale registration rejection email GET route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
