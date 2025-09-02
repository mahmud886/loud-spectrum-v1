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
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  ? process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  : 'http://localhost:3000';

const OrderRejectionEmail = ({ orderData, rejectionReason }) => {
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
                  'red-50': '#fef2f2',
                  'red-100': '#fee2e2',
                  'red-600': '#dc2626',
                  'red-700': '#b91c1c',
                  'orange-50': '#fff7ed',
                  'orange-100': '#ffedd5',
                  'orange-600': '#ea580c',
                  'orange-700': '#c2410c',
                  'yellow-50': '#fefce8',
                  'yellow-100': '#fef3c7',
                  'yellow-600': '#d97706',
                  'yellow-700': '#b45309',
                  'purple-50': '#faf5ff',
                  'purple-100': '#f3e8ff',
                  'purple-600': '#9333ea',
                  'purple-700': '#7c3aed',
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

  const defaultRejectionReason =
    rejectionReason ||
    'Your order has been rejected due to policy violations or security concerns. Please contact our support team for more information.';

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
      <Preview>Order Rejected - Your order has been rejected</Preview>
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
                'orange-50': '#fff7ed',
                'orange-100': '#ffedd5',
                'orange-600': '#ea580c',
                'orange-700': '#c2410c',
                'yellow-50': '#fefce8',
                'yellow-100': '#fef3c7',
                'yellow-600': '#d97706',
                'yellow-700': '#b45309',
                'purple-50': '#faf5ff',
                'purple-100': '#f3e8ff',
                'purple-600': '#9333ea',
                'purple-700': '#7c3aed',
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

            <Section className="rounded-md bg-purple-50 p-4">
              <Text className="mb-2 text-center text-2xl font-bold text-purple-800">Order Rejected</Text>
              <Text className="m-0 text-center text-purple-700">
                We're sorry, {customer_name}. Your order has been rejected.
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Hi, {customer_name}</Text>
            <Text className="mb-4 leading-relaxed text-gray-700">
              We regret to inform you that your order has been rejected and cannot be processed at this time.
            </Text>

            <Section className="mb-6 rounded-lg bg-red-50 p-4">
              <Text className="m-0 font-semibold text-red-800">Reason for Rejection:</Text>
              <Text className="m-0 text-red-700">{defaultRejectionReason}</Text>
            </Section>

            <Section className="rounded-lg bg-purple-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-purple-800">Order Number</Text>
                  <Text className="text-uppercase m-0 font-mono text-purple-700">{code}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-purple-700">Order Date: {formatDate(created_at)}</Text>
                  <Text className="m-0 text-purple-700">Status: Rejected</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Order Details */}
            <Section className="mb-4">
              <Row className="mb-2">
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Order Type</Text>
                  <Text className="m-0 text-sm font-semibold capitalize">{type}</Text>
                </Column>
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Payment Method</Text>
                  <Text className="m-0 text-sm font-semibold capitalize">{payment_type}</Text>
                </Column>
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Payment Status</Text>
                  <Text className="m-0 text-sm font-semibold text-purple-600 capitalize">Rejected</Text>
                </Column>
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Order Amount</Text>
                  <Text className="m-0 text-sm font-bold text-purple-600">${formatPrice(total)}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            <Section>
              <Text className="m-0 text-xl font-bold">Order Items ({allProducts.length})</Text>
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
                        <Text className="m-0 text-sm text-gray-600">
                          Remarks: {item?.product?.remarks || item?.remarks || 'N/A'}
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
                        <Text className="m-0 text-sm text-gray-600">
                          Remark: {item?.product?.remarks || item?.remarks || 'N/A'}
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

            {/* Calculation Section */}
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
              <Row className="mt-3 rounded-md bg-purple-50 p-2">
                <Column className="text-left">
                  <Text className="m-0 font-semibold text-purple-800">TOTAL (NOT CHARGED)</Text>
                </Column>
                <Column className="w-px" />
                <Column className="w-32 text-right">
                  <Text className="m-0 font-bold text-purple-800">${formatPrice(total)}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-3 border-t border-gray-200" />

            <Section className="rounded-lg bg-gray-50 p-4">
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
                    href={`${baseUrl}/contact`}
                    className="mx-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-normal text-white"
                  >
                    Contact Support
                  </Button>
                  <Button
                    href={`${baseUrl}/shop`}
                    className="mx-2 rounded-full border border-gray-300 bg-gray-50 px-6 py-3 text-sm font-normal text-gray-700"
                  >
                    Browse Products
                  </Button>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            <Section className="text-center">
              <Text className="m-0 font-semibold text-gray-900">Need Help?</Text>
              <Text className="m-0 text-sm text-gray-700">
                If you believe this rejection was made in error, please contact our support team immediately.
              </Text>
              <Text className="m-0 text-sm text-gray-700">
                We're here to help resolve any issues and clarify our policies.
              </Text>
              <Text className="m-0 text-sm font-semibold text-purple-600">
                No charges have been made to your payment method.
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            <Section className="rounded-md bg-gray-100 p-4">
              {/* Logo Footer */}
              {/* <Section className="mb-4 text-center">
                <Img
                  src={`${baseUrl}/assets/svgs/logos/logo-dark.svg`}
                  alt="Loud Spectrum Logo"
                  width="150"
                  height="45"
                  className="mx-auto"
                />
              </Section> */}
              <Section className="mb-4 text-center">
                <Text className="bg-[linear-gradient(90deg,_#101820_21.53%,_#0077C8_44.13%,_#C0AEE7_74.27%,_#DDDAE8_107.64%)] bg-clip-text text-3xl font-bold text-transparent">
                  LOUD SPECTRUM
                </Text>
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

export default OrderRejectionEmail;
