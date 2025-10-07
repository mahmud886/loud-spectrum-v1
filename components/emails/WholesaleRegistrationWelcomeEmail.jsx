import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import EmailFooter from './EmailFooter';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  ? process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  : 'http://localhost:3000';

const WholesaleRegistrationWelcomeEmail = ({ registrationData }) => {
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
    status,
    created_at,
    approved_at,
    account_id,
    account_manager,
    welcome_package_sent,
    training_scheduled,
    first_order_discount,
    territory_assigned,
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
      <Preview>Welcome to Loud Spectrum Wholesale Partnership!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                'purple-50': '#faf5ff',
                'purple-100': '#f3e8ff',
                'purple-200': '#e9d5ff',
                'purple-600': '#9333ea',
                'purple-700': '#7c3aed',
                'purple-800': '#6b21a8',
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

            {/* Welcome Banner */}
            <Section className="mb-6 rounded-md bg-purple-50 p-6">
              <Text className="mb-2 text-center text-3xl font-bold text-purple-800">🎉 Welcome to the Family!</Text>
              <Text className="m-0 text-center text-xl text-purple-700">
                You're now an official Loud Spectrum wholesale partner!
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Dear {contact_name},</Text>
            <Text className="mb-6 leading-relaxed text-gray-700">
              Welcome to Loud Spectrum! We're thrilled to have <strong>{company_name}</strong> join our wholesale
              partnership program. This marks the beginning of an exciting journey together, and we're committed to
              supporting your success every step of the way.
              <br />
              <br />
              Below you'll find everything you need to get started, from accessing your wholesale portal to placing your
              first order.
            </Text>

            {/* Registration Details */}
            <Section className="mb-6 rounded-lg bg-purple-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-purple-800">Partner ID</Text>
                  <Text className="m-0 font-mono text-purple-700">{account_id || _id}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-purple-700">Partnership Date: {formatDate(approved_at || created_at)}</Text>
                  <Text className="m-0 text-purple-700">
                    Status: <span className="font-semibold">Active Partner</span>
                  </Text>
                </Column>
              </Row>
              {account_manager && (
                <Row className="mt-2">
                  <Column>
                    <Text className="m-0 text-sm text-purple-600">Account Manager: {account_manager}</Text>
                  </Column>
                </Row>
              )}
              {territory_assigned && (
                <Row className="mt-2">
                  <Column>
                    <Text className="m-0 text-sm text-purple-600">Territory: {territory_assigned}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Getting Started Section */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Getting Started Checklist</Text>

              <Section className="mb-4 rounded-lg bg-purple-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-purple-800">🔐 Step 1: Access Your Wholesale Portal</Text>
                <Text className="m-0 text-sm text-purple-700">
                  Log in to your exclusive wholesale portal using your email ({email}) and the temporary password sent
                  separately.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-purple-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-purple-800">📋 Step 2: Complete Your Profile</Text>
                <Text className="m-0 text-sm text-purple-700">
                  Update your business information, payment methods, and shipping preferences in your account settings.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-purple-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-purple-800">📖 Step 3: Review Product Catalog</Text>
                <Text className="m-0 text-sm text-purple-700">
                  Browse our wholesale product catalog with your exclusive pricing and minimum order quantities.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-purple-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-purple-800">🎓 Step 4: Schedule Training Session</Text>
                <Text className="m-0 text-sm text-purple-700">
                  {training_scheduled
                    ? 'Your training session is scheduled - check your calendar for details.'
                    : 'Book a complimentary training session with our product specialists.'}
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-purple-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-purple-800">🛍️ Step 5: Place Your First Order</Text>
                <Text className="m-0 text-sm text-purple-700">
                  Start with our recommended starter pack or browse individual products to build your inventory.
                </Text>
              </Section>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Benefits Section */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Your Partnership Benefits</Text>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">💰 Wholesale Pricing</Text>
                <Text className="m-0 text-sm text-gray-700">
                  Access to tiered wholesale pricing with volume discounts and special promotional rates.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">🚚 Priority Shipping</Text>
                <Text className="m-0 text-sm text-gray-700">
                  Expedited processing and shipping for all wholesale orders with tracking and insurance.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">🎯 Marketing Support</Text>
                <Text className="m-0 text-sm text-gray-700">
                  Access to marketing materials, product images, POS displays, and co-op advertising programs.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">📞 Dedicated Support</Text>
                <Text className="m-0 text-sm text-gray-700">
                  Direct access to your account manager and priority customer service for all your needs.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">🆕 Early Access</Text>
                <Text className="m-0 text-sm text-gray-700">
                  First access to new product launches, exclusive formulations, and limited edition releases.
                </Text>
              </Section>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Special Offers */}
            {(first_order_discount || welcome_package_sent) && (
              <>
                <Section className="mb-6">
                  <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Special Welcome Offers</Text>

                  {first_order_discount && (
                    <Section className="mb-4 rounded-lg bg-green-50 p-4">
                      <Text className="m-0 mb-2 font-semibold text-green-800">🎁 First Order Discount</Text>
                      <Text className="m-0 text-sm text-green-700">
                        Use code WELCOME{first_order_discount} for {first_order_discount}% off your first wholesale
                        order (minimum order applies).
                      </Text>
                    </Section>
                  )}

                  {welcome_package_sent && (
                    <Section className="mb-4 rounded-lg bg-blue-50 p-4">
                      <Text className="m-0 mb-2 font-semibold text-blue-800">📦 Welcome Package</Text>
                      <Text className="m-0 text-sm text-blue-700">
                        Your welcome package with product samples, marketing materials, and branded merchandise is on
                        its way!
                      </Text>
                    </Section>
                  )}
                </Section>
                <Hr className="my-4 border-t border-gray-200" />
              </>
            )}

            {/* Company Information */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Partnership Details</Text>

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
                  <Text className="m-0 text-sm font-medium text-gray-500">Primary Contact</Text>
                  <Text className="m-0 text-sm font-semibold">{contact_name}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Email</Text>
                  <Text className="m-0 text-sm font-semibold">{email}</Text>
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
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Actions */}
            <Section className="mb-6 text-center">
              <Row>
                <Column className="text-center">
                  <Button
                    href={`${baseUrl}/wholesale-store`}
                    className="mx-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-normal text-white"
                  >
                    Access Wholesale Portal
                  </Button>
                  <Button
                    href={`${baseUrl}/account`}
                    className="mx-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-normal text-gray-700"
                  >
                    Manage Account
                  </Button>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Important Resources */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Important Resources</Text>

              <Section className="mb-4 rounded-lg bg-yellow-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-yellow-800">📚 Wholesale Guidelines</Text>
                <Text className="m-0 text-sm text-yellow-700">
                  Download our comprehensive wholesale partner handbook with policies, procedures, and best practices.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-yellow-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-yellow-800">🛒 Ordering Process</Text>
                <Text className="m-0 text-sm text-yellow-700">
                  Learn about minimum order quantities, payment terms, shipping schedules, and return policies.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-yellow-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-yellow-800">📊 Sales Tools</Text>
                <Text className="m-0 text-sm text-yellow-700">
                  Access product specification sheets, competitive analysis, and sales training materials.
                </Text>
              </Section>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Contact Information */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Your Wholesale Team</Text>
              <Text className="m-0 mb-2 text-gray-700">
                {account_manager
                  ? `Your dedicated account manager ${account_manager} is ready to assist you with:`
                  : 'Our wholesale team is ready to assist you with:'}
              </Text>
              <Text className="m-0 mb-4 text-sm text-gray-600">
                • Product selection and recommendations
                <br />
                • Order processing and tracking
                <br />
                • Marketing support and materials
                <br />
                • Training and education programs
                <br />• Business development opportunities
              </Text>
              <Text className="m-0 text-sm text-gray-600">
                <strong>Email:</strong> wholesale@loudspectrum.com
                <br />
                <strong>Phone:</strong> +1 (555) 123-4567
                <br />
                <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM PST
                <br />
                <strong>Partner ID:</strong> {account_id || _id}
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            {/* Footer */}
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WholesaleRegistrationWelcomeEmail;
