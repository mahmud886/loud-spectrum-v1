import WholesaleRegistrationWelcomeEmail from '@/components/emails/WholesaleRegistrationWelcomeEmail';
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
      subject: `🎉 Welcome to Loud Spectrum Wholesale Partnership!`,
      react: WholesaleRegistrationWelcomeEmail({ registrationData }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Wholesale registration welcome email sent successfully',
      data,
    });
  } catch (error) {
    console.error('Error in wholesale registration welcome email route:', error);
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
        _id: '6751234567890123456789gh',
        company_name: 'Pacific Northwest Botanicals',
        contact_name: 'Jessica Martinez',
        email: 'jessica@pnwbotanicals.com',
        phone: '+1 (555) 654-3210',
        business_type: 'distributor',
        tax_id: '78-9012345',
        website: 'https://pnwbotanicals.com',
        address: '321 Forest Avenue',
        city: 'Portland',
        state: 'Oregon',
        zip_code: '97205',
        country: 'United States',
        annual_revenue: '$2,000,000 - $5,000,000',
        years_in_business: '8',
        primary_products: 'Botanical extracts, Natural products',
        target_market: 'Health stores, Wellness centers',
        distribution_channels: 'B2B distribution, Wholesale network',
        additional_info: 'Established distribution network across the Pacific Northwest',
        status: 'active',
        created_at: new Date('2024-01-05T08:00:00Z').toISOString(),
        approved_at: new Date('2024-01-12T10:15:00Z').toISOString(),
        account_id: 'WS-2024-002',
        account_manager: 'Robert Kim',
        welcome_package_sent: true,
        training_scheduled: true,
        first_order_discount: 15,
        territory_assigned: 'Pacific Northwest',
      };

      // Render the email component to HTML for preview
      const emailHtml = await render(
        WholesaleRegistrationWelcomeEmail({
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
      message: 'Wholesale Registration Welcome Email API',
      endpoints: {
        POST: '/api/emails/wholesale-registration/welcome',
        GET: '/api/emails/wholesale-registration/welcome?preview=true',
      },
      description: 'Send wholesale registration welcome emails',
      required_fields: ['registrationData', 'recipient'],
      sample_request: {
        registrationData: {
          _id: 'registration_id',
          company_name: 'Company Name',
          contact_name: 'Contact Person',
          email: 'contact@company.com',
          phone: '+1 (555) 123-4567',
          business_type: 'distributor',
          tax_id: '78-9012345',
          website: 'https://company.com',
          address: '123 Business St',
          city: 'City',
          state: 'State',
          zip_code: '12345',
          country: 'Country',
          status: 'active',
          created_at: '2024-01-05T08:00:00Z',
          approved_at: '2024-01-12T10:15:00Z',
          account_id: 'WS-2024-002',
          account_manager: 'Account Manager Name',
          welcome_package_sent: true,
          training_scheduled: true,
          first_order_discount: 15,
          territory_assigned: 'Territory Name',
        },
        recipient: 'contact@company.com',
      },
    });
  } catch (error) {
    console.error('Error in wholesale registration welcome email GET route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
