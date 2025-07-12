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
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  ? process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  : 'http://localhost:3000';

const PaymentRejectionEmail = ({ orderData, paymentData, rejectionReason }) => {
  if (!orderData || !paymentData) {
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
        <Preview>Payment Information Not Found</Preview>
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
                  'red-800': '#991b1b',
                  'pink-50': '#fdf2f8',
                  'pink-100': '#fce7f3',
                  'pink-600': '#db2777',
                  'pink-700': '#be185d',
                  'pink-800': '#9d174d',
                  'orange-50': '#fff7ed',
                  'orange-100': '#ffedd5',
                  'orange-600': '#ea580c',
                  'orange-700': '#c2410c',
                  'gray-50': '#f9fafb',
                  'gray-100': '#f3f4f6',
                  'gray-600': '#4b5563',
                  'gray-700': '#374151',
                  'gray-800': '#1f2937',
                  'gray-900': '#111827',
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
                  src={`${baseUrl}/assets/svgs/logos/logo-dark.svg`}
                  alt="Loud Spectrum Logo"
                  width="200"
                  height="60"
                  className="mx-auto"
                />
              </Section>

              <Section className="text-center">
                <Heading className="mb-2 text-2xl font-bold text-gray-900">Payment Information Not Found</Heading>
                <Text className="mb-4 text-gray-600">We couldn't find your payment details.</Text>
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

  const {
    transaction_id,
    payment_method,
    payment_amount,
    payment_date,
    last_four_digits,
    card_brand,
    processing_fee,
    decline_reason,
    error_code,
  } = paymentData;

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

  const defaultRejectionReason =
    rejectionReason ||
    decline_reason ||
    'Your payment could not be processed. Please verify your payment method and try again.';

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
      <Preview>Payment Rejected - Your payment could not be processed</Preview>
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
                'red-800': '#991b1b',
                'pink-50': '#fdf2f8',
                'pink-100': '#fce7f3',
                'pink-600': '#db2777',
                'pink-700': '#be185d',
                'pink-800': '#9d174d',
                'orange-50': '#fff7ed',
                'orange-100': '#ffedd5',
                'orange-600': '#ea580c',
                'orange-700': '#c2410c',
                'gray-50': '#f9fafb',
                'gray-100': '#f3f4f6',
                'gray-600': '#4b5563',
                'gray-700': '#374151',
                'gray-800': '#1f2937',
                'gray-900': '#111827',
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
                src={`${baseUrl}/assets/svgs/logos/logo-dark.svg`}
                alt="Loud Spectrum Logo"
                width="200"
                height="60"
                className="mx-auto"
              />
            </Section>

            <Section className="rounded-md bg-red-50 p-4">
              <Text className="mb-2 text-center text-2xl font-bold text-red-800">Payment Rejected</Text>
              <Text className="m-0 text-center text-red-700">
                We're sorry, {customer_name}. Your payment could not be processed.
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Hi, {customer_name}</Text>
            <Text className="mb-4 leading-relaxed text-gray-700">
              We were unable to process your payment for the order below. Please review the details and try again with a
              different payment method.
            </Text>

            <Section className="mb-6 rounded-lg bg-pink-50 p-4">
              <Text className="m-0 font-semibold text-pink-800">Reason for Rejection:</Text>
              <Text className="m-0 text-pink-700">{defaultRejectionReason}</Text>
              {error_code && <Text className="m-0 mt-1 text-xs text-pink-600">Error Code: {error_code}</Text>}
            </Section>

            {/* Payment Attempt Details */}
            <Section className="rounded-lg bg-red-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-red-800">Transaction ID</Text>
                  <Text className="m-0 font-mono text-red-700">{transaction_id || 'N/A'}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-red-700">Attempt Date: {formatDate(payment_date || created_at)}</Text>
                  <Text className="m-0 text-red-700">Status: Rejected</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Payment Method Details */}
            <Section className="mb-4">
              <Row className="mb-2">
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Payment Method</Text>
                  <Text className="m-0 text-sm font-semibold capitalize">{payment_method || payment_type}</Text>
                </Column>
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Card Brand</Text>
                  <Text className="m-0 text-sm font-semibold capitalize">{card_brand || 'N/A'}</Text>
                </Column>
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Last 4 Digits</Text>
                  <Text className="m-0 text-sm font-semibold">****{last_four_digits || '0000'}</Text>
                </Column>
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Attempted Amount</Text>
                  <Text className="m-0 text-sm font-bold text-red-600">${formatPrice(payment_amount || total)}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Order Reference */}
            <Section className="rounded-lg bg-gray-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-gray-800">Order Number</Text>
                  <Text className="text-uppercase m-0 font-mono text-gray-700">{code}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-gray-700">Order Date: {formatDate(created_at)}</Text>
                  <Text className="m-0 text-gray-700">Order Status: {order_status}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            <Section>
              <Text className="m-0 text-xl font-bold">Order Summary ({allProducts.length} items)</Text>
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
                      <Text className="m-0 inline-block rounded-full bg-gray-100 px-2 py-1 font-sans text-xs text-gray-700 capitalize">
                        Regular
                      </Text>
                    </Column>
                  </Row>
                </Section>

                {/* Table Header */}
                <Row className="border-b border-gray-200 font-bold">
                  <Column className="w-[50%]">
                    <Text className="m-0">Product</Text>
                  </Column>
                  <Column className="w-[15%]">
                    <Text className="m-0">Quantity</Text>
                  </Column>
                  <Column className="w-[15%]">
                    <Text className="m-0">Volume</Text>
                  </Column>
                  <Column className="w-[20%] text-right">
                    <Text className="m-0">Price</Text>
                  </Column>
                </Row>
                <Hr />

                {/* Product List */}
                {products.map((item, index) => (
                  <Section
                    key={item._id || `regular-${index}`}
                    className="mb-2 rounded-lg border border-gray-200 bg-gray-50/50 p-3"
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
                      </Column>
                      <Column className="w-[15%]">
                        <Text className="m-0">{item.quantity}</Text>
                      </Column>
                      <Column className="w-[15%]">
                        <Text className="m-0">{item.selectedVolume} 1ml</Text>
                      </Column>
                      <Column className="w-[20%] text-right">
                        <Text className="m-0 font-semibold text-gray-600">${formatPrice(item.total)}</Text>
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
                      <Text className="m-0 inline-block rounded-full bg-gray-100 px-2 py-1 font-sans text-xs text-gray-700 capitalize">
                        Wholesale
                      </Text>
                    </Column>
                  </Row>
                </Section>

                {/* Table Header */}
                <Row className="border-b border-gray-200 font-bold">
                  <Column className="w-[50%]">
                    <Text className="m-0">Product</Text>
                  </Column>
                  <Column className="w-[15%]">
                    <Text className="m-0">Quantity</Text>
                  </Column>
                  <Column className="w-[15%]">
                    <Text className="m-0">Volume</Text>
                  </Column>
                  <Column className="w-[20%] text-right">
                    <Text className="m-0">Price</Text>
                  </Column>
                </Row>
                <Hr />

                {/* Product List */}
                {ws_products.map((item, index) => (
                  <Section
                    key={item._id || `wholesale-${index}`}
                    className="mb-2 rounded-lg border border-gray-200 bg-gray-50/50 p-3"
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
                      </Column>
                      <Column className="w-[15%]">
                        <Text className="m-0">{item.quantity}</Text>
                      </Column>
                      <Column className="w-[15%]">
                        <Text className="m-0">{item.selectedVolume} 1ml</Text>
                      </Column>
                      <Column className="w-[20%] text-right">
                        <Text className="m-0 font-semibold text-gray-600">${formatPrice(item.total)}</Text>
                      </Column>
                    </Row>
                  </Section>
                ))}
              </Section>
            )}

            <Hr className="my-3 border-t border-gray-200" />

            {/* Payment Breakdown */}
            <Section className="mt-6 text-right">
              <Row>
                <Column className="pr-4 text-right">
                  <Text className="m-0 font-normal">SUBTOTAL</Text>
                </Column>
                <Column className="w-px" />
                <Column className="w-32 text-right">
                  <Text className="m-0 font-normal text-gray-700">${formatPrice(sub_total)}</Text>
                </Column>
              </Row>
              <Row>
                <Column className="pr-4 text-right">
                  <Text className="m-0 font-normal">SHIPPING</Text>
                </Column>
                <Column className="w-px" />
                <Column className="w-32 text-right">
                  <Text className="m-0 font-normal text-gray-700">${formatPrice(shipping_amount)}</Text>
                </Column>
              </Row>
              <Row>
                <Column className="pr-4 text-right">
                  <Text className="m-0 font-normal">TAX</Text>
                </Column>
                <Column className="w-px" />
                <Column className="w-32 text-right">
                  <Text className="m-0 font-normal text-gray-700">${formatPrice(tax_amount)}</Text>
                </Column>
              </Row>
              {discount_amount > 0 && (
                <Row>
                  <Column className="pr-4 text-right">
                    <Text className="m-0 font-normal text-green-600">DISCOUNT</Text>
                  </Column>
                  <Column className="w-px" />
                  <Column className="w-32 text-right">
                    <Text className="m-0 font-normal text-green-600">-${formatPrice(discount_amount)}</Text>
                  </Column>
                </Row>
              )}
              <Row className="mt-3 rounded-md bg-red-50 p-2">
                <Column className="text-left">
                  <Text className="m-0 font-semibold text-red-800">TOTAL (NOT CHARGED)</Text>
                </Column>
                <Column className="w-px" />
                <Column className="w-32 text-right">
                  <Text className="m-0 font-bold text-red-800">${formatPrice(payment_amount || total)}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-3 border-t border-gray-200" />

            <Section className="rounded-lg bg-pink-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-bold">Billing Address</Text>
                  <Text className="m-0 text-sm text-gray-700">
                    {billing_details?.first_name} {billing_details?.last_name} <br />
                    {billing_details?.street_address} <br />
                    {billing_details?.city}, {billing_details?.province} {billing_details?.post_code}
                    <br />
                    {billing_details?.country} <br />
                    Email: {billing_details?.email} <br />
                    Phone: {billing_details?.phone}
                  </Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 font-bold">Shipping Address</Text>
                  <Text className="m-0 text-sm text-gray-700">
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
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Actions */}
            <Section className="mb-4 text-center">
              <Row>
                <Column className="text-center">
                  <Button
                    href={`${baseUrl}/checkout`}
                    className="mx-2 rounded-full bg-red-600 px-6 py-3 text-sm font-normal text-white"
                  >
                    Try Different Payment Method
                  </Button>
                  <Button
                    href={`${baseUrl}/contact`}
                    className="mx-2 rounded-full border border-red-300 bg-red-50 px-6 py-3 text-sm font-normal text-red-700"
                  >
                    Contact Support
                  </Button>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            <Section className="text-center">
              <Text className="m-0 font-semibold text-gray-900">What's Next?</Text>
              <Text className="m-0 text-sm text-gray-700">
                Please try again with a different payment method or contact our support team for assistance.
              </Text>
              <Text className="m-0 text-sm text-gray-700">Your order is still reserved and waiting for payment.</Text>
              <Text className="m-0 text-sm font-semibold text-red-600">
                No charges have been made to your payment method.
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            <Section className="rounded-md bg-gray-100 p-4">
              {/* Logo Footer */}
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

export default PaymentRejectionEmail;
