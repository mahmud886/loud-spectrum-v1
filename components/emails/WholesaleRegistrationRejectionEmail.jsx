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

const WholesaleRegistrationRejectionEmail = ({ registrationData }) => {
  const {
    _id,
    company_name,
    name,
    email,
    phone_number,
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
    rejected_at,
    rejection_reason,
    rejection_notes,
    reviewer_name,
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
      <Preview>Wholesale Registration Update - Application Not Approved</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                'red-50': '#fef2f2',
                'red-100': '#fee2e2',
                'red-200': '#fecaca',
                'red-600': '#dc2626',
                'red-700': '#b91c1c',
                'red-800': '#991b1b',
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

            {/* Status Banner */}
            <Section className="mb-6 rounded-md bg-red-50 p-6">
              <Text className="mb-2 text-center text-2xl font-bold text-red-800">Application Update</Text>
              <Text className="m-0 text-center text-lg text-red-700">
                Your wholesale registration application has not been approved at this time.
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Dear {name},</Text>
            <Text className="mb-6 leading-relaxed text-gray-700">
              Thank you for your interest in becoming a wholesale partner with Loud Spectrum. After careful review of
              your application for <strong>{company_name}</strong>, we regret to inform you that we are unable to
              approve your wholesale registration at this time.
            </Text>

            {/* Registration Details */}
            <Section className="mb-6 rounded-lg bg-red-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-red-800">Registration ID</Text>
                  <Text className="m-0 font-mono text-red-700">{_id}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-red-700">Reviewed: {formatDate(rejected_at || created_at)}</Text>
                  <Text className="m-0 text-red-700">
                    Status: <span className="font-semibold">Not Approved</span>
                  </Text>
                </Column>
              </Row>
              {reviewer_name && (
                <Row className="mt-2">
                  <Column>
                    <Text className="m-0 text-sm text-red-600">Reviewed by: {reviewer_name}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Rejection Reason */}
            {/* <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Reason for Decision</Text>

              <Section className="mb-4 rounded-lg bg-red-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-red-800">Primary Reason</Text>
                <Text className="m-0 text-sm text-red-700">
                  {rejection_reason || 'Application does not meet our current wholesale requirements'}
                </Text>
              </Section>

              {rejection_notes && (
                <Section className="mb-4 rounded-lg bg-red-50 p-4">
                  <Text className="m-0 mb-2 font-semibold text-red-800">Additional Notes</Text>
                  <Text className="m-0 text-sm text-red-700">{rejection_notes}</Text>
                </Section>
              )}
            </Section>

            <Hr className="my-4 border-t border-gray-200" /> */}

            {/* Common Reasons Section */}
            {/* <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Common Reasons for Non-Approval</Text>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">• Business Requirements</Text>
                <Text className="m-0 text-sm text-gray-700">
                  Minimum years in business, revenue thresholds, or business type compatibility
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">• Documentation</Text>
                <Text className="m-0 text-sm text-gray-700">
                  Incomplete application, missing tax documentation, or business verification
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">• Market Alignment</Text>
                <Text className="m-0 text-sm text-gray-700">
                  Target market compatibility, distribution channel conflicts, or geographic restrictions
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">• Capacity Limitations</Text>
                <Text className="m-0 text-sm text-gray-700">
                  Current wholesale partner capacity has been reached in your region
                </Text>
              </Section>
            </Section> */}

            {/* <Hr className="my-4 border-t border-gray-200" /> */}

            {/* What's Next Section */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">What's Next?</Text>

              <Section className="mb-4 rounded-lg bg-blue-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-blue-800">⏰ Reapplication Timeline</Text>
                <Text className="m-0 text-sm text-blue-700">
                  You may reapply for wholesale registration after 90 days from this decision date.
                </Text>
              </Section>

              {/* <Section className="mb-4 rounded-lg bg-blue-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-blue-800">📋 Application Improvements</Text>
                <Text className="m-0 text-sm text-blue-700">
                  Address the specific reasons mentioned above to improve your chances of approval.
                </Text>
              </Section> */}

              <Section className="mb-4 rounded-lg bg-blue-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-blue-800">🛒 Retail Shopping</Text>
                <Text className="m-0 text-sm text-blue-700">
                  You can still shop our retail products at regular pricing on our website.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-blue-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-blue-800">💬 Contact Support</Text>
                <Text className="m-0 text-sm text-blue-700">
                  Reach out to our team if you have questions about this decision or need clarification.
                </Text>
              </Section>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Actions */}
            <Section className="mb-6 text-center">
              <Row>
                <Column className="text-center">
                  <Button
                    href={`${baseUrl}/shop`}
                    className="mx-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-normal text-white"
                  >
                    Shop Retail Products
                  </Button>
                  <Button
                    href={`${baseUrl}/contact`}
                    className="mx-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-normal text-gray-700"
                  >
                    Contact Support
                  </Button>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Contact Information */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Questions About This Decision?</Text>
              <Text className="m-0 mb-2 text-gray-700">
                If you have questions about this decision or need clarification on requirements:
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

export default WholesaleRegistrationRejectionEmail;
