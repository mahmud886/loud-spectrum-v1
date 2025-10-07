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
  : 'https://loudspectrum.com';

const WholesaleRegistrationUnderReviewEmail = ({ registrationData }) => {
  const { id, name, company, username, phone_number, email, website, country, status = 'Pending' } = registrationData;

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
            <Section className="mb-6 rounded-md bg-blue-50 p-6">
              <Text className="mb-2 text-center text-2xl font-bold text-blue-800">🔍 Pending</Text>
              <Text className="m-0 text-center text-lg text-blue-700">
                Your wholesale registration application is being reviewed by our team.
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Dear {name},</Text>
            <Text className="mb-6 leading-relaxed text-gray-700">
              Thank you for submitting your wholesale registration application. We will connect with you to uncover what
              your business truly needs and create a solution tailored to your goals.
            </Text>

            {/* Registration Details */}
            <Section className="mb-6 rounded-lg bg-blue-50 p-4">
              <Row>
                <Column className="w-1/2">
                  <Text className="m-0 text-blue-700">
                    Status: <span className="font-semibold">{status}</span>
                  </Text>
                </Column>
              </Row>
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
                  <Text className="m-0 text-sm font-semibold">{company}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Contact Person</Text>
                  <Text className="m-0 text-sm font-semibold">{name}</Text>
                </Column>
              </Row>
              <Row className="mb-4">
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Email</Text>
                  <Text className="m-0 text-sm font-semibold">{email}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Phone</Text>
                  <Text className="m-0 text-sm font-semibold">{phone_number}</Text>
                </Column>
              </Row>
              <Row className="mb-4">
                <Column>
                  <Text className="m-0 text-sm font-medium text-gray-500">Website</Text>
                  <Text className="m-0 text-sm font-semibold">{website}</Text>
                </Column>
              </Row>
              <Row className="mb-4">
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Country</Text>
                  <Text className="m-0 text-sm font-semibold">{country}</Text>
                </Column>
                <Column className="w-1/2">
                  <Text className="m-0 text-sm font-medium text-gray-500">Username</Text>
                  <Text className="m-0 text-sm font-semibold">{username || '-'}</Text>
                </Column>
              </Row>
              <Row className="mb-4">
                <Column>
                  <Text className="m-0 text-sm font-medium text-gray-500">Name</Text>
                  <Text className="m-0 text-sm font-semibold">{name}</Text>
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
                Email: hi@loudspectrum.com
                <br />
                Phone: +1 714 905 9681
                <br />
                Hours: Monday to Friday - 9AM - 5PM PST
                <br />
                1907 N Main St, Santa Ana CA 92706
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

export default WholesaleRegistrationUnderReviewEmail;
