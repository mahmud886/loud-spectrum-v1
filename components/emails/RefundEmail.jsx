import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
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

const RefundEmail = ({ orderData }) => {
  if (!orderData) {
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
        <Preview>Refund Processed for Your Order</Preview>
        <Tailwind
          config={{
            theme: {
              extend: {
                colors: {
                  brand: '#007291',
                  'umbra-100': '#1a1a1a',
                  'umbra-5': '#f5f5f5',
                  classic: '#8b4513',
                  'green-50': '#f0fdf4',
                  'green-100': '#dcfce7',
                  'green-200': '#bbf7d0',
                  'green-600': '#16a34a',
                  'green-700': '#15803d',
                  'red-50': '#fef2f2',
                  'red-100': '#fee2e2',
                  'red-600': '#dc2626',
                  'red-700': '#b91c1c',
                },
              },
            },
          }}
        >
          <Body className="bg-white p-6">
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

              {/* Removed gradient text - using logo image instead */}
              <Section className="text-center">
                <Heading className="mb-2 text-2xl font-bold text-gray-900">Order Not Found</Heading>
                <Text className="mb-4 text-gray-600">We couldn't find your order details.</Text>
                <Button href="/shop" className="text-blue-600 hover:text-blue-800">
                  Continue Shopping
                </Button>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  }

  const { code, customer_name, total, created_at } = orderData;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price) => {
    return `${parseFloat(price || 0).toFixed(2)}`;
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
      <Preview>Refund Processed for Your Order</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                classic: '#8b4513',
                'green-50': '#f0fdf4',
                'green-100': '#dcfce7',
                'green-200': '#bbf7d0',
                'green-600': '#16a34a',
                'green-700': '#15803d',
                'blue-50': '#eff6ff',
                'blue-100': '#dbeafe',
                'blue-600': '#2563eb',
                'blue-700': '#1d4ed8',
                'red-50': '#fef2f2',
                'red-100': '#fee2e2',
                'red-600': '#dc2626',
                'red-700': '#b91c1c',
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

            {/* Header Section */}
            <Section className="rounded-md bg-green-50 p-4">
              <Text className="mb-2 text-center text-2xl font-bold text-green-800">Refund Processed</Text>
              <Text className="m-0 text-center text-green-700">
                Your refund for Order #{code} has been successfully processed.
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Hi {customer_name},</Text>
            <Text className="mb-4 leading-relaxed text-gray-700">
              We wanted to let you know that your refund for Order <strong>#{code}</strong> has been successfully
              processed. The refunded amount should appear in your original payment method within{' '}
              <strong>3–5 business days</strong>, depending on your bank or payment provider.
            </Text>

            <Section className="rounded-lg bg-blue-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-blue-800">Order Number</Text>
                  <Text className="text-uppercase m-0 font-mono text-blue-700">{code}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-blue-700">Order Date: {formatDate(created_at)}</Text>
                  <Text className="m-0 text-blue-700">Refund Amount: ${formatPrice(total)}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            <Section className="mb-4">
              <Text className="mb-4 leading-relaxed text-gray-700">
                If you have any questions or need further assistance, feel free to reply to this email — we're happy to
                help.
              </Text>
              <Text className="m-0 leading-relaxed text-gray-700">
                Thank you for your understanding and patience.
              </Text>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Actions */}
            <Section className="mb-4 text-center">
              <Row>
                <Column className="text-center">
                  <Button
                    href={`${baseUrl}/contact`}
                    className="mx-2 rounded-full bg-green-600 px-6 py-3 text-sm font-normal text-white"
                  >
                    Contact Support
                  </Button>
                  <Button
                    href={`${baseUrl}/shop`}
                    className="mx-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-normal text-gray-700"
                  >
                    Continue Shopping
                  </Button>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            <Section className="text-center">
              <Text className="m-0 font-semibold text-gray-900">Need Help?</Text>
              <Text className="m-0 text-sm text-gray-700">
                If you have any questions about your refund, please don't hesitate to contact our support team.
              </Text>
              <Text className="m-0 text-sm text-gray-700">We're here to help!</Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            <EmailFooter baseUrl={baseUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RefundEmail;
