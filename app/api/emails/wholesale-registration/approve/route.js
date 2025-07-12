import WholesaleRegistrationApproveEmail from '@/components/emails/WholesaleRegistrationApproveEmail';
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
      subject: `🎉 Wholesale Registration Approved - Welcome to Loud Spectrum!`,
      react: WholesaleRegistrationApproveEmail({ registrationData }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Wholesale registration approval email sent successfully',
      data,
    });
  } catch (error) {
    console.error('Error in wholesale registration approval email route:', error);
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
        _id: '6751234567890123456789ab',
        company_name: 'Green Valley Dispensary',
        contact_name: 'Sarah Johnson',
        email: 'sarah@greenvalleydispensary.com',
        phone: '+1 (555) 987-6543',
        business_type: 'dispensary',
        tax_id: '12-3456789',
        website: 'https://greenvalleydispensary.com',
        address: '123 Cannabis Street',
        city: 'Denver',
        state: 'Colorado',
        zip_code: '80202',
        country: 'United States',
        annual_revenue: '$1,000,000 - $5,000,000',
        years_in_business: '5',
        primary_products: 'Flower, Concentrates, Edibles',
        target_market: 'Adult-use recreational customers',
        distribution_channels: 'Retail dispensary, Online delivery',
        additional_info: 'Looking to expand our terpene product line',
        status: 'approved',
        created_at: new Date('2024-01-15T10:00:00Z').toISOString(),
        approved_at: new Date('2024-01-22T14:30:00Z').toISOString(),
        account_id: 'WS-2024-001',
      };

      // Render the email component to HTML for preview
      const emailHtml = await render(
        WholesaleRegistrationApproveEmail({
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
      message: 'Wholesale Registration Approval Email API',
      endpoints: {
        POST: '/api/emails/wholesale-registration/approve',
        GET: '/api/emails/wholesale-registration/approve?preview=true',
      },
      description: 'Send wholesale registration approval emails',
      required_fields: ['registrationData', 'recipient'],
      sample_request: {
        registrationData: {
          _id: 'registration_id',
          company_name: 'Company Name',
          contact_name: 'Contact Person',
          email: 'contact@company.com',
          phone: '+1 (555) 123-4567',
          business_type: 'dispensary',
          tax_id: '12-3456789',
          website: 'https://company.com',
          address: '123 Business St',
          city: 'City',
          state: 'State',
          zip_code: '12345',
          country: 'Country',
          status: 'approved',
          created_at: '2024-01-15T10:00:00Z',
          approved_at: '2024-01-22T14:30:00Z',
          account_id: 'WS-2024-001',
        },
        recipient: 'contact@company.com',
      },
    });
  } catch (error) {
    console.error('Error in wholesale registration approval email GET route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
