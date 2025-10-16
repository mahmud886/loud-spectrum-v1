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

const WireTransferApprovedEmail = ({ orderData, transactionDetails }) => {
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
      <Preview>Payment approved - Order confirmed!</Preview>
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
              <Text className="bg-[linear-gradient(90deg,_#101820_21.53%,_#0077C8_44.13%,_#C0AEE7_74.27%,_#DDDAE8_107.64%)] bg-clip-text text-3xl font-bold text-transparent">
                LOUD SPECTRUM
              </Text>
            </Section>

            {/* Main Header */}
            <Section className="rounded-md bg-green-50 p-4">
              <Text className="mb-2 text-center text-2xl font-bold text-green-700">✅ Payment Approved!</Text>
              <Text className="m-0 text-center text-green-600">
                Your order is confirmed and ready to ship, {customer_name}!
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Dear {customer_name},</Text>
            <Text className="mb-6 leading-relaxed text-gray-700">
              <strong>Great news!</strong> We’re pleased to inform you that your{' '}
              <strong>payment has been successfully approved</strong>
              and your <strong>order is now confirmed.</strong>
              <br />
              <br />
              Our team will begin preparing your order right away.
            </Text>

            {/* Order Info */}
            <Section className="rounded-lg bg-green-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-green-700">Order Number</Text>
                  <Text className="text-uppercase m-0 font-mono text-green-600">{code}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-green-600">Order Date: {formatDate(created_at)}</Text>
                  <Text className="m-0 text-green-600">Status: Confirmed</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Transaction Details */}
            {transactionDetails && (
              <>
                <Section className="rounded-lg bg-blue-50 p-4">
                  <Text className="mb-3 font-semibold text-blue-700">Transaction Information</Text>
                  <Row>
                    <Column>
                      <Text className="m-0 text-sm text-blue-600">Transaction ID:</Text>
                      <Text className="m-0 font-mono text-sm text-blue-800">
                        {transactionDetails.transactionId || 'Confirmed'}
                      </Text>
                    </Column>
                    <Column className="text-right">
                      <Text className="m-0 text-sm text-blue-600">Payment Method:</Text>
                      <Text className="m-0 text-sm text-blue-800">{transactionDetails.method || 'Wire Transfer'}</Text>
                    </Column>
                  </Row>
                  {transactionDetails.trackingNumber && (
                    <>
                      <Hr className="my-3 border-t border-blue-200" />
                      <Row>
                        <Column>
                          <Text className="m-0 text-sm text-blue-600">Tracking Number:</Text>
                          <Text className="m-0 font-mono text-sm font-semibold text-blue-800">
                            {transactionDetails.trackingNumber}
                          </Text>
                        </Column>
                      </Row>
                    </>
                  )}
                </Section>
                <Hr className="my-4 border-t border-gray-200" />
              </>
            )}

            {/* Order Summary */}
            <Section>
              <Text className="m-0 text-xl font-bold">Order Details ({allProducts.length} items)</Text>
            </Section>
            <Hr />

            {/* Regular Products */}
            {products.length > 0 && (
              <Section className="mb-4">
                <Section className="mb-2">
                  <Row>
                    <Column>
                      <Text className="m-0 font-semibold text-gray-900">Regular Products</Text>
                    </Column>
                    <Column className="text-right">
                      <Text className="m-0 inline-block rounded-full bg-green-50 px-2 py-1 font-sans text-xs text-green-700 capitalize">
                        Regular
                      </Text>
                    </Column>
                  </Row>
                </Section>

                {products.map((item, index) => (
                  <Section
                    key={item._id || `regular-${index}`}
                    className="mb-2 rounded-lg border border-green-100 bg-green-50/10 p-3"
                  >
                    <Row className="py-2">
                      <Column className="w-[50%]">
                        <Text className="m-0 font-semibold">
                          {item.product?.name || item.name || `Product ${index + 1}`}
                        </Text>
                        <Text className="m-0 text-sm text-gray-600">SKU: {item.product?.sku || 'N/A'}</Text>
                        <Text className="m-0 text-xs text-gray-500">
                          Flavor:{' '}
                          {(() => {
                            try {
                              const parsed = JSON.parse(item?.attribute);
                              return parsed?.flavor || 'N/A';
                            } catch (error) {
                              return 'N/A';
                            }
                          })()}
                        </Text>
                        <Text className="m-0 text-sm text-gray-600">
                          Remarks: {item?.product?.remarks || item?.remarks || 'N/A'}
                        </Text>
                      </Column>
                      <Column className="w-[15%]">
                        <Text className="m-0">{item.quantity}</Text>
                      </Column>
                      <Column className="w-[15%]">
                        <Text className="m-0">{item.selectedVolume}ml</Text>
                      </Column>
                      <Column className="w-[20%] text-right">
                        <Text className="m-0 font-semibold text-green-600">${formatPrice(item.total)}</Text>
                      </Column>
                    </Row>
                  </Section>
                ))}
              </Section>
            )}

            {/* Wholesale Products */}
            {ws_products.length > 0 && (
              <Section className="mb-4">
                <Section className="mb-2">
                  <Row>
                    <Column>
                      <Text className="m-0 font-semibold text-gray-900">Wholesale Products</Text>
                    </Column>
                    <Column className="text-right">
                      <Text className="m-0 inline-block rounded-full bg-red-50 px-2 py-1 font-sans text-xs text-red-700 capitalize">
                        Wholesale
                      </Text>
                    </Column>
                  </Row>
                </Section>

                {ws_products.map((item, index) => (
                  <Section
                    key={item._id || `wholesale-${index}`}
                    className="mb-2 rounded-lg border border-red-50 bg-red-50/10 p-3"
                  >
                    <Row className="py-2">
                      <Column className="w-[50%]">
                        <Text className="m-0 font-semibold">
                          {item.product?.name || item.name || `Product ${index + 1}`}
                        </Text>
                        <Text className="m-0 text-sm text-gray-600">SKU: {item.product?.sku || 'N/A'}</Text>
                        <Text className="m-0 text-xs text-gray-500">
                          Flavor:{' '}
                          {(() => {
                            try {
                              const parsed = JSON.parse(item?.attribute);
                              return parsed?.flavor || 'N/A';
                            } catch (error) {
                              return 'N/A';
                            }
                          })()}
                        </Text>
                        <Text className="m-0 text-sm text-gray-600">
                          Remarks: {item?.product?.remarks || item?.remarks || 'N/A'}
                        </Text>
                      </Column>
                      <Column className="w-[15%]">
                        <Text className="m-0">{item.quantity}</Text>
                      </Column>
                      <Column className="w-[15%]">
                        <Text className="m-0">{item.selectedVolume}ml</Text>
                      </Column>
                      <Column className="w-[20%] text-right">
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
              <Row className="mt-3 rounded-md bg-green-50 p-2">
                <Column className="text-left">
                  <Text className="m-0 font-semibold text-green-700">TOTAL PAID</Text>
                </Column>
                <Column className="w-32 text-right">
                  <Text className="m-0 font-bold text-green-700">${formatPrice(total)}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Shipping Information */}
            {shipping_details && (
              <>
                <Section className="rounded-lg bg-green-50 p-4">
                  <Text className="mb-3 text-center text-xl font-bold text-green-700">📦 Shipping Information</Text>

                  <Row>
                    <Column>
                      <Text className="m-0 font-bold text-green-700">Shipping Address</Text>
                      <Text className="m-0 text-sm text-green-600">
                        {shipping_details?.first_name} {shipping_details?.last_name} <br />
                        {shipping_details?.street_address} <br />
                        {shipping_details?.city}, {shipping_details?.province} {shipping_details?.post_code}
                        <br />
                        {shipping_details?.country} <br />
                        Email: {shipping_details?.email} <br />
                        Phone: {shipping_details?.phone}
                      </Text>
                    </Column>
                  </Row>

                  {transactionDetails?.trackingNumber && (
                    <>
                      <Hr className="my-4 border-t border-green-200" />
                      <Text className="mb-2 text-center font-semibold text-green-700">
                        Your order has been dispatched!
                      </Text>
                      <Text className="m-0 text-center text-sm text-green-600">
                        Track your package using the tracking number provided above.
                        <br />
                        You will receive shipping updates via email and SMS.
                      </Text>
                    </>
                  )}
                </Section>
                <Hr className="my-4 border-t border-gray-200" />
              </>
            )}

            {/* Thank You Message */}
            <Section className="rounded-lg bg-gray-50 p-4">
              <Text className="mb-2 text-center font-semibold text-gray-900">Thank You!</Text>
              <Text className="m-0 text-center text-sm text-gray-700">
                Thank you for choosing Loud Spectrum. We appreciate your business and trust.
                <br />
                If you have any questions about your order, please don't hesitate to contact our support team.
                <br />
                <strong>We look forward to serving you again!</strong>
              </Text>
            </Section>

            {/* Actions */}
            <Section className="mb-4 text-center">
              <Row>
                <Column className="text-center">
                  <Button
                    href={`${baseUrl}/shop`}
                    className="mx-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-normal text-gray-700"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    href={`${baseUrl}/account/orders`}
                    className="mx-2 rounded-full bg-green-600 px-6 py-3 text-sm font-normal text-white"
                  >
                    Track Order
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

export default WireTransferApprovedEmail;
