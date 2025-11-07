import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import EmailFooter from './EmailFooter';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  ? process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  : 'http://localhost:3000';

const GuestAccountInvitationEmail = ({ orderData }) => {
  if (!orderData) {
    return (
      <Html>
        <Head />
        <Preview>Welcome to Loud Spectrum</Preview>
        <Body className="bg-white p-6">
          <Container className="rounded-lg bg-white p-6 shadow-md">
            <Text>Order data not available</Text>
          </Container>
        </Body>
      </Html>
    );
  }

  const { billing_details, code } = orderData;

  const customerName = billing_details?.first_name
    ? `${billing_details.first_name}${billing_details.last_name ? ` ${billing_details.last_name}` : ''}`
    : 'Customer';
  const customerEmail = billing_details?.email || '';

  // Registration link - can include email as query param for pre-filling
  const registrationLink = `${baseUrl}/login?email=${encodeURIComponent(customerEmail)}&tab=register`;

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
      <Preview>Make Your Next Checkout Even Easier ✨</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                classic: '#8b4513',
                'yellow-50': '#fefce8',
                'yellow-100': '#fef9c3',
                'yellow-600': '#ca8a04',
              },
            },
          },
        }}
      >
        <Body className="bg-gray-50 p-6">
          <Container className="rounded-lg bg-white p-6 shadow-md">
            {/* Logo Header */}
            <Section className="mb-6 text-center">
              <Img
                src={`${baseUrl}/assets/images/logo.png`}
                alt="Loud Spectrum Logo"
                width="200"
                height="40"
                className="mx-auto"
              />
            </Section>

            {/* Main Content */}
            <Section className="mb-6">
              {/* <Heading className="mb-4 text-2xl font-bold text-gray-900">
                Make Your Next Checkout Even Easier ✨
              </Heading> */}

              <Text className="mb-4 text-lg text-gray-700">Hi {customerName},</Text>

              <Text className="mb-4 leading-relaxed text-gray-700">
                Thank you for your recent order — we're thrilled to have you with us! 🎉
              </Text>

              <Text className="mb-4 leading-relaxed text-gray-700">
                You checked out as a guest this time, but next time, you can{' '}
                <strong>log in with the same email address</strong> to easily track your orders, view past purchases,
                and enjoy a faster checkout experience.
              </Text>

              <Text className="mb-6 leading-relaxed text-gray-700">
                <strong>Ready to make things simpler?</strong>
              </Text>

              {/* CTA Button */}
              <Section className="mb-6 text-center">
                <Button
                  href={registrationLink}
                  className="inline-block rounded-lg bg-black px-8 py-3 text-base font-semibold text-white no-underline"
                >
                  👉 Create your account here
                </Button>
              </Section>

              <Text className="mb-6 leading-relaxed text-gray-700">
                Thank you for shopping with us — we can't wait to see you again soon! 💛
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            {/* Order Reference */}
            <Section className="mb-4 rounded-lg bg-gray-50 p-4">
              <Text className="m-0 text-sm text-gray-600">
                <strong>Order Reference:</strong> {code}
              </Text>
              <Text className="m-0 text-sm text-gray-600">
                <strong>Email:</strong> {customerEmail}
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            <EmailFooter baseUrl={baseUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default GuestAccountInvitationEmail;
