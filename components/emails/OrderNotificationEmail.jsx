import {
  Body,
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

const OrderNotificationEmail = ({ orderData }) => {
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
        <Preview>New order received</Preview>
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
                  'green-50': '#f0fdf4',
                  'green-100': '#dcfce7',
                  'red-50': '#fef2f2',
                  'red-100': '#fee2e2',
                },
              },
            },
          }}
        >
          <Body className="bg-white p-6">
            <Container className="rounded-lg bg-white p-6 shadow-md">
              <Section className="mb-6 text-center">
                <Img
                  src={`${baseUrl}/assets/images/logo.png`}
                  alt="Loud Spectrum Logo"
                  width="200"
                  height="40"
                  className="mx-auto"
                />
              </Section>
              <Section className="text-center">
                <Heading className="mb-2 text-2xl font-bold text-gray-900">No order data</Heading>
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
      <Preview>
        New Order #{code} - ${formatPrice(total)}
      </Preview>
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
                'green-50': '#f0fdf4',
                'green-100': '#dcfce7',
                'red-50': '#fef2f2',
                'red-100': '#fee2e2',
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

            {/* New Order Header */}
            <Section className="mb-6 rounded-md bg-blue-50 p-4">
              <Text className="mb-2 text-center text-2xl font-bold text-blue-800">📦 NEW ORDER RECEIVED</Text>
              <Text className="m-0 text-center text-blue-700">
                You have received a new order #{code} - ${formatPrice(total)}
              </Text>
            </Section>

            {/* Main Content */}
            <Text className="mb-4 text-lg font-semibold">Hi Team,</Text>
            <Text className="mb-4 leading-relaxed text-gray-700">
              A new order has been placed on LoudSpectrum.com. Please review the details below and process it
              accordingly.
            </Text>

            {/* Order Summary */}
            <Section className="mb-6 rounded-lg bg-blue-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-blue-800">Order Number</Text>
                  <Text className="text-uppercase m-0 font-mono text-blue-700">{code}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-blue-700">Order Date: {formatDate(created_at)}</Text>
                  <Text className="m-0 text-blue-700">Status: {order_status}</Text>
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
                  <Text className="m-0 text-sm font-semibold text-red-600 capitalize">{payment_status}</Text>
                </Column>
                <Column className="w-1/4 text-center">
                  <Text className="m-0 text-sm font-medium text-gray-500">Total Amount</Text>
                  <Text className="m-0 text-sm font-bold text-green-600">${formatPrice(total)}</Text>
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
                      <Text className="m-0 inline-block rounded-full bg-green-50 px-2 py-1 font-sans text-xs text-green-700 capitalize">
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
                        <Text className="m-0">
                          {(() => {
                            try {
                              const parsed = JSON.parse(item?.product?.attribute);
                              const volume = parsed?.volume || 'N/A';
                              return volume === 'N/A' ? 'N/A' : `${volume}`;
                            } catch (error) {
                              return 'N/A';
                            }
                          })()}
                        </Text>
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
                        <Text className="m-0">{item?.selectedVolume || item?.volume} ml</Text>
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
              <Row className="mt-3 rounded-md bg-blue-50 p-2">
                <Column className="text-left">
                  <Text className="m-0 font-semibold text-blue-800">TOTAL</Text>
                </Column>
                <Column className="w-px" />
                <Column className="w-32 text-right">
                  <Text className="m-0 font-bold text-blue-800">${formatPrice(total)}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-3 border-t border-gray-200" />

            <Section className="rounded-lg bg-blue-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-bold">Customer Details</Text>
                  <Text className="m-0 text-sm text-gray-700">
                    {customer_name} <br />
                    Email: {shipping_details?.email || billing_details?.email} <br />
                    Phone: {shipping_details?.phone || billing_details?.phone}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

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

            <Hr className="my-6 border-t border-gray-200" />

            <EmailFooter baseUrl={baseUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrderNotificationEmail;
