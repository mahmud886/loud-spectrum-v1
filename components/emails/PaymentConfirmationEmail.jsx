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

const PaymentConfirmationEmail = ({ orderData, paymentData }) => {
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
                  'blue-50': '#eff6ff',
                  'blue-100': '#dbeafe',
                  'blue-600': '#2563eb',
                  'blue-700': '#1d4ed8',
                  'blue-800': '#1e40af',
                  'teal-50': '#f0fdfa',
                  'teal-100': '#ccfbf1',
                  'teal-600': '#0d9488',
                  'teal-700': '#0f766e',
                  'teal-800': '#115e59',
                  'green-50': '#f0fdf4',
                  'green-100': '#dcfce7',
                  'green-600': '#16a34a',
                  'green-700': '#15803d',
                  'red-50': '#fef2f2',
                  'red-100': '#fee2e2',
                  'red-600': '#dc2626',
                  'red-700': '#b91c1c',
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
    net_amount,
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
      <Preview>Payment Confirmed - Your payment has been processed successfully!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                classic: '#8b4513',
                'blue-50': '#eff6ff',
                'blue-100': '#dbeafe',
                'blue-600': '#2563eb',
                'blue-700': '#1d4ed8',
                'blue-800': '#1e40af',
                'teal-50': '#f0fdfa',
                'teal-100': '#ccfbf1',
                'teal-600': '#0d9488',
                'teal-700': '#0f766e',
                'teal-800': '#115e59',
                'green-50': '#f0fdf4',
                'green-100': '#dcfce7',
                'green-600': '#16a34a',
                'green-700': '#15803d',
                'red-50': '#fef2f2',
                'red-100': '#fee2e2',
                'red-600': '#dc2626',
                'red-700': '#b91c1c',
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

            <Section className="rounded-md bg-teal-50 p-4">
              <Text className="mb-2 text-center text-2xl font-bold text-teal-800">Payment Confirmed!</Text>
              <Text className="m-0 text-center text-teal-700">
                Thank you, {customer_name}! Your payment has been processed successfully.
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Hi, {customer_name}</Text>
            <Text className="mb-6 leading-relaxed text-gray-700">
              Your payment has been successfully processed. Below are the details of your transaction for your records.
              <br />
              Your order is now being processed and you'll receive a shipping confirmation once it's dispatched.
            </Text>

            {/* Payment Details */}
            <Section className="rounded-lg bg-blue-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-blue-800">Transaction ID</Text>
                  <Text className="m-0 font-mono text-blue-700">
                    {transaction_id ? transaction_id : payment_info?.transection_id}
                  </Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-blue-700">Payment Date: {formatDate(payment_date || created_at)}</Text>
                  <Text className="m-0 text-blue-700">Status: Completed</Text>
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
                {/* <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Card Brand</Text>
                  <Text className="m-0 text-sm font-semibold capitalize">{card_brand || 'N/A'}</Text>
                </Column> */}
                {/* <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Last 4 Digits</Text>
                  <Text className="m-0 text-sm font-semibold">****{last_four_digits || '0000'}</Text>
                </Column> */}
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Amount Charged</Text>
                  <Text className="m-0 text-sm font-bold text-teal-600">${formatPrice(payment_amount || total)}</Text>
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
                      <Text className="m-0 inline-block rounded-full bg-teal-50 px-2 py-1 font-sans text-xs text-teal-700 capitalize">
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
                    className="mb-2 rounded-lg border border-teal-100 bg-teal-50/20 p-3"
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
                        <Text className="m-0 font-semibold text-teal-600">${formatPrice(item.total)}</Text>
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
                      <Text className="m-0 inline-block rounded-full bg-blue-50 px-2 py-1 font-sans text-xs text-blue-700 capitalize">
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
                    className="mb-2 rounded-lg border border-blue-100 bg-blue-50/20 p-3"
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
                        <Text className="m-0 font-semibold text-blue-600">${formatPrice(item.total)}</Text>
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
              {processing_fee > 0 && (
                <Row>
                  <Column className="pr-4 text-right">
                    <Text className="m-0 font-normal text-gray-600">PROCESSING FEE</Text>
                  </Column>
                  <Column className="w-px" />
                  <Column className="w-32 text-right">
                    <Text className="m-0 font-normal text-gray-600">${formatPrice(processing_fee)}</Text>
                  </Column>
                </Row>
              )}
              <Row className="mt-3 rounded-md bg-teal-50 p-2">
                <Column className="text-left">
                  <Text className="m-0 font-semibold text-teal-800">TOTAL CHARGED</Text>
                </Column>
                <Column className="w-px" />
                <Column className="w-32 text-right">
                  <Text className="m-0 font-bold text-teal-800">${formatPrice(payment_amount || total)}</Text>
                </Column>
              </Row>
              {net_amount && (
                <Row className="mt-1">
                  <Column className="pr-4 text-right">
                    <Text className="m-0 text-sm font-normal text-gray-500">NET AMOUNT</Text>
                  </Column>
                  <Column className="w-px" />
                  <Column className="w-32 text-right">
                    <Text className="m-0 text-sm font-normal text-gray-500">${formatPrice(net_amount)}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Hr className="my-3 border-t border-gray-200" />

            <Section className="rounded-lg bg-blue-50 p-4">
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
                    href={`${baseUrl}/account/orders/${_id}`}
                    className="mx-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-normal text-white"
                  >
                    View Order Details
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
              <Text className="m-0 font-semibold text-gray-900">Payment Receipt</Text>
              <Text className="m-0 text-sm text-gray-700">
                This email serves as your payment receipt. Please keep it for your records.
              </Text>
              <Text className="m-0 text-sm text-gray-700">
                If you have any questions about your payment, please contact our support team.
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

export default PaymentConfirmationEmail;
