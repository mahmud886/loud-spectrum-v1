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

const WireTransferRejectedEmail = ({ orderData, transactionDetails }) => {
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
        <Preview>Order Not Found</Preview>
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
                  'orange-50': '#fff7ed',
                  'orange-100': '#ffedd5',
                  'orange-600': '#ea580c',
                  'orange-700': '#c2410c',
                  'green-50': '#f0fdf4',
                  'green-100': '#dcfce7',
                  'green-200': '#bbf7d0',
                  'green-600': '#16a34a',
                  'green-700': '#15803d',
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
      <Preview>Payment not approved - Action required</Preview>
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
                'orange-50': '#fff7ed',
                'orange-100': '#ffedd5',
                'orange-600': '#ea580c',
                'orange-700': '#c2410c',
                'green-50': '#f0fdf4',
                'green-100': '#dcfce7',
                'green-200': '#bbf7d0',
                'green-600': '#16a34a',
                'green-700': '#15803d',
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

            {/* Main Header */}
            <Section className="rounded-md bg-red-50 p-4">
              <Text className="mb-2 text-center text-2xl font-bold text-red-700">❌ Payment Not Approved</Text>
              <Text className="m-0 text-center text-red-600">Action required for your order, {customer_name}</Text>
            </Section>

            <Text className="mb-4 text-lg">Dear {customer_name},</Text>
            <Text className="mb-6 leading-relaxed text-gray-700">
              We attempted to process your payment, but unfortunately, it was not approved.
            </Text>

            {/* Order Info */}
            <Section className="rounded-lg bg-red-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-red-700">Order Number</Text>
                  <Text className="text-uppercase m-0 font-mono text-red-600">{code}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-red-600">Order Date: {formatDate(created_at)}</Text>
                  <Text className="m-0 text-red-600">Status: Payment Failed</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Action Required Section */}
            <Section className="rounded-lg bg-orange-50 p-6">
              <Text className="mb-4 text-center text-xl font-bold text-orange-700">🔍 Action Required</Text>

              <Text className="mb-4 font-semibold text-orange-700">
                To help us resolve this issue, please share the following:
              </Text>

              <Section className="mb-4">
                <Text className="m-0 text-sm text-orange-600">
                  • <strong>Transaction details:</strong> Transaction ID, date, and payment method
                  <br />• <strong>Payment confirmation:</strong> A screenshot of the payment confirmation from your side
                </Text>
              </Section>

              <Hr className="my-4 border-t border-orange-200" />

              <Text className="mb-2 text-center font-semibold text-orange-700">How to Submit Information:</Text>
              <Text className="m-0 text-center text-sm text-orange-600">
                Reply to this email with the requested information, or contact our support team directly.
                <br />
                Once we receive this information, we will re-check and update you regarding your order.
              </Text>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Order Summary */}
            <Section>
              <Text className="m-0 text-xl font-bold">Order Summary ({allProducts.length} items)</Text>
            </Section>
            <Hr />

            {/* Regular Products */}
            {products.length > 0 && (
              <Section className="mb-4">
                {products.map((item, index) => (
                  <Section
                    key={item._id || `regular-${index}`}
                    className="mb-2 rounded-lg border border-red-100 bg-red-50/20 p-3"
                  >
                    <Row className="py-2">
                      <Column className="w-[60%]">
                        <Text className="m-0 font-semibold">
                          {item.product?.name || item.name || `Product ${index + 1}`}
                        </Text>
                        <Text className="m-0 text-sm text-gray-600">SKU: {item.product?.sku || 'N/A'}</Text>
                        <Text className="m-0 text-xs text-gray-500">
                          Qty: {item.quantity} | Volume: {item.selectedVolume}ml
                        </Text>
                        <Text className="m-0 text-sm text-gray-600">
                          Remarks: {item?.product?.remarks || item?.remarks || 'N/A'}
                        </Text>
                      </Column>
                      <Column className="w-[40%] text-right">
                        <Text className="m-0 font-semibold text-red-600">${formatPrice(item.total)}</Text>
                      </Column>
                    </Row>
                  </Section>
                ))}
              </Section>
            )}

            {/* Wholesale Products */}
            {ws_products.length > 0 && (
              <Section className="mb-4">
                {ws_products.map((item, index) => (
                  <Section
                    key={item._id || `wholesale-${index}`}
                    className="mb-2 rounded-lg border border-red-100 bg-red-50/20 p-3"
                  >
                    <Row className="py-2">
                      <Column className="w-[60%]">
                        <Text className="m-0 font-semibold">
                          {item.product?.name || item.name || `Product ${index + 1}`}
                        </Text>
                        <Text className="m-0 text-sm text-gray-600">SKU: {item.product?.sku || 'N/A'}</Text>
                        <Text className="m-0 text-xs text-gray-500">
                          Qty: {item.quantity} | Volume: {item.selectedVolume}ml
                        </Text>
                        <Text className="m-0 text-sm text-gray-600">
                          Remarks: {item?.product?.remarks || item?.remarks || 'N/A'}
                        </Text>
                      </Column>
                      <Column className="w-[40%] text-right">
                        <Text className="m-0 font-semibold text-red-600">${formatPrice(item.total)}</Text>
                      </Column>
                    </Row>
                  </Section>
                ))}
              </Section>
            )}

            <Hr className="my-3 border-t border-gray-200" />

            {/* Total Section */}
            <Section className="text-right">
              <Row>
                <Column className="pr-4 text-right">
                  <Text className="m-0 font-normal">SUBTOTAL</Text>
                </Column>
                <Column className="w-32 text-right">
                  <Text className="m-0 font-normal text-gray-700">${formatPrice(sub_total)}</Text>
                </Column>
              </Row>
              {shipping_amount > 0 && (
                <Row>
                  <Column className="pr-4 text-right">
                    <Text className="m-0 font-normal">SHIPPING</Text>
                  </Column>
                  <Column className="w-32 text-right">
                    <Text className="m-0 font-normal text-gray-700">${formatPrice(shipping_amount)}</Text>
                  </Column>
                </Row>
              )}
              <Row>
                <Column className="pr-4 text-right">
                  <Text className="m-0 font-normal">TAX</Text>
                </Column>
                <Column className="w-32 text-right">
                  <Text className="m-0 font-normal text-gray-700">${formatPrice(tax_amount)}</Text>
                </Column>
              </Row>
              {discount_amount > 0 && (
                <Row>
                  <Column className="pr-4 text-right">
                    <Text className="m-0 font-normal text-green-600">DISCOUNT</Text>
                  </Column>
                  <Column className="w-32 text-right">
                    <Text className="m-0 font-normal text-green-600">-${formatPrice(discount_amount)}</Text>
                  </Column>
                </Row>
              )}
              <Row className="mt-3 rounded-md bg-red-50 p-2">
                <Column className="text-left">
                  <Text className="m-0 font-semibold text-red-700">TOTAL</Text>
                </Column>
                <Column className="w-32 text-right">
                  <Text className="m-0 font-bold text-red-700">${formatPrice(total)}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Apology and Next Steps */}
            <Section className="rounded-lg bg-gray-50 p-4">
              <Text className="mb-2 text-center font-semibold text-gray-900">We Apologize for the Inconvenience</Text>
              <Text className="m-0 text-center text-sm text-gray-700">
                We apologize for the inconvenience and appreciate your quick response.
                <br />
                Our team will review your information promptly and get back to you within 24 hours.
                <br />
                <strong>Thank you for your patience and understanding.</strong>
              </Text>
            </Section>

            {/* Actions */}
            <Section className="mb-4 text-center">
              <Row>
                <Column className="text-center">
                  <Button
                    href={`mailto:support@loudspectrum.com?subject=Payment Issue - Order ${code}&body=Hi, I need help with my payment for order ${code}. Please find the transaction details attached.`}
                    className="mx-2 rounded-full bg-red-600 px-6 py-3 text-sm font-normal text-white"
                  >
                    Contact Support
                  </Button>
                  <Button
                    href={`${baseUrl}/account/orders`}
                    className="mx-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-normal text-gray-700"
                  >
                    View Order
                  </Button>
                </Column>
              </Row>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WireTransferRejectedEmail;
