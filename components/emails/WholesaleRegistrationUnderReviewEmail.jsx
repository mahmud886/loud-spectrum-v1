import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
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

const WholesaleRegistrationUnderReviewEmail = ({ registrationData }) => {
  const {
    _id,
    company_name,
    contact_name,
    email,
    phone,
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
    review_started_at,
    reviewer_name,
    estimated_completion_date,
    required_documents,
    priority_level,
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

  const calculateDaysInReview = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
      <Preview>Your wholesale registration is under review - Thank you for your patience</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                'blue-50': '#eff6ff',
                'blue-100': '#dbeafe',
                'blue-200': '#bfdbfe',
                'blue-600': '#2563eb',
                'blue-700': '#1d4ed8',
                'blue-800': '#1e40af',
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

            {/* Status Banner */}
            <Section className="mb-6 rounded-md bg-blue-50 p-6">
              <Text className="mb-2 text-center text-2xl font-bold text-blue-800">🔍 Under Review</Text>
              <Text className="m-0 text-center text-lg text-blue-700">
                Your wholesale registration application is being reviewed by our team.
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Dear {contact_name},</Text>
            <Text className="mb-6 leading-relaxed text-gray-700">
              Thank you for submitting your wholesale registration application for <strong>{company_name}</strong>. We
              have received your application and it is currently under review by our wholesale partnerships team.
              <br />
              <br />
              We appreciate your interest in partnering with Loud Spectrum and will provide you with an update as soon
              as our review is complete.
            </Text>

            {/* Registration Details */}
            <Section className="mb-6 rounded-lg bg-blue-50 p-4">
              <Row>
                <Column>
                  <Text className="m-0 font-semibold text-blue-800">Registration ID</Text>
                  <Text className="m-0 font-mono text-blue-700">{_id}</Text>
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-blue-700">Submitted: {formatDate(created_at)}</Text>
                  <Text className="m-0 text-blue-700">
                    Status: <span className="font-semibold">Under Review</span>
                  </Text>
                </Column>
              </Row>
              {review_started_at && (
                <Row className="mt-2">
                  <Column>
                    <Text className="m-0 text-sm text-blue-600">
                      Review started: {formatDate(review_started_at)}({calculateDaysInReview(review_started_at)} days
                      ago)
                    </Text>
                  </Column>
                </Row>
              )}
              {reviewer_name && (
                <Row className="mt-2">
                  <Column>
                    <Text className="m-0 text-sm text-blue-600">Assigned reviewer: {reviewer_name}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Review Timeline */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Review Timeline & Process</Text>

              <Section className="mb-4 rounded-lg bg-blue-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-blue-800">📅 Expected Timeline</Text>
                <Text className="m-0 text-sm text-blue-700">
                  {estimated_completion_date
                    ? `Expected completion: ${formatDate(estimated_completion_date)}`
                    : 'Standard review time: 5-7 business days'}
                </Text>
                {priority_level && <Text className="m-0 mt-1 text-xs text-blue-600">Priority: {priority_level}</Text>}
              </Section>

              <Section className="mb-4 rounded-lg bg-blue-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-blue-800">🔍 Review Process</Text>
                <Text className="m-0 text-sm text-blue-700">
                  Our team is evaluating your business information, verifying documentation, and assessing compatibility
                  with our wholesale program.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-blue-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-blue-800">📋 What We're Reviewing</Text>
                <Text className="m-0 text-sm text-blue-700">
                  • Business documentation and verification
                  <br />
                  • Market compatibility and target alignment
                  <br />
                  • Distribution channel assessment
                  <br />• Financial and operational capacity
                </Text>
              </Section>

              {required_documents && required_documents.length > 0 && (
                <Section className="mb-4 rounded-lg bg-yellow-50 p-4">
                  <Text className="m-0 mb-2 font-semibold text-yellow-800">📄 Additional Documents Needed</Text>
                  <Text className="m-0 text-sm text-yellow-700">{required_documents.join(', ')}</Text>
                  <Text className="m-0 mt-1 text-xs text-yellow-600">
                    Please provide these documents to expedite your review.
                  </Text>
                </Section>
              )}
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* What to Expect */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">What to Expect Next</Text>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">✅ Approval</Text>
                <Text className="m-0 text-sm text-gray-700">
                  If approved, you'll receive welcome instructions and access to our wholesale portal.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">📝 Additional Information</Text>
                <Text className="m-0 text-sm text-gray-700">
                  We may contact you for additional information or clarification during the review process.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">📧 Status Updates</Text>
                <Text className="m-0 text-sm text-gray-700">
                  You'll receive email updates for any status changes or if additional information is needed.
                </Text>
              </Section>

              <Section className="mb-4 rounded-lg bg-gray-50 p-4">
                <Text className="m-0 mb-2 font-semibold text-gray-800">🎯 Final Decision</Text>
                <Text className="m-0 text-sm text-gray-700">
                  You'll receive a final decision email with either approval or detailed feedback.
                </Text>
              </Section>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Company Information Summary */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Application Summary</Text>

              <Row className="mb-4">
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Company Name</Text>
                  <Text className="m-0 text-sm font-semibold">{company_name}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Business Type</Text>
                  <Text className="m-0 text-sm font-semibold capitalize">{business_type}</Text>
                </Column>
              </Row>

              <Row className="mb-4">
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Contact Person</Text>
                  <Text className="m-0 text-sm font-semibold">{contact_name}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Email</Text>
                  <Text className="m-0 text-sm font-semibold">{email}</Text>
                </Column>
              </Row>

              <Row className="mb-4">
                <Column>
                  <Text className="m-0 text-sm font-medium text-gray-500">Business Address</Text>
                  <Text className="m-0 text-sm font-semibold">
                    {address}, {city}, {state} {zip_code}, {country}
                  </Text>
                </Column>
              </Row>
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
                    Browse Products
                  </Button>
                  <Button
                    href={`${baseUrl}/contact`}
                    className="mx-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-normal text-gray-700"
                  >
                    Contact Us
                  </Button>
                </Column>
              </Row>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            {/* Contact Information */}
            <Section className="mb-6">
              <Text className="m-0 mb-4 text-xl font-bold text-gray-900">Questions During Review?</Text>
              <Text className="m-0 mb-2 text-gray-700">
                If you have questions about your application or need to provide additional information:
              </Text>
              <Text className="m-0 text-sm text-gray-600">
                <strong>Email:</strong> wholesale@loudspectrum.com
                <br />
                <strong>Phone:</strong> +1 (555) 123-4567
                <br />
                <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM PST
                <br />
                <strong>Reference:</strong> Registration ID {_id}
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            {/* Footer */}
            <Section className="rounded-md bg-gray-100 p-4">
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

export default WholesaleRegistrationUnderReviewEmail;
