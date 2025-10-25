import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
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

const SuspiciousOrderEmail = ({ orderData }) => {
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
        <Preview>Order data not found</Preview>
        <Tailwind
          config={{
            theme: {
              extend: {
                colors: {
                  brand: '#007291',
                  'umbra-100': '#1a1a1a',
                  'umbra-5': '#f5f5f5',
                  classic: '#8b4513',
                  'red-50': '#fef2f2',
                  'red-100': '#fee2e2',
                  'red-600': '#dc2626',
                  'red-700': '#b91c1c',
                  'yellow-50': '#fefce8',
                  'yellow-100': '#fef3c7',
                  'yellow-600': '#d97706',
                  'yellow-700': '#b45309',
                },
              },
            },
          }}
        >
          <Body className="bg-white p-6">
            <Container className="rounded-lg bg-white p-6 shadow-md">
              <Section className="mb-6 text-center">
                <Text className="bg-[linear-gradient(90deg,_#101820_21.53%,_#0077C8_44.13%,_#C0AEE7_74.27%,_#DDDAE8_107.64%)] bg-clip-text text-3xl font-bold text-transparent">
                  LOUD SPECTRUM
                </Text>
              </Section>
              <Section className="text-center">
                <Heading className="mb-2 text-2xl font-bold text-gray-900">Order data not found</Heading>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  }

  const {
    _id,
    code,
    customer_name,
    products = [],
    ws_products = [],
    sub_total,
    tax_amount,
    shipping_amount,
    discount_amount,
    total,
    payment_type,
    payment_status,
    order_status,
    type,
    shipping_details,
    billing_details,
    created_at,
  } = orderData;

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

  const allProducts = [...products, ...ws_products];

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
      <Preview>Suspicious Order from Loud Spectrum – Mismatched Addresses (Order #{code})</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                classic: '#8b4513',
                'red-50': '#fef2f2',
                'red-100': '#fee2e2',
                'red-600': '#dc2626',
                'red-700': '#b91c1c',
                'yellow-50': '#fefce8',
                'yellow-100': '#fef3c7',
                'yellow-600': '#d97706',
                'yellow-700': '#b45309',
              },
            },
          },
        }}
      >
        <Body className="bg-gray-50 p-6">
          <Container className="rounded-lg bg-white p-6 shadow-md">
            {/* Logo Header */}
            <Section className="mb-6 text-center">
              <Text className="bg-[linear-gradient(90deg,_#101820_21.53%,_#0077C8_44.13%,_#C0AEE7_74.27%,_#DDDAE8_107.64%)] bg-clip-text text-3xl font-bold text-transparent">
                LOUD SPECTRUM
              </Text>
            </Section>

            {/* Alert Header */}
            <Section className="mb-6 rounded-md bg-red-50 p-4">
              <Text className="mb-2 text-center text-2xl font-bold text-red-800">⚠️ SUSPICIOUS ORDER DETECTED</Text>
              <Text className="m-0 text-center text-red-700">
                Order #{code} - Shipping and billing addresses do not match
              </Text>
            </Section>

            {/* Main Content */}
            <Text className="mb-4 text-lg font-semibold">Hi Team,</Text>
            <Text className="mb-4 leading-relaxed text-gray-700">
              We've found a suspicious order on LoudSpectrum.com — the shipping and billing addresses don't match.
              Please review this order before processing.
            </Text>

            {/* Order Summary */}
            <Section className="mb-6 rounded-lg bg-yellow-50 p-4">
              <Text className="m-0 font-bold text-yellow-800">Order ID: #{code}</Text>
              <Text className="m-0 text-sm text-yellow-700">
                Customer: {customer_name} | Total: ${formatPrice(total)}
              </Text>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Address Mismatch Details */}
            <Section className="mb-6">
              <Text className="mb-4 text-xl font-bold text-red-700">🚨 ADDRESS MISMATCH DETECTED</Text>

              <Row>
                <Column className="w-1/2">
                  <Section className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <Text className="m-0 font-bold text-red-800">BILLING ADDRESS</Text>
                    <Text className="m-0 text-sm text-gray-700">
                      {billing_details?.first_name} {billing_details?.last_name}
                      <br />
                      {billing_details?.street_address}
                      <br />
                      {billing_details?.city}, {billing_details?.province} {billing_details?.post_code}
                      <br />
                      {billing_details?.country}
                      <br />
                      Email: {billing_details?.email}
                      <br />
                      Phone: {billing_details?.phone}
                    </Text>
                  </Section>
                </Column>
                <Column className="w-1/2">
                  <Section className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <Text className="m-0 font-bold text-red-800">SHIPPING ADDRESS</Text>
                    <Text className="m-0 text-sm text-gray-700">
                      {shipping_details?.first_name} {shipping_details?.last_name}
                      <br />
                      {shipping_details?.street_address}
                      <br />
                      {shipping_details?.city}, {shipping_details?.province} {shipping_details?.post_code}
                      <br />
                      {shipping_details?.country}
                      <br />
                      Email: {shipping_details?.email}
                      <br />
                      Phone: {shipping_details?.phone}
                    </Text>
                  </Section>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Simple Order Summary */}
            <Section className="mb-6">
              <Text className="m-0 text-lg font-bold">Order Summary</Text>
              <Text className="m-0 text-sm text-gray-700">
                Items: {allProducts.length} | Subtotal: ${formatPrice(sub_total)} | Total: ${formatPrice(total)}
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            {/* Action Required */}
            <Section className="mb-6 rounded-lg bg-yellow-50 p-4">
              <Text className="m-0 text-center text-lg font-bold text-yellow-800">ACTION REQUIRED</Text>
              <Text className="m-0 text-center text-yellow-700">
                Please review this order carefully before processing. Consider contacting the customer to verify the
                shipping address.
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SuspiciousOrderEmail;
