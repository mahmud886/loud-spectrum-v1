import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  ? process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  : 'http://localhost:3000';

const WholesaleRegistrationApproveEmail = ({ registrationData }) => {
  const {
    _id,
    company_name,
    contact_name,
    email,
    phone,
    business_type,
    tax_id,
    website,
    address,
    city,
    state,
    zip_code,
    country,
    annual_revenue,
    years_in_business,
    primary_products,
    target_market,
    distribution_channels,
    additional_info,
    status,
    created_at,
    approved_at,
    account_id,
  } = registrationData;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Html>
      <Head />
      <Font
        fontFamily="Space Grotesk"
        fallbackFontFamily="Arial"
        webFont={{
          url: 'https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQQfforVEjOHrw6DQ0wrd3jv-q8L7geBCvMw.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Preview>Wholesale Registration Approved - Welcome to Loud Spectrum!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                'green-50': '#f0fdf4',
                'green-100': '#dcfce7',
                'green-200': '#bbf7d0',
                'green-600': '#16a34a',
                'green-700': '#15803d',
                'green-800': '#166534',
              },
            },
          },
        }}
      >
        <Body className="bg-gray-50 p-6">
          <Container className="rounded-lg bg-white p-6 shadow-md">
            {/* Logo Header */}
            {/* <Section className="mb-6 text-center">
              <Img
                src={`${baseUrl}/assets/svgs/logos/logo-dark.svg`}
                alt="Loud Spectrum Logo"
                width="200"
                height="60"
                className="mx-auto"
              />
            </Section> */}

            <Section className="mb-6 text-center">
              <Text className="bg-[linear-gradient(90deg,_#101820_21.53%,_#0077C8_44.13%,_#C0AEE7_74.27%,_#DDDAE8_107.64%)] bg-clip-text text-3xl font-bold text-transparent">
                LOUD SPECTRUM
              </Text>
            </Section>

            {/* Success Banner */}
            <Section className="mb-6 rounded-md bg-green-50 p-6">
              <Text className="mb-2 text-center text-3xl font-bold text-green-800">🎉 Congratulations!</Text>
              <Text className="m-0 text-center text-xl text-green-700">
                Your wholesale registration has been approved!
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Dear {contact_name},</Text>
            <Text className="mb-6 leading-relaxed text-gray-700">
              We're excited to welcome <strong>{company_name}</strong> to the Loud Spectrum wholesale family! Your
              registration application has been reviewed and approved.
              <br />
              <br />
              You now have access to our wholesale pricing, exclusive products, and dedicated support team.
            </Text>

            {/* Registration Details */}
            <Section className="mb-6 rounded-lg bg-green-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-green-800">Registration ID</Text>
                  <Text className="m-0 font-mono text-green-700">{_id}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-green-700">Approved: {formatDate(approved_at || created_at)}</Text>
                  <Text className="m-0 text-green-700">
                    Status: <span className="font-semibold">Approved</span>
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Company Information */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Company Information</Text>

              <Row className="mb-4">
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Company Name</Text>
                  <Text className="m-0 text-sm font-semibold">{company_name}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Business Type</Text>
                  <Text className="m-0 text-sm font-semibold capitalize">{business_type}</Text>
                </Column>
              </Row>

              <Row className="mb-4">
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Contact Person</Text>
                  <Text className="m-0 text-sm font-semibold">{contact_name}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Email</Text>
                  <Text className="m-0 text-sm font-semibold">{email}</Text>
                </Column>
              </Row>

              <Row className="mb-4">
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Phone</Text>
                  <Text className="m-0 text-sm font-semibold">{phone}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Tax ID</Text>
                  <Text className="m-0 text-sm font-semibold">{tax_id}</Text>
                </Column>
              </Row>

              <Row className="mb-4">
                <Column>
                  <Text className="m-0 text-sm font-medium text-gray-500">Business Address</Text>
                  <Text className="m-0 text-sm font-semibold">
                    {address}, {city}, {state} {zip_code}, {country}
                  </Text>
                </Column>
              </Row>

              {website && (
                <Row className="mb-4">
                  <Column>
                    <Text className="m-0 text-sm font-medium text-gray-500">Website</Text>
                    <Text className="m-0 text-sm font-semibold">{website}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* What's Next Section */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">What's Next?</Text>

              <Section className="mb-4 rounded-lg bg-green-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-green-800">✓ Account Setup</Text>
                <Text className="m-0 text-sm text-green-700">
                  {account_id
                    ? `Your wholesale account (ID: ${account_id}) is ready to use.`
                    : 'Your wholesale account will be set up within 24 hours.'}
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-green-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-green-800">✓ Wholesale Pricing Access</Text>
                <Text className="m-0 text-sm text-green-700">
                  You now have access to our wholesale pricing tiers and exclusive products.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-green-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-green-800">✓ Dedicated Support</Text>
                <Text className="m-0 text-sm text-green-700">
                  Our wholesale team will be your dedicated point of contact for all orders and inquiries.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-green-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-green-800">✓ Marketing Materials</Text>
                <Text className="m-0 text-sm text-green-700">
                  Access to marketing materials, product images, and promotional content to support your sales.
                </Text>
              </Section>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Actions */}
            <Section className="mb-6 text-center">
              <Row>
                <Column className="text-center">
                  <Button
                    href={`${baseUrl}/wholesale-store`}
                    className="mx-2 rounded-full bg-green-600 px-6 py-3 text-sm font-normal text-white"
                  >
                    Browse Wholesale Products
                  </Button>
                  <Button
                    href={`${baseUrl}/account`}
                    className="mx-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-normal text-gray-700"
                  >
                    Access Your Account
                  </Button>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Contact Information */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Your Wholesale Team</Text>
              <Text className="m-0 mb-2 text-gray-700">
                For any questions or to place your first order, contact our wholesale team:
              </Text>
              <Text className="m-0 text-sm text-gray-600">
                <strong>Email:</strong> wholesale@loudspectrum.com
                <br />
                <strong>Phone:</strong> +1 (555) 123-4567
                <br />
                <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM PST
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            {/* Footer */}
            <Section className="rounded-md bg-gray-100 p-4">
              <Section className="mb-4 text-center">
                <Img
                  src={`${baseUrl}/assets/svgs/logos/logo-dark.svg`}
                  alt="Loud Spectrum Logo"
                  width="150"
                  height="45"
                  className="mx-auto"
                />
              </Section>
              <Text className="m-0 text-center text-sm text-gray-700">
                Loudspectrum.com <br />
                470 Noor Ave STE B #1148, South San Francisco, CA 94080
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WholesaleRegistrationApproveEmail;
